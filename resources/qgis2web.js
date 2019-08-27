// This script contains the bulk of JavaScript functionality within the map.
// The upper portion of the script is exported by qgis2web, and we made a few modifications to that, but the bulk of our additions begins at line .
//  87 - onPointerMove
// 246 - onSingleClick
// 385 - arrayLayers object that we created to organize data
// 649 - layerToggle
// 769 - contentLoad
// 808 - audio functions
// 851 - imageExpand
// 890 - imageCarouselChange

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

// This set of lines actually adds the interactive map to the webpage
var map = new ol.Map({
    controls: ol.control.defaults({attribution:true}),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
        extent: [2050198.422388, -4020662.316425, 2053781.939059, -4018812.349757], maxZoom: 20, minZoom: 15
    })
});

map.getView().fit([2050198.422388, -4020662.316425, 2053781.939059, -4018812.349757], map.getSize());

var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = true;
var doHover = false;

// This determines what happens when moving mouse over the map.
// There is a lot of unnecessary code in here because qgis2web wanted it to make it simple for hover to trigger popup by simply toggling the doHover variable above, but we aren't using this functionality.
var highlight;
var onPointerMove = function(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    var layerHoverCounter = 1;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layerHoverCounter == 1) {
            if (!(layer.getStyle().toString().includes("ol.style.Icon"))) {
                if (layersList.indexOf(layer) === -1) return;
                var doPopup = false;
                for (k in layer.get('fieldImages')) {
                    if (layer.get('fieldImages')[k] != "Hidden") {
                        doPopup = true;
                    }
                }
                currentFeature = feature;
                currentLayer = layer;
                clusteredFeatures = feature.get("features");
                var clusterFeature;
                if (typeof clusteredFeatures !== "undefined") {
                    if (doPopup) {
                        for(var n=0; n<clusteredFeatures.length; n++) {
                            clusterFeature = clusteredFeatures[n];
                            currentFeatureKeys = clusterFeature.getKeys();
                            popupText += '<li><table>'
                            for (var i=0; i<currentFeatureKeys.length; i++) {
                                if (currentFeatureKeys[i] != 'geometry') {
                                    popupField = '';
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                    } else {
                                        popupField += '<td colspan="2">';
                                    }
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                        popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                    }
                                    if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(clusterFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                    } else {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                                    }
                                    popupText += '<tr>' + popupField + '</tr>';
                                }
                            } 
                            popupText += '</table></li>';    
                        }
                    }
                } else {
                    currentFeatureKeys = currentFeature.getKeys();
                    if (doPopup) {
                        popupText += '<li><table>';
                        for (var i=0; i<currentFeatureKeys.length; i++) {
                            if (currentFeatureKeys[i] != 'geometry') {
                                popupField = '';
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                } else {
                                    popupField += '<td colspan="2">';
                                }
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                    popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                }
                                if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(currentFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                } else {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                                }
                                popupText += '<tr>' + popupField + '</tr>';
                            }
                        }
                        popupText += '</table></li>';
                    }
                }
            }
            layerHoverCounter++;
        }
    });
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var styleDefinition = currentLayer.getStyle().toString();

                if (currentFeature.getGeometry().getType() == 'Point') {
                    var radius = styleDefinition.split('radius')[1].split(' ')[1];

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            stroke: new ol.style.Stroke({
                                color: 'rgba(255, 255, 255, 1.0)',
                                width: 2
                            }),
                            fill: new ol.style.Fill({
                                color: 'rgba(255, 255, 255, 0.7)'
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'MultiLineString') {

                    var featureWidth = styleDefinition.split('width')[1].split(' ')[1].replace('})','');

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(255, 255, 255, 0.7)',
                            width: 6
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(255, 255, 255, 1.0)',
                            width: 2
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.7)'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
            content.innerHTML = popupText;
            container.style.display = 'block';        
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

// This determins what happens when clicking within the map.
var onSingleClick = function(evt) {
    if (doHover) {
        return;
    }
    if (sketch) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    var layerClickCounter = 1;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layerClickCounter == 1) {
            if (layersList.indexOf(layer) === -1) {
                return;
            }
            if (feature instanceof ol.Feature) {
                var doPopup = false;
                for (k in layer.get('fieldImages')) {
                    if (layer.get('fieldImages')[k] != "Hidden") {
                        doPopup = true;
                    }
                }
                currentFeature = feature;
                clusteredFeatures = feature.get("features");
                var clusterFeature;
                if (typeof clusteredFeatures !== "undefined") {
                    if (doPopup) {
                        for(var n=0; n<clusteredFeatures.length; n++) {
                            clusterFeature = clusteredFeatures[n];
                            currentFeatureKeys = clusterFeature.getKeys();
                            popupText += '<li><table>'
                            for (var i=0; i<currentFeatureKeys.length; i++) {
                                if (currentFeatureKeys[i] != 'geometry') {
                                    popupField = '';
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                    } else {
                                        popupField += '<td colspan="2">';
                                    }
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                        popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                    }
                                    if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(clusterFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                    } else {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="./media/' + clusterFeature.get(currentFeatureKeys[i])  + '" /></td>' : '');
                                    }
                                    popupText += '<tr>' + popupField + '</tr>';
                                }
                            } 
                            popupText += '</table></li>';    
                        }
                    }
                } else {
                    currentFeatureKeys = currentFeature.getKeys();
                    if (doPopup) {
                        popupText += '<li><table>';
                        for (var i=0; i<currentFeatureKeys.length; i++) {
                            if (currentFeatureKeys[i] != 'geometry') {
                                popupField = '';
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                } else {
                                    popupField += '<td colspan="2">';
                                }
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                    popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                }
                                if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(currentFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                } else {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<img onclick=\"imageExpand(\'\',this);\" src="./media/' + currentFeature.get(currentFeatureKeys[i])  + '" /></td>' : '');
                                }
                                popupText += '<tr>' + popupField + '</tr>';
                            }
                        }
                        popupText += '</table>';
                    }
                }
            }
        }
        layerClickCounter++;
    });
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
    
    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();
    for (i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1]) {
            var url = wms_layers[i][0].getSource().getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection,
                {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {
                popupText = popupText + '<iframe style="width:100%;height:110px;border:0px;" id="iframe" seamless src="' + url + '"></iframe>';
            }
        }
    }

    if (popupText) {
        overlayPopup.setPosition(coord);
        content.innerHTML = popupText;
        container.style.display = 'block';        
    } else {
        container.style.display = 'none';
        closer.blur();
    }
};



