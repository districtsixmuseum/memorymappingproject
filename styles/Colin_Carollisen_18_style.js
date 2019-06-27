var size = 0;
var placement = 'point';

var style_Colin_Carollisen_18 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "10px, sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    if (arrayLayers.storyteller[2].status == "initial") {
        var style = [ new ol.style.Style({
            image: new ol.style.Circle({radius: 8.0 + size,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(130,86,101,1.0)'})}),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                                labelFill, placement, bufferColor,
                                bufferWidth)
        })];
    }
    else if (arrayLayers.storyteller[2].status == "highlight") {
        var style = [ new ol.style.Style({
            image: new ol.style.Circle({radius: 10.0 + size,
                stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 2}), fill: new ol.style.Fill({color: 'rgba(130,86,101,1.0)'})}),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                                labelFill, placement, bufferColor,
                                bufferWidth)
        })];
    }
    else {
        var style = [ new ol.style.Style({
            image: new ol.style.Circle({radius: 8.0 + size,
                stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(130,86,101,0.8)'})}),
            text: createTextStyle(feature, resolution, labelText, labelFont,
                                labelFill, placement, bufferColor,
                                bufferWidth)
        })];
    }

    return style;
};
