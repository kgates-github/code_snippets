var
    baseURL,
    geocoder,
    recmap,
    promptWindow,
    environment = window.location.host.split('.')[1];

if (environment === 'barackobama') {
    baseURL = '//secure.assests.bostatic.com'
} else {
    baseURL = 'http://origin.assets.bostatic.com'
}

var mapping = {
    "health"   : {
        "name"   : "Health Care",
        "stats"  : [
            [
                "<h1>#{lifetime_limits_state}</h1><p>people in <strong>#{state_name}</strong> that no longer face lifetime limits.</p>",
                "<h1>#{preventive_care_state}</h1><p>people in <strong>#{state_name}</strong> with access to preventative care.</p>",
                "<h1>#{doughnut_hole_state}</h1><p>seniors in <strong>#{state_name}</strong> who fell into the doughnut hole last year saved an average of <strong>#{doughnut_hole_discount_state}</strong> on their prescription drugs.</p>",
                "<h1>#{doughnut_hole_county}</h1><p>seniors in <strong>#{county_name}</strong> who fell into the doughnut hole last year saved an average of <strong>#{doughnut_hole_discount_county}</strong> on their prescription drugs.</p>",
                "<h1>#{young_adults_state}</h1><p>uninsured young adults in <strong>#{state_name}</strong> now covered by their parents' insurance.</p>",
                "<h1>#{young_adults_county}</h1><p>uninsured young adults in <strong>#{county_name}</strong> now covered by their parents' insurance.</p>",
                "<h1>#{kids_w_pre-ex_state}</h1><p>kids under 19 in <strong>#{state_name}</strong> can no longer be denied coverage for a pre-existing condition.</p>",
                "<h1>#{women_w_preventive_care_state}</h1><p>women in <strong>#{state_name}</strong> will gain access to birth control with no copay next year, in addition to their existing preventive services.</p>"
            ]
        ],
        "content": "<div><h3>Health Care Coverage</h3>Most Americans already have private health insurance. Obamacare doesn't change that--but it makes it better and more affordable, while also strengthening and ensuring Medicare's future.</div>",
        "sources": "<div>Sources: HHS, CMS, ASPE & CPS-ASEC</div>"
    },
    "energy"   : {
        "name"   : "Energy",
        "stats"  : [
            [
                "<h1>+#{oil}</h1><p>increase in crude oil production in <strong>#{state_name}</strong>, 2008-2011.</p>",
                "<h1>+#{gas}</h1><p>increase in natural gas production in <strong>#{state_name}</strong>, 2008-2010.</p>",
                "<h1>+#{coal}</h1><p>increase in coal production in <strong>#{state_name}</strong>, 2008-2011.</p>",
                "<h1>+#{wind}</h1><p>increase in electricity production from wind energy in <strong>#{state_name}</strong>, 2009-2011.</p>",
                "<h1>+#{solar}</h1><p>increase in electricity production from solar energy in <strong>#{state_name}</strong>, 2009-2011.</p>",
                "<h1>+#{geo}</h1><p>increase in electricity production from geothermal sources in <strong>#{state_name}</strong>, 2009-2011.</p>",
                "<h1>+#{hydro}</h1><p>increase in hydroelectric production in <strong>#{state_name}</strong>, 2009-2011..</p>"
            ]
        ],
        "content": "<div><h3>Energy Production</h3>President Obama has an all-of-the-above approach to developing our energy resources and reducing our dependence on foreign oil.</div>",
        "sources": "<div>Sources: Energy Information Administration & Mine Safety and Health Administration</div>"
    },
    "jobs"     : {
        "name"   : "Jobs",
        "stats"  : [
            [
                "<h1>#{state}</h1><p>private sector jobs added in <strong>#{state_name}</strong>, February 2010 to July 2012.</p>",
                "<h1>#{msa_june}</h1><p>private sector jobs added in <strong>#{msa_name}</strong>, February 2010 to July 2012.</p>"
            ]
        ],
        "content": "<div><h3>Job Growth</h3>Thirty straight months of private sector job growth--more than 4.6 million jobs added--including the first year-over-year gains in manufacturing jobs since 1997.</div>",
        "sources": "<div>Source: BLS</div>"
    },
    "business" : {
        "name"   : "Small Business",
        "stats"  : [
            [
                "<h1>#{num_of_small_businesses_state}</h1><p>small businesses in <strong>#{state_name}</strong> eligible for one of the President's 18 small business tax cuts.</p>",
                "<h1>#{num_of_small_businesses_county}</h1><p>small businesses in <strong>#{county_name}</strong> eligible for one of the President's 18 small business tax cut.</p>"
            ]
        ],
        "content": "<div><h3>Tax Cuts for Small Businesses and Entrepreneurs</h3>President Obama has passed 18 small business tax cuts to encourage them to hire and make job-creating investments, including tax cuts for making new investments, giving their workers health insurance, and hiring unemployed veterans.</div>",
        "sources": "<div>Source: U.S. Census</div>"
    },
    "taxes"    : {
        "name"   : "Taxes",
        "stats"  : [
            [
                "<h1>#{tax_savings_state}</h1><p>in tax cuts for the typical family in <strong>#{state_name}</strong> under President Obama.</p>",
                "<h1>#{tax_savings_county}</h1><p>in tax cuts for the typical family in <strong>#{county_name}</strong> under President Obama.</p>"
            ]
        ],
        "content": "<div><h3>Tax Savings</h3>President Obama has cut taxes for every working family, putting an extra 3,600 in the pockets of the typical family over the course of four years.</div>",
        "sources": "<div>Based on median household income data from US Census</div>"
    },
    "education": {
        "name"   : "Education",
        "stats"  : [
            [
                "<h1>#{num_2011_pell_recipients}</h1><p>students in <strong>#{state_name}</strong> received an average of <strong>#{avg_pell_award}</strong> in Pell grants in 2011.</p>",
                "<h1>+#{pct_increase_in_num_of_recipients}</h1><p>increase in Pell recipients in <strong>#{state_name}</strong>, 2008-2011.</p>",
                "<h1>#{num_2011_aotc_recipients}</h1><p> of students and families in <strong>#{state_name}</strong> received an average of <strong>#{avg_aotc_credit}</strong> in education related tax credits in 2011.</p>",
                "<h1>#{num_of_federal_student_loan_holders}</h1><p>students in <strong>#{state_name}</strong> will save an average of <strong>#{avg_savings_from_holding_rates}</strong> due to the President's plan to keep Federal student loan interest rates low.</p>"
            ]
        ],
        "content": "<div><h3>Supporting Students </h3>President Obama made college more affordable by doubling funding for Pell grants, created and extended a tax credit for college worth up to 10,000 over 4 years, and pushed Congress to keep interest rates on federal loans low.</div>",
        "sources": "<div>Sources: U.S. Department of Treasury, WhiteHouse.gov</div>"
    }
};