map.on('pointermove', function(evt) {
    onPointerMove(evt);
});
map.on('singleclick', function(evt) {
    onSingleClick(evt);
});

var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);

// Our added functionalities
// First, an object that structures the data and files and layers for the different parts
// Note that all the additional photos for each storyteller are missing contentText.
// contentText was intended to hold captions describing the images that go into the carousel, but we didn't get around to writing them.
var arrayLayers = {
    // intro + storytellers
    storyteller: {
        // intro
        0: {
            status: "initial",
            layer: "",
            header: "To Use This Map",
            profileImage: "st_marks_standing.jpg",
            audio: "",
            1: {
                contentImage: "",
                contentText:
                    "Disclaimer: This map is a compilation of historical data from 1952-1968 and is intended for educational purposes only."
                    + "<br/><br/>Map can be panned (mouse click and drag) and zoomed (mouse double-click or mouse scrollwheel or buttons in upper left corner). Some points do not appear until sufficiently zoomed in."
                    + "<br/><br/>Click on a storyteller's button above to highlight that individual's story."
                    + "<br/><br/>Click on a landmark button below to toggle their icons on and off."
                    + "<br/><br/>Click on a location in the map to see more details about it."
                    + "<br/><br/>Click on an image to expand it."
            }
        },
        // storyteller1
        1: {
            status: "initial",
            layer: lyr_June_AdamsBorien_19,
            header: "June Marcia Frances Adams-Borien",
            profileImage: "01_June_Borien/01_June_Borien.jpg",
            audio: "01_June_Borien/01_June_Borien.mp3",
            1: {
                contentImage: "01_June_Borien/JB-carousel1_Baptismal_Record.jpg",
                contentText: 
                    "June Adams-Borien, former teacher and second youngest of seven children, has been a long-standing member of the District Six community. Although she was born on the outskirts of District Six in Woodstock, much of her upbringing took place in the heart of District Six."
                    + "<br/><br/>She was baptised and confirmed at St. Mark’s church, attended Zonnebloem Girls Practising School, and worked at her father’s shoe repair shop, Modern Shoe Repairs, located at 136 Hanover Street during busy seasons. She also frequented Hanover Street with her friends to visit places such as the Star Bioscope and the library at the Lieberman Institute. June particularly enjoyed the food from the Indian shops on Hanover Street."
                    + "<br/><br/>In her words, \"Hanover Street was the lifeblood, as it were, of District Six. It was a constant coming and going of people walking on its narrow pavements.\""
            },
            2: {
                contentImage: "01_June_Borien/JB-carousel2_Marriage_License.jpg",
                contentText: "marriage"
            },
            3: {
                contentImage: "01_June_Borien/JB-carousel3_Shoe_Store.jpg",
                contentText: "shoe store"
            },
            4: {
                contentImage: "01_June_Borien/JB-carousel4_98_Coo.jpg",
                contentText: "coo"
            },
            5: {
                contentImage: "01_June_Borien/JB-carousel5_98_Coo2.jpg",
                contentText: "coo2"
            },
            6: {
                contentImage: "01_June_Borien/JB-carousel6_98_Coo3.jpg",
                contentText: "coo3"
            },
            7: {
                contentImage: "01_June_Borien/JB-carousel7_98_Coo4.jpg",
                contentText: "coo4"
            }
        },
        // storyteller2
        2: {
            status: "initial",
            layer: lyr_Colin_Carollisen_18,
            header: "Colin Carollisen",
            profileImage: "02_Colin_Carollisen/02_Colin_Carollisen.jpg",
            audio: "02_Colin_Carollisen/02_Colin_Carollisen.mp3",
            1: {
                contentImage: "",
                contentText: 
                    "Colin Carollisen, the youngest of five children and active member of St. Mark’s church, remembers fondly the close-knit community of District Six. He is proud to have come from such a diverse neighbourhood where everyone respected each other."
                    + "<br/><br/>He recalls being very active at St. Mark’s church even as a young boy, being appointed altar server and attending church events where he got to admire the St. Mark’s Brigade. Colin continues to be a part of this community as he recently served as a member of St. Mark’s parish council."
                    + "<br/><br/>Furthermore, Colin enjoys assisting community members whenever possible. He is always willing to lend a ride or a helping hand when someone is in need. Colin even keeps in touch with his old classmates from St. Mark’s Primary School and hopes to continue to connect with past, present, and future District Six community members."
            }
        },
        // storyteller3
        3: {
            status: "initial",
            layer: lyr_Esther_Cottle_17,
            header: "Esther Cottle",
            profileImage: "03_Esther_Cottle/01_Esther_Cottle.jpg",
            audio: "03_Esther_Cottle/03_Esther_Cottle.mp3",
            1: {
                contentImage: "03_Esther_Cottle/EC-carousel1_Baptismal_Record.jpg",
                contentText:
                    "Esther Cottle, an avid St. Mark’s church parishioner, was born and bred in District Six. Esther remembers growing up in the vibrant District Six community and recalls with fondness what life was like before the forced removals. She attended St Mark's School, and the Community Centre was a central place for her to have fun, with it being the venue for many concerts, socials, and acting classes. Esther appreciated the culture that the Community Centre harnessed."
                    + "<br/><br/>When the demolition of the houses began, Esther moved to Sheppard, then Bruce Street. She fought to stay in District Six but finally left in 1981. After moving to Lentegeur in Mitchell’s Plain, Esther contemplated leaving St. Mark’s church, thinking she would no longer be able to attend. However, it wasn’t long after the removals that she and her children would make the long train ride to and from District Six to return to her beloved church. She did this for over 30 years and made the best of the journey. For her it was worth traveling the distance."
                    + "<br/><br/>Fortunately for Esther, in October of 2013, she was given a house in District Six as part of restitution. It was a 19 year process of going back and forth with community development workers and the lands claims office, but Esther prevailed and rightfully received her new District Six home."
            },
            2: {
                contentImage: "03_Esther_Cottle/EC-carousel2_Home.jpg",
                contentText: ""
            },
            3: {
                contentImage: "03_Esther_Cottle/EC-carousel3_StMarks_Primary.jpg",
                contentText: ""
            },
            4: {
                contentImage: "03_Esther_Cottle/EC-carousel4_Alphatype_Kids.jpg",
                contentText: ""
            },
            5: {
                contentImage: "03_Esther_Cottle/EC-carousel5_Alphatype_Sitting.jpg",
                contentText: ""
            },
            6: {
                contentImage: "03_Esther_Cottle/EC-carousel6_BirthdayParty.jpg",
                contentText: ""
            },
            7: {
                contentImage: "03_Esther_Cottle/EC-carousel7_Community_Center.jpg",
                contentText: ""
            },
            7: {
                contentImage: "03_Esther_Cottle/EC-carousel8_StMarks.jpg",
                contentText: ""
            }
        },
        // storyteller4
        4: {
            status: "initial",
            layer: lyr_Kenneth_Hess_16,
            header: "Kenneth Hess",
            profileImage: "04_Kenneth_Hess/04_Kenneth_Hess.jpg",
            audio: "04_Kenneth_Hess/04_Kenneth_Hess.mp3",
            1: {
                contentImage: "04_Kenneth_Hess/KH-carousel1_TaflagarHotel1.jpg",
                contentText:
                    "Kenneth Hess, current parishioner of St. Mark’s Church, remembers District Six being a very diverse place. Upon reflecting on his life, he recognized that there were a few incidents in which black people were treated with less respect than white people, most notably at his school, St. Theresa’s. However, Kenneth believes that he was spiritually guided to be in those spaces for a reason."
                    + "<br/><br/>As he grew older, he wasn’t able to finish schooling. He attended Zonnebloem for a short period of time but did not finish due to circumstances at home. Kenneth would sell newspapers and ice cream to help his family financially as he was the son of a single mother. He remembers often changing jobs until he began working for a Dutch merchant company."
                    + "<br/><br/>However, the humble beginnings of Kenneth’s life did not faze him, as he remembered District Six as a mecca for entertainment. He would frequent the markets, cinemas, and hotels to have a good time. Kenneth laments the destruction of District Six as it had a negative effect on so many people’s lives."
                    + "<br/><br/>Fortunately, Kenneth’s career in the merchant navy provided him with the finances to move into his own house in another area before the forced removals began. During his years in the merchant navy, Kenneth was able to travel the world, including the United States, the ABC Islands, Japan, and Antarctica. He also picked up many languages along the way."
            },
            2: {
                contentImage: "04_Kenneth_Hess/KH-carousel2_TaflagarHotel2.jpg",
                contentText: ""
            }
        },
        // storyteller5
        5: {
            status: "initial",
            layer: lyr_Susan_Lewis_15,
            header: "Susan Lewis",
            profileImage: "05_Susan_Lewis/05_Susan_Lewis.jpg",
            audio: "05_Susan_Lewis/05_Susan_Lewis.mp3",
            1: {
                contentImage: "05_Susan_Lewis/SL-carousel1_Bleachers.jpg",
                contentText:
                    "Susan Lewis, the sixth of nine children and former parishioner of St. Mark’s Church, remembers having a glorious childhood despite coming from a poor household. As a child, she would play outside until late at night because there was always someone looking after the children. Susan remembers how supportive the District Six community was when someone was in need and attributes this communal environment to her great upbringing."
                    + "<br/><br/>At the age of 27 years old, Susan and her family were forcibly removed to Hanover Park. She felt that she had lost the sense of community that District Six had naturally fostered. However, with time, she was able to build great relationships with those in Hanover Park as she had lived there for 35 years."
                    + "<br/><br/>Currently, Susan is back in District Six. She and her mother were able to move back to District Six with the first group of restitution receivers. Her mother has since passed away at the age of 99, but fortunately was able to spend five years back in District Six."
                    + "<br/><br/>Susan has adjusted well to being back in District Six and continues to educate people on the history of District Six, serving as a tour guide at the District Six Museum and even being interviewed by TIME Magazine."
            },
            2: {
                contentImage: "05_Susan_Lewis/SL-carousel2_Briggade1.jpg",
                contentText: ""
            },
            3: {
                contentImage: "05_Susan_Lewis/SL-carousel3_StMarks.jpg",
                contentText: ""
            }
        },
        // storyteller6
        6: {
            status: "initial",
            layer: lyr_Denise_Lowton_14,
            header: "Denise Lowton",
            profileImage: "06_Denise_Lowton/06_Denise_Lowton.jpg",
            audio: "06_Denise_Lowton/06_Denise_Lowton.mp3",
            1: {
                contentImage: "06_Denise_Lowton/DL-carousel1_Baptismal_Record.jpg",
                contentText:
                    "Denise Lowton, middle child of five, was the daughter of an Anglican father and a Muslim mother. She fondly remembers the balcony on their home that allowed her and her siblings to see ships in the harbour and downtown Cape Town, as well as the neighbourly environment of District Six."
                    + "<br/><br/>Denise recalls walking to St. Mark’s church on Wednesdays with peers from all faiths for St. Mark's School's weekly services and how it felt like \"one big happy community family.\" At the age of 16, Denise began working to support her family."
                    + "<br/><br/>In 1979, when her family was forcibly removed to Mitchell’s Plain, they attended St. Mark’s only occasionally. After years of occasional attendance and trying out different churches, Denise and her family returned as regular parishioners of St. Mark’s in the mid-1980s. Denise holds a lot of pride in the church refusing to be demolished and has shown her appreciation by being on the church council and also serving as a church warden."
            },
            2: {
                contentImage: "06_Denise_Lowton/DL-carousel2_St_Marks.jpg",
                contentText: ""
            },
            3: {
                contentImage: "06_Denise_Lowton/DL-carousel3_21st_Birthday.jpg",
                contentText: ""
            },
            4: {
                contentImage: "06_Denise_Lowton/DL-carousel4_ID.jpg",
                contentText: ""
            },
            5: {
                contentImage: "06_Denise_Lowton/DL-carousel5_Robben_Island.jpg",
                contentText: ""
            }
        },
        // storyteller7
        7: {
            status: "initial",
            layer: lyr_Helene_Sables_13,
            header: "Helene Sables",
            profileImage: "07_Helene_Sables/07_Helene_Sables.jpg",
            audio: "07_Helene_Sables/07_Helene_Sables.mp3",
            1: {
                contentImage: "07_Helene_Sables/HS-carousel1_Baptismal_Record.jpg",
                contentText:
                    "Helene Sables, long time parishioner of St. Mark’s church, recalls spending much of her leisure time as a child at the church. Helene, her sister, and her two brothers joined the church’s choir and were required to attend practise every Monday, Tuesday, and Thursday."
                    + "<br/><br/>Through the choir, she was able to make strong friendships that have lasted through the years. Even after so many years she’s been able to stay in touch with quite a few friends that were in choir with her. Helene also remembers spending time at the Community Centre where she did ballet and played badminton."
                    + "<br/><br/>Despite being forcibly removed to Mitchell's Plain, Helene always returned to her beloved St. Mark’s church because it has always felt like \"home\". She has always felt a \"sense of belonging\". Helene is currently back in District Six and has joined the neighbourhood watch where she’s become great friends with her neighbours."
            },
            2: {
                contentImage: "07_Helene_Sables/HS-carousel2_3MO.jpg",
                contentText: ""
            },
            3: {
                contentImage: "07_Helene_Sables/HS--carousel3_2YO.jpg",
                contentText: ""
            },
            4: {
                contentImage: "07_Helene_Sables/HS-carousel4_Company_Gardens.jpg",
                contentText: ""
            },
            5: {
                contentImage: "07_Helene_Sables/HS-carousel5_25VirginiaSt_Grandmas_House.jpg",
                contentText: ""
            }
        }
    },
    // landmarks
    landmark: {
        // layers
        1: {
            layer: lyr_Landmarks_Community_12
        },
        2: {
            layer: lyr_Landmarks_Schools_8
        },
        3: {
            layer: lyr_Landmarks_Hospitals_11
        },
        4: {
            layer: lyr_Landmarks_Cinemas_7
        },
        5: {
            layer: [
                lyr_Landmarks_Churches_9,
                lyr_Landmarks_Mosques_10
            ]
        }
    },
    // Baselayer
    historical: {
        // layers
        0: {
            layer: [
                lyr_D6StudyArea_6,
                lyr_streetno_5,
                lyr_1968DistrictSix_4,
                lyr_Buildings_Added_3,
                lyr_D6_Streets_2,
                lyr_D6_Historic_Map_modified_1
            ]
        }
    }
};

