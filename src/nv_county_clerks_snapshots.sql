/*

	Audit of voter data collected from county clerks offices in Nevada.
	Stores daily snpashot of vansync.early_vote2012 table and calculates
	daily percent change by category/county. Shows latest updates 
	for early voting and ballots recieved.

*/

/*
	Store timestamp to tie each snapshot of the data to a specific 
	date-time.
*/
DROP TABLE IF EXISTS kgates.audit_date;
CREATE TABLE kgates.audit_date AS (
SELECT
DISTINCT
CURRENT_TIMESTAMP AS insert_time
FROM vansync.early_vote2012
);

/*
	Map vanid to county
*/
DROP TABLE IF EXISTS kgates.vanid2county;
CREATE TABLE kgates.vanid2county AS (
SELECT DISTINCT
votebuilder_identifier AS vanid,
county_name,
county_fips
FROM Analytics.basefile_nv
WHERE state_code='NV'
);

/*
	Clear history older than three days
*/
DELETE FROM kgates.early_vote2012_history 
WHERE DAYOFYEAR(insert_time) < DAYOFYEAR(CURRENT_DATE) - 3;

/*
	Store history of kgates.early_vote2012 table.
*/
INSERT INTO kgates.early_vote2012_history
(
	insert_time,
	VanID,
	BallotMailed,
	BallotReceived,
	EarlyVoted,
	BallotCancelled,
	ApplicationMailed
)
SELECT
vcd."insert_time",
vev."VanID",
vev."BallotMailed",
vev."BallotReceived",
vev."EarlyVoted",
vev."BallotCancelled",
vev."ApplicationMailed"
FROM vansync.early_vote2012 AS vev 
INNER JOIN kgates.audit_date AS vcd ON True
WHERE
(
	vev."BallotMailed" IS NOT NULL OR
	vev."BallotReceived" IS NOT NULL OR
	vev."EarlyVoted" IS NOT NULL OR
	vev."BallotCancelled" IS NOT NULL OR
	vev."ApplicationMailed" IS NOT NULL
)
AND 
vev."state"='NV'
;

/*
	Tables of relative dates
*/
DROP TABLE IF EXISTS kgates.early_vote2012_history_one_day_ago;
CREATE TABLE kgates.early_vote2012_history_one_day_ago AS (
SELECT
1 AS days_ago,
MAX(vne."insert_time") AS insert_time
FROM kgates.early_vote2012_history AS vne
WHERE DAYOFYEAR(vne."insert_time")=DAYOFYEAR(CURRENT_DATE) - 1
GROUP BY 1
);

DROP TABLE IF EXISTS kgates.early_vote2012_history_two_day_ago;
CREATE TABLE kgates.early_vote2012_history_two_day_ago AS (
SELECT
2 AS days_ago,
MAX(vne."insert_time") AS insert_time
FROM kgates.early_vote2012_history AS vne
WHERE DAYOFYEAR(vne."insert_time")=DAYOFYEAR(CURRENT_DATE) - 2
GROUP BY 1
);

/*
	All VanIds in Nevada
*/
DROP TABLE IF EXISTS kgates.all_vanids_in_nv;
CREATE TABLE kgates.all_vanids_in_nv AS (
SELECT
CASE
WHEN v2c."county_name" IS NULL THEN 'No County'
ELSE v2c."county_name"
END AS county_name,
COUNT(*) AS person_count
FROM analytics.person AS per
LEFT JOIN kgates.vanid2county AS v2c ON v2c."vanid"=per."votebuilder_identifier"
WHERE state_code='NV'
GROUP BY 1
);

/*
	Modified yesterday
*/
DROP TABLE IF EXISTS kgates.modified_yesterday;
CREATE TABLE kgates.modified_yesterday AS (
SELECT
CASE
WHEN v2c."county_name" IS NULL THEN 'No County'
ELSE v2c."county_name"
END AS county_name,
COUNT(*) AS person_count
FROM kgates.early_vote2012_history_one_day_ago AS hod
INNER JOIN kgates.early_vote2012_history AS evh ON evh."insert_time"=hod."insert_time"
LEFT JOIN kgates.vanid2county AS v2c ON v2c."vanid"=evh."vanid"
GROUP BY 1
);