var recovery_text = "<h3>The Recovery Act</h3>The Recovery Act is working to cushion the greatest economic crisis since the Great Depression and lay a new foundation for economic growth. Public and private forecasters have said the Recovery Act was responsible for 2 million jobs or more nationwide in the first year alone.  These are just some of the jobs created by the Recovery Act in your state and/or community.";

function goToLocationByLatLon(latlon, doZoomToState) {
    if (typeof doZoomToState === 'undefined') {
        doZoomToState = false;
    }
    geocoder.geocode({ 'latLng': latlon, 'region': 'US' }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var address = getParticularComponent('postal_code', results[0].address_components);
            var state = getAdminArea(results, 'administrative_area_level_1');
            var country = getParticularComponent('country', results[0].address_components);
            var state = getAdminArea(results, 'administrative_area_level_1');

            if ('long_name' in country) {
                if (country.long_name != 'United States') {

                } else {

                    if (state) {
                        var zip = null; //address.short_name;
                        var state = getAdminArea(results, 'administrative_area_level_1');
                        var county = getAdminArea(results, 'administrative_area_level_2');
                        county = county.shortName;
                        var stateShort = state.shortName.toUpperCase();

                        if (typeof recmap == 'object') {
                            if (doZoomToState) {
                                zoomToState(state.longName, recmap.map, recmap);
                            } else {
                                recmap.panToBounds(latlon, stateShort);
                            }

                            recmap.openLocationWindow('', latlon);
                            recmap.removeStateBorders();
                            recmap.addStateBorders(stateShort);
                        } else {
                            initMap(projects, latlon, stateShort, '');
                        }
                    }
                }
                var path = baseURL + '/frontend/projects/atlas/files/state/' + stateShort + '.json?jsonp=callback=?';
                loadLocalInfo(path, stateShort);
            }
        } else {
            if (typeof(country) == 'undefined') {
                /*
                 No country detected through geocode.
                 */
            } else {
                /*
                 No geocode, init map zoomed out to national level.
                 */
                latlon = new google.maps.LatLng(40.5861, -98.3881);
                initMap(projects, latlon, 'ALL', null);
            }
        }
    });
}

function zoomToState(state, map, recmap) {
    return zoomToAddressString('State of ' + state, map, recmap);
}

function zoomToAddressString(addressString, map, recmap) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': addressString}, function (results, status) {
        if (status != google.maps.GeocoderStatus.OK) {
            return;
        }
        if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            return;
        }
        map.fitBounds(results[0].geometry.viewport);
        recmap.marker.setPosition(results[0].geometry.location);
    });
}