// This function handles when any of the storyteller buttons on top-left or layer buttons on bottom are clicked.
function layerToggle(e) {
    var storytellerButtons = document.getElementsByClassName("storyteller-button");
    var eID = e.id;
    var eType = eID.substring(0,(eID.length-1));
    var eNum = eID.substring((eID.length-1),(eID.length));
    var typeArray = arrayLayers[eType];
    var eArray = arrayLayers[eType][eNum];
    // Click Storytellers button on bottom
    if (eID == "storyteller0") {
        if (!(arrayLayers.storyteller[1].layer.getVisible())) {
            for (var key in typeArray) {
                if (key != 0) {
                    typeArray[key].layer.setVisible(true);
                    document.getElementById(eType + key).classList.remove("off");
                    document.getElementById(eType + key).classList.remove("active");
                }
            }
        }
        else {
            for (var key in typeArray) {
                if (key != 0) {
                    typeArray[key].layer.setVisible(false);
                    typeArray[key].layer.setZIndex(0);
                    typeArray[key].status = "initial";
                    document.getElementById(eType + key).classList.remove("active");
                    document.getElementById(eType + key).classList.add("off");
                    contentLoad(typeArray[0]);
                }
            }
        }
        for (var key in typeArray) {
            if (key != 0) typeArray[key].layer.getSource().changed();
        }
    }
    // Click any storyteller button on top-left
    else if (eType == "storyteller") {
        if (!(eArray.layer.getVisible())) {
            for (var key in typeArray) {
                if (key != 0) {
                    typeArray[key].layer.setVisible(true);
                    document.getElementById(eType + key).classList.remove("off");
                    document.getElementById(eType + key).classList.remove("active");
                    document.getElementById("storyteller0").classList.add("active");
                }
            }
        }
        if (!(eArray.status == "highlight")) {
            for (var key in typeArray) {
                if (key != 0) {
                    typeArray[key].status = "subdue";
                    typeArray[key].layer.setZIndex(0);
                }
            }
            for (var key in storytellerButtons) {
                if ((key != "length") && (key != "item") && (key != "namedItem")) storytellerButtons[key].classList.remove("active");
            }
            eArray.status = "highlight";
            eArray.layer.setZIndex(1);
            contentLoad(eArray);
        }
        else {
            for (var key in typeArray) {
                if (key != 0) typeArray[key].status = "initial";
            }
            eArray.layer.setZIndex(0);
            contentLoad(typeArray[0]);
        }
        for (var key in typeArray) {
            if (key != 0) typeArray[key].layer.getSource().changed();
        }
    }
    // Click landmark layer button on bottom
    else if (eType == "landmark") {
        if (eNum == 5) {
            if (!(eArray.layer[0].getVisible())) {
                eArray.layer[0].setVisible(true);
                eArray.layer[1].setVisible(true);
            }
            else {
                eArray.layer[0].setVisible(false);
                eArray.layer[1].setVisible(false);
            }
        }
        else if (!(eArray.layer.getVisible())) {
            eArray.layer.setVisible(true);
        }
        else eArray.layer.setVisible(false);
    }
    // Click historical button on bottom
    else {
        if (eID == "historical0") {
            if (!(eArray.layer[0].getVisible())) {
                for (var key in eArray.layer) eArray.layer[key].setVisible(true);
            }
            else for (var key in eArray.layer) eArray.layer[key].setVisible(false);
        }
        else if (!(eArray.layer.getVisible())) {
            eArray.layer.setVisible(true);
        }
        else eArray.layer.setVisible(false);
    }
    e.classList.toggle("active");
}