/*
	Modified today (with max dates)
*/
DROP TABLE IF EXISTS kgates.modified_today;
CREATE TABLE kgates.modified_today AS (
SELECT
CASE
WHEN v2c."county_name" IS NULL THEN 'No County'
ELSE v2c."county_name"
END AS county_name,
COUNT(*) AS person_count,
MAX(vev."BallotMailed") AS latest_BallotMailed,
MAX(vev."BallotReceived") AS  latest_BallotReceived,
MAX(vev."EarlyVoted") AS latest_EarlyVoted,
MAX(vev."BallotCancelled") AS latest_BallotCancelled,
MAX(vev."ApplicationMailed") AS latest_ApplicationMailed
FROM kgates.early_vote2012_history AS vev
INNER JOIN kgates.audit_date AS vcd ON vcd."insert_time"=vev."insert_time"
LEFT JOIN kgates.vanid2county AS v2c ON v2c."vanid"=vev."vanid"
WHERE
(
	(vev."BallotMailed" IS NOT NULL) OR
	(vev."BallotReceived" IS NOT NULL) OR
	(vev."EarlyVoted" IS NOT NULL) OR
	(vev."BallotCancelled" IS NOT NULL) OR
	(vev."ApplicationMailed" IS NOT NULL)
)
GROUP BY 1
);

/*
	Staging validation table
*/
DROP TABLE IF EXISTS kgates.early_vote2012_validation_staging;
CREATE TABLE kgates.early_vote2012_validation_staging AS (
SELECT  
avn."county_name",
avn."person_count" AS person_count,
my."person_count" AS modified_yesterday,
mt."person_count" AS modified_today,
0.0 AS percent_change,
mt."latest_BallotMailed",
mt."latest_BallotReceived",
mt."latest_EarlyVoted",
mt."latest_BallotCancelled",
mt."latest_ApplicationMailed"
FROM kgates.all_vanids_in_nv AS avn
LEFT JOIN kgates.modified_yesterday AS my ON my."county_name"=avn."county_name"
LEFT JOIN kgates.modified_today AS mt ON mt."county_name"=avn."county_name"
);

UPDATE kgates.early_vote2012_validation_staging
SET modified_yesterday=0.0
WHERE modified_yesterday IS NULL;

UPDATE kgates.early_vote2012_validation_staging
SET modified_today=0.0
WHERE modified_today IS NULL;

/*
	County validation table 
*/
DROP TABLE IF EXISTS kgates.early_vote2012_validation_county;
CREATE TABLE kgates.early_vote2012_validation_county AS (
SELECT
evv."county_name",
evv."person_count",
evv."modified_yesterday",
evv."modified_today",
CASE
WHEN modified_yesterday <> 0 THEN (modified_today / modified_yesterday - 1.0)
ELSE 0.0
END AS percent_change,
evv."latest_BallotMailed",
evv."latest_BallotReceived",
evv."latest_EarlyVoted",
evv."latest_BallotCancelled",
evv."latest_ApplicationMailed"
FROM kgates.early_vote2012_validation_staging AS evv
);

/*
	Summary validation table 
*/
DROP TABLE IF EXISTS kgates.early_vote2012_validation_summary;
CREATE TABLE kgates.early_vote2012_validation_summary AS (
SELECT
'All Counties' AS county_name,
SUM(evv."person_count") AS person_count,
SUM(evv."modified_yesterday") AS modified_yesterday,
SUM(evv."modified_today") AS modified_today,
CASE
WHEN SUM(evv."modified_yesterday") <> 0 THEN (SUM(evv."modified_today") / SUM(evv."modified_yesterday") - 1.0)
ELSE 0.0
END AS percent_change,
MAX(evv."latest_BallotMailed") AS latest_BallotMailed,
MAX(evv."latest_BallotReceived") AS latest_BallotReceived,
MAX(evv."latest_EarlyVoted") AS latest_EarlyVoted,
MAX(evv."latest_BallotCancelled") AS latest_BallotCancelled,
MAX(evv."latest_ApplicationMailed") AS latest_ApplicationMailed
FROM kgates.early_vote2012_validation_county AS evv
);