function initialize() {
    /*
     Add methods to projects object
     */
    projects.fetch = function (key, item, i) {
        var index = this["key"].indexOf(item);
        if (index != -1) return this[key][i][index];
        return null;
    };

    promptWindow = new PromptWindow("#map_canvas");
    latlon = new google.maps.LatLng(40.5861, -98.3881);
    initMap(projects, latlon, 'ALL', null);
    goToInitialPosition();
}

function goToInitialPosition() {
    geocoder = new google.maps.Geocoder();
    if (google.loader.ClientLocation) {
        /* Get location by IP address and init map with user's latlon */
        var latlon = new google.maps.LatLng(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude);
        goToLocationByLatLon(latlon, true);
    } else {
        /* No Google client location and no navigator geolocation, get from header */
        var stateShort = window.ofa.region;

        if (stateShort) {
            zoomToState(stateShort, recmap.map, recmap);

            //recmap.marker.setPosition(center);

            recmap.removeStateBorders();
            recmap.addStateBorders(stateShort);
            var path = baseURL + '/frontend/projects/atlas/files/state/' + stateShort + '.json?jsonp=callback=?';
            loadLocalInfo(path, stateShort);
        } else {
            // Default here
// ANGUS: center map, zoomed out, display ZIP prompt

            $('.zip-prompt').fadeIn({duration: 0});
            latlon = new google.maps.LatLng(40.5861, -98.3881);
            initMap(projects, latlon, 'ALL', null);


        }
    }
}

function initMap(projects, latlon, stateShort, locationName) {
    recmap = new RecMap(projects, secondaries, latlon, stateShort);
    if (locationName) {
        recmap.openLocationWindow(locationName, latlon);
    } else {
        //openZipPrompt("Enter your zip code:");
    }
}

var PromptWindow = function (selector) {
    this.__construct__ = function (selector) {
        this.overlay = $('<div class="overlay"></div>');
        this.container = $(selector);
        this.prompt = null;
    },

        this.centerOver = function (container, prompt) {
            var cx = 0; //container.offset().left;
            var cy = 0; //container.offset().top;
            var cw = $(window).width(); // container.innerWidth();
            var ch = $(window).height(); // container.innerHeight();

            var ow = prompt.innerWidth();
            var oh = prompt.innerHeight();
            var ox = cx + (cw / 2) - (ow / 2);
            var oy = cy + (ch / 2) - (oh / 2);

            prompt.css({
                left  : ox + "px",
                top   : oy + "px",
                zIndex: 1001
            });
        },

        this.coverOver = function (container, overlay) {
            var x = 0; //container.offset().left;
            var y = 0; //container.offset().top;
            var w = $(document).width();
            var h = $(document).height();

            overlay.css({
                top   : y + "px",
                left  : x + "px",
                width : w + "px",
                height: h + "px",
                zIndex: 1000
            });
        },

        this.openWindow = function (prompt) {
            this.prompt = prompt;
            this.overlay.hide();
            this.prompt.hide();
            $('body').append(this.overlay);
            $('body').append(this.prompt);
            this.coverOver(this.container, this.overlay);
            this.centerOver(this.container, this.prompt);
            this.overlay.show();
            this.prompt.show();
        },

        this.closeWindow = function () {
            this.overlay.hide();
            if (this.prompt) this.prompt.remove();
        },

        this.__construct__(selector);
    return this;
};