// This next section handles switching and loading content pieces in the left sidebar
var headerBox = document.getElementById("header-box");
var profileBox = document.getElementById("profile-box");
var audioBox = document.getElementById("audio-box");
var audioPlayer = document.getElementById("audio-player");
var imageCarousel = document.getElementById("carousel-container");
var carouselMid = document.getElementById("middle-image");
var textBox = document.getElementById("text-box");

var imagePrefix = "<img src='";
var imageFolder = "./media/"
var imageSuffix = "'>";

var audioPrefix = "<audio id='audio-clip' onended='stopPlay()' src='./media/";
var audioSuffix = "'>Your browser does not support the audio element.</audio>";

function contentLoad(eArray) {
    if (eArray.header) {
        headerBox.innerHTML = eArray.header;
    }
    else headerBox.innerHTML = "";
    if (eArray.profileImage) {
        profileBox.innerHTML = imagePrefix + imageFolder + eArray.profileImage + imageSuffix;
        profileBox.style = "display: initial; ";
    }
    else {
        profileBox.innerHTML = "";
        profileBox.style = "display: none;";
    }
    if (eArray.audio) {
        audioBox.innerHTML = audioPrefix + eArray.audio + audioSuffix;
        audioPlayer.style = "display: inline-block";
        audioPlayer.innerHTML = "<i class='fas fa-headphones'></i>";
        audioPlayer.classList.remove("playing");
        audioPlayer.classList.add("paused");
    }
    else {
        audioBox.innerHTML = "";
        audioPlayer.style = "display: none;";
    }
    if (eArray[1].contentImage) {
        imageCarousel.style = "display: initial;";
        carouselMid.innerHTML = imagePrefix + imageFolder + eArray[1].contentImage + imageSuffix;
    }
    else {
        imageCarousel.style = "display: none;";
        carouselMid.innerHTML = "";
    }
    if (eArray[1].contentText) {
        textBox.innerHTML = eArray[1].contentText;
    }
    else textBox.innerHTML = "";
}

// This next group of functions is the custom audio player button
function audioHover() {
    var audioClip = document.getElementById("audio-clip");
    if (!(audioClip.paused)) {
        audioPlayer.style = "display: initial; background-color: gray; color: white;";
    }
    else {
        audioPlayer.style = "display: initial; background-color: white; color: gray;";
    }
}

function audioHoverOut() {
    var audioClip = document.getElementById("audio-clip");
    if (!(audioClip.paused)) {
        audioPlayer.style = "display: initial; background-color: white; color: gray;";
    }
    else {
        audioPlayer.style = "display: initial; background-color: gray; color: white;";
    }
}

function audioPlay() {
    var audioClip = document.getElementById("audio-clip");
    if (!(audioClip.paused)) {
        audioClip.pause();
        audioPlayer.innerHTML = "<i class='fas fa-headphones'></i>";
        audioPlayer.classList.remove("playing");
        audioPlayer.classList.add("paused");
    }
    else {
        audioClip.play();
        audioPlayer.innerHTML = "<i class='fas fa-pause'></i>";
        audioPlayer.classList.remove("paused");
        audioPlayer.classList.add("playing");
    }
}

function stopPlay() {
    audioPlayer.innerHTML = "<i class='fas fa-play'></i>";
    audioPlayer.classList.remove("playing");
    audioPlayer.classList.add("paused");
}