var RecMap = function (projects, secondaries, latlon, state) {
    this.__construct__ = function (projects, secondaries, latlon, state) {

        this.projects = projects;
        this.secondaries = secondaries;
        this.circles = [];
        this.state = state;
        this.popOverAnchor = $('<div id="anchor" rel="popover"></div>');

        $('body').append(this.popOverAnchor);
        this.popOverContent = '';

        /*
         this.infowindow = new google.maps.InfoWindow();
         this.locationwindow = new google.maps.InfoWindow();
         this.locationwindow.zIndex = -1;
         */

        this.circleColors = {};
        this.circleColors["edu"] = "#7EB0CC";
        this.circleColors["hea"] = "#7EB0CC";
        this.circleColors["ene"] = "#7EB0CC";
        this.circleColors["pub"] = "#7EB0CC";
        this.circleColors["inf"] = "#7EB0CC";
        this.circleColors["oth"] = "#7EB0CC";

        this.zooms = {};
        /*this.zooms['NV'] = 7;
         this.zooms['FL'] = 7;
         this.zooms['TX'] = 6;
         this.zooms['CA'] = 7;
         this.zooms['CT'] = 9;
         this.zooms['RI'] = 9;
         this.zooms['DE'] = 9;
         this.zooms['AK'] = 4;
         this.zooms['MT'] = 6;
         this.zooms['WY'] = 6;
         this.zooms['MD'] = 9;
         this.zooms['MA'] = 9;
         this.zooms['NJ'] = 7;*/
        this.zooms['ALL'] = 4;

        this.numStateProjects = [];
        this.numStateProjects[3] = 3;
        this.numStateProjects[4] = 5;
        this.numStateProjects[5] = 7;
        this.numStateProjects[6] = 9;
        this.numStateProjects[7] = 11;
        this.numStateProjects[8] = 40;
        this.numStateProjects[9] = 100;
        this.numStateProjects[10] = 100;
        this.numStateProjects[11] = 100;

        // Dot sizes set manually
        this.dots = [];
        this.dots[3] = 40000;
        this.dots[4] = 30000;
        this.dots[5] = 20000;
        this.dots[6] = 12000;
        this.dots[7] = 8000;
        this.dots[8] = 4000;
        this.dots[9] = 2000;
        this.dots[10] = 1000;
        this.dots[11] = 500;

        this.DEFAULT_ZOOM = 7;

        var zoom = this.getZoom(state);//(state == 'ALL') ? 3 : this.getZoom(state)

        this.styles = [
            {
                featureType: "poi",
                stylers    : [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "administrative.country",
                elementType: "labels",
                stylers    : [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "administrative.province",
                elementType: "labels",
                stylers    : [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels",
                stylers    : [
                    { visibility: "on" }
                ]
            },
            {
                featureType: "water",
                elementType: "labels",
                stylers    : [
                    { visibility: "off" }
                ]
            },
            {
                featureType: "water",
                stylers    : [
                    { "color": "#00446A" }
                ]
            }
        ];

        if ($(window).width() < 640) {
            draggable = false;
            zoomControl = false;
            scrollwheel = false;
            disableDoubleClickZoom = true;
        } else {
            draggable = true;
            zoomControl = true;
            scrollwheel = false;
            disableDoubleClickZoom = false;
        }

        var mapOptions = {
            center                : latlon,
            zoom                  : zoom,
            disableDefaultUI      : true,
            disableDoubleClickZoom: disableDoubleClickZoom,
            draggable             : draggable,
            mapTypeControl        : false,
            scrollwheel           : scrollwheel,
            panControl            : false,
            scaleControl          : false,
            zoomControl           : zoomControl,
            zoomControlOptions    : {
                style: google.maps.ZoomControlStyle.SMALL
            },
            mapTypeId             : google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        this.map.setOptions({styles: this.styles});

        this.addStateBorders(state);

        this.marker = new google.maps.Marker({
            position: latlon,
            map     : this.map,
            title   : "You are here"
        });

        var map = this.map;
        map.parent = this;

        google.maps.event.addListener(map, 'idle', function () {
            map.parent.drawCircles();
            //map.parent.moveMarkerToCenter();
        });

        google.maps.event.addListener(map, 'dragstart', function () {
            map.parent.closeInfoWindow();
            $('.zip-county-picker').fadeOut({duration: 0});
        });

        google.maps.event.addListener(map, 'dragend', function () {
            map.parent.closeInfoWindow();
            map.parent.moveMarkerToCenter();
        });

        google.maps.event.addListener(map, 'click', function () {
            map.parent.closeInfoWindow();
        });

        google.maps.event.addListener(map, 'zoom_changed', function () {
            map.parent.closeInfoWindow();
            $('.zip-county-picker').fadeOut({duration: 0});
            /*
             Only allow one zoom level.
             */
            var state = map.parent.state;
            var minZoom = 4; // map.parent.getZoom(state);
            var maxZoom = 11; // minZoom + 4;

            if (map.getZoom() < minZoom) map.setZoom(minZoom);
            if (map.getZoom() > maxZoom) map.setZoom(maxZoom);
        });

        google.maps.event.addListener(map, 'dblclick', function (event) {
            goToLocationByLatLon(event.latLng);
            $('.zip-county-picker').fadeOut({duration: 0});
        });
    };

        this.getZoom = function (state) {
            if (state in this.zooms) return this.zooms[state];
            return this.DEFAULT_ZOOM;
        };

    this.removeStateBorders = function () {
        if (typeof this.polygons !== 'undefined') {
            for (var index in this.polygons) {
                this.polygons[index].setMap(null);
            }
        }
        this.polygons = [];
    },

        this.addStateBorders = function (state) {
            this.polygons = [];

            if ((state == 'AK') || (this.map.getZoom() > 7)) return false;
            var stateBorders = g_stateBorders[state];

            for (var borderIndex in stateBorders) {
                var border = stateBorders[borderIndex];
                var points = [];
                for (var index in border) {
                    var borderPoint = border[index]
                    points.push(new google.maps.LatLng(borderPoint[0], borderPoint[1]));
                }
                var polygon = new google.maps.Polygon({
                    paths        : points,
                    strokeColor  : '#7EB0CC',
                    strokeOpacity: 0.5,
                    strokeWeight : 10,
                    fillColor    : '#7EB0CC',
                    fillOpacity  : 0.15,
                    zIndex       : -1
                });
                polygon.setMap(this.map);
                this.polygons.push(polygon);
            }
        },

        this.zoomOut = function () {
            this.closeInfoWindow();
            var latlon = new google.maps.LatLng(40.0, -100.0);
            this.panToBounds(latlon, 'ALL');
            this.removeStateBorders();
        },

        this.clearCircles = function () {
            if (this.circles.length) {
                for (i in this.circles) {
                    this.circles[i].setMap(null);
                }
            }
            this.circles = [];
        },

        this.moveMarkerToCenter = function () {
            var center = this.map.getCenter();
            goToLocationByLatLon(center);
        };

        this.drawCircles = function () {
            this.clearCircles();
            var projects = this.projects;
            var bounds = this.map.getBounds();
            var zoom = this.map.getZoom();

            radius = this.dots[zoom];
            var latIndex = this.projects['key'].indexOf('lat');
            var lonIndex = this.projects['key'].indexOf('lon');
            var categoryCodeIndex = this.projects['key'].indexOf('category_code');
            var secondaryIndex = this.projects['key'].indexOf('secondary');
            var recipientIndex = this.projects['key'].indexOf('recipient');
            var jobsIndex = this.projects['key'].indexOf('jobs');

            var northEast = bounds.getNorthEast();
            var southWest = bounds.getSouthWest();
            var northEastLat = northEast.lat();
            var northEastLon = northEast.lng();
            var southWestLat = southWest.lat();
            var southWestLon = southWest.lng();
            if (southWestLon > 0) {
                southWestLon = southWestLon - 360;
            }
            if (northEastLon > 0) {
                northEastLon = northEastLon - 360;
            }

            //var lngSpan = northEast.lng() - southWest.lng();
            //var latSpan = northEast.lat() - southWest.lat();

            for (var s in projects) { // loop through each state
                if (typeof projects[s] == 'function') continue; // Skip functions
                var stateProjects = projects[s];
                var numStateProjects = (this.numStateProjects[zoom] > stateProjects.length)
                    ? stateProjects.length
                    : this.numStateProjects[zoom]; //projects[s].length

                for (var i = 0; i < numStateProjects; i++) { // looping over each project in a state
                    // first check to see if the project is in our bounds
                    var project = stateProjects[i];

                    var lat = project[latIndex];
                    var lon = project[lonIndex];
                    if ((lat < northEastLat) &&
                        (lon < northEastLon) &&
                        (lat > southWestLat) &&
                        (lon > southWestLon)) {

                        var projectPoint = new google.maps.LatLng(lat, lon);
                        var projectOptions = {
                            strokeColor  : "#333333",
                            strokeOpacity: 1.0,
                            strokeWeight : 1,
                            fillColor    : this.circleColors[project[categoryCodeIndex]],
                            fillOpacity  : 1.0,
                            map          : this.map,
                            center       : projectPoint,
                            radius       : radius,
                            clickable    : true
                        };

                        var projectContent = '' +
                            '<div id="infowindow">' +
                            '<div style="float:right;"><a href="" onclick="recmap.closeInfoWindow(); return false;">X</a></div>' +
                            '<div>' + this.secondaries[project[secondaryIndex]] + '</div>' +
                            '<div>' + project[recipientIndex] + '</div>' +
                            '<div>Jobs directly created: ' + project[jobsIndex] + '</div>' +
                            '</div>'

                        var circle = new google.maps.Circle(projectOptions);
                        circle.content = projectContent;
                        circle.options = projectOptions;
                        circle.theMap = this;

                        if (!isTouchDevice()) {
                            google.maps.event.addListener(circle, 'mouseover', function (e) {
                                this.theMap.popOverContent = this.content;
                                this.theMap.openInfoWindow(this.content, this.center, e.b.pageX, e.b.pageY);
                            });

                            google.maps.event.addListener(circle, 'mouseout', function (e) {
                                this.theMap.closeInfoWindow();
                            });
                        }

                        google.maps.event.addListener(circle, 'click', function (e) {
                            this.theMap.popOverContent = this.content;
                            this.theMap.openInfoWindow(this.content, this.center, e.b.pageX, e.b.pageY);
                        });

                        this.circles.push(circle);
                    } // else project not in bounds do nothing
                } // end of state projects inner loop
            } //end of outer states loop
        };

    this.openInfoWindow = function (content, center, pageX, pageY) {

        var self = this;
        this.init = true; // can't hide before initial popover

        this.popOverAnchor.css({
            left    : pageX + "px",
            top     : (pageY - 20) + "px",
            position: "absolute"
        });

        this.popOverAnchor.popover({
            trigger  : 'manual',
            html     : true,
            placement: 'top',
            content  : function () {
                return self.getContent();
            },
            delay    : { show: 0, hide: 0 },
            template : '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
        });
        this.popOverAnchor.popover('show');
    };

    this.getContent = function () {
        return this.popOverContent;
    };

    this.closeInfoWindow = function () {
        if (this.init) this.popOverAnchor.popover('hide');
    };

    this.openLocationWindow = function (content, center) {
        this.marker.setPosition(center);
    };

    this.closeLocationWindow = function () {
        this.locationwindow.close();
    };

    this.panToBounds = function (addressPoint, state) {
        this.state = state;
        this.map.panTo(addressPoint);
    };

    this.__construct__(projects, secondaries, latlon, state);
    return this;
};

function isTouchDevice() {
    return !!('ontouchstart' in window);
}

function getAdminArea(results, areaType) {
    if (results.length == 0) {
        return null;
    }

    var place = results[0];
    var addressComponents = place['address_components'];
    var result = {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng()
    };
    for (var index in addressComponents) {
        var component = addressComponents[index];
        var types = component['types'];
        for (var typeIndex in types) {
            var type = types[typeIndex];
            if (type == areaType) {
                result.longName = component['long_name'];
                result.shortName = component['short_name'];
            }
        }
    }
    return result;
}

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        if (e.srcElement.id == 'addressPrompt') {
            loadPromptAddress();
        }
        else {
            changeAddress();
        }
    }
}

function changeAddress() {
    /*
     Get address point and state bounds to pan to state and put infowindow
     at location of address.
     */
    var address = document.getElementById("address").value;
    var isValidZip = /(^\d{5}$)|(^[A-Z]{2} \d{5}$)/.test(address);
    if (!isValidZip) {
        clearLocalInfo();
        $('.zip-county-error').fadeIn({duration: 0});
        return;
    }
    var geoAddress = address + ', United States of America'; // To send to geocoder.geocode
    clearLocalInfo();
    promptWindow.closeWindow();
    $('.zip-county-picker').fadeOut({duration: 0});
    $('.zip-prompt').fadeOut({duration: 0});

    geocoder.geocode({ 'address': geoAddress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var hasPostalCode = getParticularComponent('postal_code', results[0].address_components);

            if (hasPostalCode) {
                var state = getAdminArea(results, 'administrative_area_level_1');
                var county = getAdminArea(results, 'administrative_area_level_2');

                var stateShort = state.shortName.toUpperCase();
                var addressPoint = results[0]["geometry"]["location"];
                var zoom = 7;
                var zip = getAdminArea(results, 'postal_code').shortName;
                var path = baseURL + '/frontend/projects/atlas/files/zip/' + zip + '.json?jsonp=callback=?';

                recmap.openLocationWindow(zip, addressPoint);
                recmap.panToBounds(addressPoint, stateShort);
                recmap.map.setZoom(zoom);
                recmap.removeStateBorders();
                recmap.addStateBorders(stateShort);

                loadLocalInfo(path, stateShort, county, addressPoint);
                $('.zip-county-error').fadeOut({duration: 0});
            } else {
                /*
                 No valid postal code, zoom out and open prompt.
                 */
                //recmap.zoomOut();
                clearLocalInfo();
                $('.zip-county-error').fadeIn({duration: 0});
            }
        } else {
            //recmap.zoomOut();
            clearLocalInfo();
            $('.zip-county-error').fadeIn({duration: 0});
        }
    });
}

function openZipPrompt(message) {
    if (message == "") {
        message = "Please enter a zip code";
    }
    var html = $('<div class="prompt"></div>');
    html.append('<div style="color:black; text-align:center; padding:20px; font-weight:bold; font-size:16px;">' + message + '</div>');
    html.append('' +
        '<div class="form" onKeyPress="checkSubmit(event);">' +
        ' <input id="addressPrompt" type="textbox" value="" size="5">' +
        ' <input type="button" value="Go" onclick="loadPromptAddress()">' +
        '</div>'
    );
    promptWindow.openWindow(html);
}

function loadPromptAddress(zip) {
    document.getElementById("address").value = document.getElementById("addressPrompt").value;
    promptWindow.closeWindow();
    changeAddress();
}
function openCountyPrompt(obj) {
    var button,
        link,
        county,
        json,
        state,
        callback;

    $buttons = $('.zip-county-buttons');
    $buttons.empty();
    for (var i = 0; i < obj.length; i++) {
        county = obj[i];
        button = $('<a href="#" class="zip-county-button button btn-small">' + county.text + '</a>');
        json = county.json;
        callback = county.callback;
        state = county.state;

        button.click({ "callback": callback, "json": json, "state": state }, function (e) {
            $(this).css({ background: "#008FC5" });
            var json = e.data.json;
            var callback = e.data.callback;
            var state = e.data.state;
            callback(json, state);
            $('.zip-county-picker').fadeOut({duration: 0});
            e.preventDefault();
            return false;
        });
        $buttons.append(button);
    }
    $('.zip-county-picker').fadeIn({duration: 0});
}

function matchCounty(county, data) {
    var candidate,
        index = -1,
        county_types = [
            'County',
            'Parish'
        ];

    for (var i = 0; i < data.length; i++) {
        candidate = data[i].county_name;

        for (var j = 0; j < county_types.length; j++) {
            index = candidate.indexOf(county_types[j]);
            if (index > -1) break;
        }
        if (index > 0) {
            candidate = candidate.slice(0, index);
            candidate = candidate.replace(/^\s+|\s+$/g, '');
        }
        if (candidate == county) return true;
    }
    return false;
}

function loadLocalInfo(path, state, county, location) {
    $.getJSON(path, function (data) {
        var county;
        if (data.length > 1) {
            /*if (matchCounty(county, data)) {
             showLocalInfo(data[0], state, county);
             } else {*/
            var obj = [];
            for (var i = 0; i < data.length; i++) {
                //data[i].county_name = data[i].county_name.replace('city', 'County');
                data[i].location = location;
                obj.push({ callback: showLocalInfo, json: data[i], text: data[i].county_name, state: state });
            }
            openCountyPrompt(obj);
            showLocalInfo(data[0], state);
            //}
        } else {
            //county = data[0].county_name.replace('city', 'County');
            data[0].location = location;
            showLocalInfo(data[0], state, county);
        }
    });
}

function hasElement(fields, json) {
    for (var i = 0; i < fields.length; i++) {
        if (json[fields[i]] != '') return true;
    }
    return false;
}

function hasAllElements(fields, json) {
    // Ensure each paragraph will have all variables filled.
    var hasAll = true;
    for (var i = 0; i < fields.length; i++) {
        if (json[fields[i]] != '' && fields[i] in json) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function getFieldsFromTextbock(text) {
    var regex = /#\{([a-zA-Z\d_]*?)\}/g,
        results = [],
        match;

    while ((match = regex.exec(text)) != null) {
        if (match[1] != 'county_name' && match[1] != 'state_name') results.push(match[1]);
    }

    return results;
}

function hasCategory(content, json) {
    var fields;

    for (var i = 0; i < content.length; i++) {
        if (Object.prototype.toString.call(content[i]) === '[object Array]') {
            for (var j = 0; j < content[i].length; j++) {
                fields = getFieldsFromTextbock(content[i][j]);
                if (hasElement(fields, json)) return true;
            }
        } else {
            fields = [];
            for (var elem in content[i]) {
                fields.push(elem);
            }
            if (hasElement(fields, json)) return false
        }
    }
    return false;
}

function processText(text, json) {
    var search,
        regex = /#\{([a-zA-Z\d_]*?)\}/g,
        results = [],
        match;

    while ((match = regex.exec(text)) != null) {
        results.push(match[1]);
    }

    /*
     Make sure there are data points for all variables in paragraph.
     If not, don't render paragraph.
     */
    if (hasAllElements(results, json)) {
        for (var i = 0; i < json.length; i++) {
            search = '#{' + i + '}';
            text = text.replace(search, json[i]);
        }
        return text + ' ';
    } else {
        /*
         If one or more tags in text are not in JSON
         return false
         */
        return null;
    }
}

function hasCountyStat(text) {
    var regex = new RegExp('\#\{county\_name\}');
    return (text.match(regex));
}

function hasMSAStat(text) {
    var regex = new RegExp('\#\{msa\_name\}');
    return (text.match(regex));
}

function convert(str) {
    str = str.replace('$', '');
    str = str.replace(',', '');
    return parseFloat(str);
}

function pruneStat(json) {
    if ('tax_savings_state' in json && 'tax_savings_county' in json) {
        var state = convert(json['tax_savings_state']);
        var county = convert(json['tax_savings_county']);

        if (state > county) {
            json['tax_savings_county'] = '';
        }
        else {
            json['tax_savings_state'] = '';
        }

        return json;
    }
    return json;
}

function showLocalInfo(json, state) {
    var html = ("county_name" in json)
        ? json.county_name + ', ' + json.state_name
        : json.state_name;

    json = pruneStat(json);

    $('.map-location-name').text(', ' + html);
    var container = $('#local_content'),
        projects = json['top_projects'],
        c,
        tabid,
        content;

    for (var elem in mapping) {
        /*
         Only proceed if json contains at least one element that
         belongs to the current category.
         */
        if (hasCategory(mapping[elem].stats, json)) {
            c = 0;
            tabid = 'tab-' + elem;
            html = '<div class="row">';
            for (var i = 0; i < mapping[elem].stats.length; i++) {

                /*
                 If the element is a textblock, process text, else, make a list
                 */
                if (Object.prototype.toString.call(mapping[elem].stats[i]) === '[object Array]') {
                    for (var j = 0; j < mapping[elem].stats[i].length; j++) {
                        if (c % 4 == 0 && c > 0) html += '</div><div class="row">';

                        content = processText(mapping[elem].stats[i][j], json); // Replace #{somevar} with content from json
                        if (content) {
                            if (hasCountyStat(mapping[elem].stats[i][j]) || hasMSAStat(mapping[elem].stats[i][j])) {
                                html += '<div class="columns one-fourth county">';
                            } else {
                                html += '<div class="columns one-fourth">';
                            }
                            html += content;
                            html += '</div>';
                            c++;
                        }
                    }
                } else {
                    html += createList(mapping[elem].stats[i], json);
                }
            }

            if (mapping[elem].content) {
                if (c % 4 == 0 || c % 4 == 3) html += '</div><div class="row">';
                html += '<div class="columns one-half">' + mapping[elem].content + '</div>';
            }
            if (mapping[elem].sources) {
                html += '</div><div class="row">';
                html += '<div class="sources">' + mapping[elem].sources + '</div>';
            }
            html += '</div></div>';
            $('#' + tabid).html(html);
        } else {
            tabid = 'tab-' + elem;
            $('#' + tabid).text('No data available.');
        }
    }

    if (json.location) {
        html = getClosestRecoveryContent(state, 5, json.location);
    } else {
        html = getTopRecoveryContent(state, 5);
    }

    html += '<div class="row"><div class="columns one-half"><div>' + recovery_text + '</div></div></div>';
    html += '<div class="row"><div class="sources"><div>Source: Recovery.gov<div></div></div>';

    $('#tab-recovery').html(html);
}

function clearLocalInfo() {
    var tabs = $('.tab-content').children();
    for (var i = 0; i < tabs.length; i++) {
        $(tabs[i]).html('');
    }
}

function getTopRecoveryContent(state, number) {
    var items = projects[state];
    var jobsIndex = projects['key'].indexOf('jobs');
    var html;

    items.sort(function (a, b) {
        return a[1] > b[1]?1:-1;
        return a[jobsIndex] ? b[jobsIndex] ? 1 :
    });
    items = items.reverse();
    items = items.slice(0, number + 1);

    return formatContent(items);
}

function getClosestRecoveryContent(state, number, location) {
    var closest = [],
        dist,
        html,
        lat2,
        lon2,
        project;
    var lat1 = location.Xa;
    var lon1 = location.Ya;
    var distanceIndex = projects['key'].indexOf('distance');

    for (var i = 0; i < projects[state].length; i++) {
        lat2 = projects[state][i][0];
        lon2 = projects[state][i][1];

        project = projects[state][i];
        project[distanceIndex] = getDistance(lat1, lon1, lat2, lon2);
        closest.push(project);
    }

    closest.sort(function (a, b) {
        return a[distanceIndex] - b[distanceIndex];
    });

    closest = closest.slice(0, number + 1);
    return formatContent(closest);
}

function formatContent(items) {
    var html = '<div class="row">';
    var secondaryIndex = projects['key'].indexOf('secondary');
    var recipientIndex = projects['key'].indexOf('recipient');
    var jobsIndex = projects['key'].indexOf('jobs');

    for (var i = 0; i < items.length; i++) {
        if (i % 4 == 0 && i > 0) html += '</div><div class="row">';
        project = items[i];
        html += '<div class="columns one-fourth">' +
            '<h2>' + secondaries[project[secondaryIndex]] + '</h2>' +
            '<p>' + project[recipientIndex] + '</p>' +
            '<p>Jobs directly created: ' + project[jobsIndex] + '</p>' +
            '</div>'
    }
    return html;
}

function getDistance(lat1, lon1, lat2, lon2) {
    var R = 3958.7558657440545; // Radius of earth in Miles
    var dLat = toRad(lat2 - lat1),
        dLon = toRad(lon2 - lon1),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(Value) {
    return Value * Math.PI / 180;
}

function getParticularComponent(desiredType, components) {
    var result = null;
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        var types = component['types'];
        for (var typeIndex = 0; typeIndex < types.length; typeIndex++) {
            var type = types[typeIndex];
            if (type == desiredType) {
                result = component;
                break;
            }
        }
    }
    return result;
}

google.load("maps", "3", {callback: initialize, other_params: "sensor=false"});

if (!window.ofa) {
    window.ofa = {};
}
window.API = {};
var ofa = window.ofa;
(function ($, doc, win) {
    $('#get-started').click(function(){
        $('#title-headline').toggleClass('ready splash');
    });
})(jQuery, document, window);