// Handles toggling the overlay when an image is clicked
function imageExpand(action,e) {
    var image;
    var caption;
    if (action == "off") {
        document.getElementById("image-overlay").style = "display: none;";
    }
    else {
        if (e.tagName == "IMG") {
            image = e.currentSrc;
            var popupText = document.getElementById("popup-content").innerHTML;
            var captionEnd = popupText.indexOf(".</td></tr>") + 11;
            caption = popupText.substring(0,captionEnd);
        }
        else {
            image = e.getElementsByTagName("img")[0].currentSrc;
            if (e.id == "profile-box") {
                var num;
                var storytellers = document.getElementsByClassName("storyteller-button");
                for (var key in storytellers) {
                    for (var ind in storytellers[key].classList) {
                        if (storytellers[key].classList[ind] == "active") {
                            num = parseInt(key,10) + 1;
                        }
                    }
                }
                if (!(num)) num = 0;
                caption = arrayLayers.storyteller[num][1].contentText;
            }
            else {
                caption = document.getElementById("text-box").innerHTML;
            }
        }
        document.getElementById("image-expand").innerHTML = imagePrefix + image + imageSuffix;
        document.getElementById("caption-box").innerHTML = caption;
        document.getElementById("image-overlay").style = "display: -webkit-flex; display: flex;";
    }
}

// Handles the image carousel for the storytellers
function imageCarouselChange(direction) {
    // first figure out where in the array the image currently is
    var imgSrcFull = document.getElementById("middle-image").children[0].src;
    var storytellerNum = parseInt(imgSrcFull.substring(imgSrcFull.indexOf("/media/") + 7,imgSrcFull.indexOf("/media/") + 9));
    var imgSrc = imgSrcFull.substring(imgSrcFull.indexOf("/media/") + 7,imgSrcFull.length);
    var eArray = arrayLayers.storyteller[storytellerNum];
    var last = 0;
    for (var key in eArray) {
        if (eArray[key].contentImage == imgSrc) var num = key;
        if (!(isNaN(key))) last++;
    }
    if (direction == "right") {
        if (eArray[parseInt(num) + 1]) {
            // load next
            carouselMid.innerHTML = imagePrefix + imageFolder + eArray[parseInt(num) + 1].contentImage + imageSuffix;
        }
        else {
            // if reach end, then load first
            carouselMid.innerHTML = imagePrefix + imageFolder + eArray[1].contentImage + imageSuffix;
        }
    }
    else {
        if (eArray[parseInt(num) - 1]) {
            // load previous
            carouselMid.innerHTML = imagePrefix + imageFolder + eArray[parseInt(num) - 1].contentImage + imageSuffix;
        }
        else {
            // if reach beginning, then load last
            carouselMid.innerHTML = imagePrefix + imageFolder + eArray[last].contentImage + imageSuffix;
        }
    }
}