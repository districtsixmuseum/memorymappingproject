var wms_layers = [];

var lyr_AerialCurrent_0 = new ol.layer.Tile({
    'title': 'Aerial Current',
    'type': 'base',
    'opacity': 1.000000,
    source: new ol.source.XYZ({
        attributions: "Map data ©2019 " + "<a href='https://www.google.com/permissions/geoguidelines/'>Google</a>" + " contributors | " + "<a href='https://github.com/tomchadwin/qgis2web'>qgis2web</a>",
        url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
    })
});

var lyr_D6_Historic_Map_modified_1 = new ol.layer.Image({
    opacity: 1,
    title: "D6_Historic_Map_modified",
    source: new ol.source.ImageStatic({
        url: "./layers/D6_Historic_Map_modified_1.png",
        attributions: '<a href=""></a>',
        projection: 'EPSG:3857',
        alwaysInRange: true,
        imageExtent: [2050467.364182, -4020840.400205, 2053386.993766, -4018606.616534]
    })
});

var format_D6_Streets_2 = new ol.format.GeoJSON();
var features_D6_Streets_2 = format_D6_Streets_2.readFeatures(json_D6_Streets_2, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_D6_Streets_2 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_D6_Streets_2.addFeatures(features_D6_Streets_2);
var lyr_D6_Streets_2 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_D6_Streets_2,
    style: style_D6_Streets_2,
    title: '<img src="styles/legend/D6_Streets_2.png" /> D6_Streets'
});

var format_Buildings_Added_3 = new ol.format.GeoJSON();
var features_Buildings_Added_3 = format_Buildings_Added_3.readFeatures(json_Buildings_Added_3, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Buildings_Added_3 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Buildings_Added_3.addFeatures(features_Buildings_Added_3);
var lyr_Buildings_Added_3 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Buildings_Added_3,
    style: style_Buildings_Added_3,
    title: '<img src="styles/legend/Buildings_Added_3.png" /> Buildings_Added'
});

var format_1968DistrictSix_4 = new ol.format.GeoJSON();
var features_1968DistrictSix_4 = format_1968DistrictSix_4.readFeatures(json_1968DistrictSix_4, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_1968DistrictSix_4 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_1968DistrictSix_4.addFeatures(features_1968DistrictSix_4);
var lyr_1968DistrictSix_4 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_1968DistrictSix_4,
    style: style_1968DistrictSix_4,
    title: '<img src="styles/legend/1968DistrictSix_4.png" /> 1968 District Six'
});

var format_streetno_5 = new ol.format.GeoJSON();
var features_streetno_5 = format_streetno_5.readFeatures(json_streetno_5, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_streetno_5 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_streetno_5.addFeatures(features_streetno_5);
var lyr_streetno_5 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_streetno_5,
    style: style_streetno_5,
    title: '<img src="styles/legend/streetno_5.png" /> street no'
});

var format_D6StudyArea_6 = new ol.format.GeoJSON();
var features_D6StudyArea_6 = format_D6StudyArea_6.readFeatures(json_D6StudyArea_6, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_D6StudyArea_6 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_D6StudyArea_6.addFeatures(features_D6StudyArea_6);
var lyr_D6StudyArea_6 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_D6StudyArea_6,
    style: style_D6StudyArea_6,
    title: '<img src="styles/legend/D6StudyArea_6.png" /> D6 Study Area'
});

var format_Landmarks_Cinemas_7 = new ol.format.GeoJSON();
var features_Landmarks_Cinemas_7 = format_Landmarks_Cinemas_7.readFeatures(json_Landmarks_Cinemas_7, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Landmarks_Cinemas_7 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Landmarks_Cinemas_7.addFeatures(features_Landmarks_Cinemas_7);
var lyr_Landmarks_Cinemas_7 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Landmarks_Cinemas_7,
    style: style_Landmarks_Cinemas_7,
    title: '<img src="styles/legend/Landmarks_Cinemas_7.png" /> Landmarks_Cinemas'
});

var format_Landmarks_Schools_8 = new ol.format.GeoJSON();
var features_Landmarks_Schools_8 = format_Landmarks_Schools_8.readFeatures(json_Landmarks_Schools_8, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Landmarks_Schools_8 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Landmarks_Schools_8.addFeatures(features_Landmarks_Schools_8);
var lyr_Landmarks_Schools_8 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Landmarks_Schools_8,
    style: style_Landmarks_Schools_8,
    title: '<img src="styles/legend/Landmarks_Schools_8.png" /> Landmarks_Schools'
});

var format_Landmarks_Churches_9 = new ol.format.GeoJSON();
var features_Landmarks_Churches_9 = format_Landmarks_Churches_9.readFeatures(json_Landmarks_Churches_9, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Landmarks_Churches_9 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Landmarks_Churches_9.addFeatures(features_Landmarks_Churches_9);
var lyr_Landmarks_Churches_9 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Landmarks_Churches_9,
    style: style_Landmarks_Churches_9,
    title: '<img src="styles/legend/Landmarks_Churches_9.png" /> Landmarks_Churches'
});

var format_Landmarks_Mosques_10 = new ol.format.GeoJSON();
var features_Landmarks_Mosques_10 = format_Landmarks_Mosques_10.readFeatures(json_Landmarks_Mosques_10, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Landmarks_Mosques_10 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Landmarks_Mosques_10.addFeatures(features_Landmarks_Mosques_10);
var lyr_Landmarks_Mosques_10 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Landmarks_Mosques_10,
    style: style_Landmarks_Mosques_10,
    title: '<img src="styles/legend/Landmarks_Mosques_10.png" /> Landmarks_Mosques'
});

var format_Landmarks_Hospitals_11 = new ol.format.GeoJSON();
var features_Landmarks_Hospitals_11 = format_Landmarks_Hospitals_11.readFeatures(json_Landmarks_Hospitals_11, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Landmarks_Hospitals_11 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Landmarks_Hospitals_11.addFeatures(features_Landmarks_Hospitals_11);
var lyr_Landmarks_Hospitals_11 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Landmarks_Hospitals_11,
    style: style_Landmarks_Hospitals_11,
    title: '<img src="styles/legend/Landmarks_Hospitals_11.png" /> Landmarks_Hospitals'
});

var format_Landmarks_Community_12 = new ol.format.GeoJSON();
var features_Landmarks_Community_12 = format_Landmarks_Community_12.readFeatures(json_Landmarks_Community_12, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Landmarks_Community_12 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Landmarks_Community_12.addFeatures(features_Landmarks_Community_12);
var lyr_Landmarks_Community_12 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Landmarks_Community_12,
    style: style_Landmarks_Community_12,
    title: '<img src="styles/legend/Landmarks_Community_12.png" /> Landmarks_Community'
});

var format_Helene_Sables_13 = new ol.format.GeoJSON();
var features_Helene_Sables_13 = format_Helene_Sables_13.readFeatures(json_Helene_Sables_13, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Helene_Sables_13 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Helene_Sables_13.addFeatures(features_Helene_Sables_13);
var lyr_Helene_Sables_13 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Helene_Sables_13,
    style: style_Helene_Sables_13,
    title: '<img src="styles/legend/Helene_Sables_13.png" /> Helene_Sables'
});

var format_Denise_Lowton_14 = new ol.format.GeoJSON();
var features_Denise_Lowton_14 = format_Denise_Lowton_14.readFeatures(json_Denise_Lowton_14, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Denise_Lowton_14 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Denise_Lowton_14.addFeatures(features_Denise_Lowton_14);
var lyr_Denise_Lowton_14 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Denise_Lowton_14,
    style: style_Denise_Lowton_14,
    title: '<img src="styles/legend/Denise_Lowton_14.png" /> Denise_Lowton'
});

var format_Susan_Lewis_15 = new ol.format.GeoJSON();
var features_Susan_Lewis_15 = format_Susan_Lewis_15.readFeatures(json_Susan_Lewis_15, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Susan_Lewis_15 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Susan_Lewis_15.addFeatures(features_Susan_Lewis_15);
var lyr_Susan_Lewis_15 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Susan_Lewis_15,
    style: style_Susan_Lewis_15,
    title: '<img src="styles/legend/Susan_Lewis_15.png" /> Susan_Lewis'
});

var format_Kenneth_Hess_16 = new ol.format.GeoJSON();
var features_Kenneth_Hess_16 = format_Kenneth_Hess_16.readFeatures(json_Kenneth_Hess_16, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Kenneth_Hess_16 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Kenneth_Hess_16.addFeatures(features_Kenneth_Hess_16);
var lyr_Kenneth_Hess_16 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Kenneth_Hess_16,
    style: style_Kenneth_Hess_16,
    title: '<img src="styles/legend/Kenneth_Hess_16.png" /> Kenneth_Hess'
});

var format_Esther_Cottle_17 = new ol.format.GeoJSON();
var features_Esther_Cottle_17 = format_Esther_Cottle_17.readFeatures(json_Esther_Cottle_17, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Esther_Cottle_17 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Esther_Cottle_17.addFeatures(features_Esther_Cottle_17);
var lyr_Esther_Cottle_17 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Esther_Cottle_17,
    style: style_Esther_Cottle_17,
    title: '<img src="styles/legend/Esther_Cottle_17.png" /> Esther_Cottle'
});

var format_Colin_Carollisen_18 = new ol.format.GeoJSON();
var features_Colin_Carollisen_18 = format_Colin_Carollisen_18.readFeatures(json_Colin_Carollisen_18, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_Colin_Carollisen_18 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_Colin_Carollisen_18.addFeatures(features_Colin_Carollisen_18);
var lyr_Colin_Carollisen_18 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Colin_Carollisen_18,
    style: style_Colin_Carollisen_18,
    title: '<img src="styles/legend/Colin_Carollisen_18.png" /> Colin_Carollisen'
});

var format_June_AdamsBorien_19 = new ol.format.GeoJSON();
var features_June_AdamsBorien_19 = format_June_AdamsBorien_19.readFeatures(json_June_AdamsBorien_19, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
});
var jsonSource_June_AdamsBorien_19 = new ol.source.Vector({
    attributions: '<a href=""></a>',
});
jsonSource_June_AdamsBorien_19.addFeatures(features_June_AdamsBorien_19);
var lyr_June_AdamsBorien_19 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_June_AdamsBorien_19,
    style: style_June_AdamsBorien_19,
    title: '<img src="styles/legend/June_AdamsBorien_19.png" /> June_Adams-Borien'
});

lyr_AerialCurrent_0.setVisible(true);
lyr_D6_Historic_Map_modified_1.setVisible(true);
lyr_D6_Streets_2.setVisible(true);
lyr_Buildings_Added_3.setVisible(true);
lyr_1968DistrictSix_4.setVisible(true);
lyr_streetno_5.setVisible(true);
lyr_D6StudyArea_6.setVisible(true);
lyr_Landmarks_Cinemas_7.setVisible(false);
lyr_Landmarks_Schools_8.setVisible(false);
lyr_Landmarks_Churches_9.setVisible(false);
lyr_Landmarks_Mosques_10.setVisible(false);
lyr_Landmarks_Hospitals_11.setVisible(false);
lyr_Landmarks_Community_12.setVisible(false);
lyr_Helene_Sables_13.setVisible(true);
lyr_Denise_Lowton_14.setVisible(true);
lyr_Susan_Lewis_15.setVisible(true);
lyr_Kenneth_Hess_16.setVisible(true);
lyr_Esther_Cottle_17.setVisible(true);
lyr_Colin_Carollisen_18.setVisible(true);
lyr_June_AdamsBorien_19.setVisible(true);
var layersList = [lyr_AerialCurrent_0, lyr_D6_Historic_Map_modified_1, lyr_D6_Streets_2, lyr_Buildings_Added_3, lyr_1968DistrictSix_4, lyr_streetno_5, lyr_D6StudyArea_6, lyr_Landmarks_Cinemas_7, lyr_Landmarks_Schools_8, lyr_Landmarks_Churches_9, lyr_Landmarks_Mosques_10, lyr_Landmarks_Hospitals_11, lyr_Landmarks_Community_12, lyr_Helene_Sables_13, lyr_Denise_Lowton_14, lyr_Susan_Lewis_15, lyr_Kenneth_Hess_16, lyr_Esther_Cottle_17, lyr_Colin_Carollisen_18, lyr_June_AdamsBorien_19];
lyr_D6_Streets_2.set('fieldAliases', {
    'ID': 'ID',
    'STREETNAME': 'STREETNAME',
    'TownMap': 'TownMap',
    'STREETCODE': 'STREETCODE',
    'DateStart': 'DateStart',
    'DateEnd': 'DateEnd',
});
lyr_Buildings_Added_3.set('fieldAliases', {
    'fid': 'fid',
    'cat': 'cat',
    'Layer': 'Layer',
    'PaperSpace': 'PaperSpace',
    'SubClasses': 'SubClasses',
    'Linetype': 'Linetype',
    'EntityHand': 'EntityHand',
    'Text': 'Text',
});
lyr_1968DistrictSix_4.set('fieldAliases', {
    'Table_1__': 'Table_1__',
    'Table_1_1': 'Table_1_1',
    'Table_1_12': 'Table_1_12',
});
lyr_streetno_5.set('fieldAliases', {
    'Id': 'Id',
    'StreetNo': 'StreetNo',
    'StreetN': 'StreetN',
    'Function': 'Function',
    'StreetNO_': 'StreetNO_',
    'StreetName': 'StreetName',
    'Street_No': 'Street_No',
    'Street_Nam': 'Street_Nam',
    'StretNo_': 'StretNo_',
    'STREET_NUM': 'STREET_NUM',
    'FUNCTION_1': 'FUNCTION_1',
});
lyr_D6StudyArea_6.set('fieldAliases', {
    'Id': 'Id',
});
lyr_Landmarks_Cinemas_7.set('fieldAliases', {
    'fid': 'fid',
    'id': 'id',
    'Name': 'Name',
    'Address': 'Address',
    'Photo': 'Photo',
    'Summary': 'Summary',
    'Year Built': 'Year Built',
    'IDTAG': 'IDTAG',
});
lyr_Landmarks_Schools_8.set('fieldAliases', {
    'id': 'id',
    'IDTAG': 'IDTAG',
    'Name': 'Name',
    'Address': 'Address',
    'Year Built': 'Year Built',
    'Summary': 'Summary',
    'Photo': 'Photo',
});
lyr_Landmarks_Churches_9.set('fieldAliases', {
    'id': 'id',
    'IDTAG': 'IDTAG',
    'Name': 'Name',
    'Address': 'Address',
    'Year Built': 'Year Built',
    'Summary': 'Summary',
    'Photo': 'Photo',
});
lyr_Landmarks_Mosques_10.set('fieldAliases', {
    'id': 'id',
    'IDTAG': 'IDTAG',
    'Name': 'Name',
    'Address': 'Address',
    'Year Built': 'Year Built',
    'Summary': 'Summary',
    'Photo': 'Photo',
});
lyr_Landmarks_Hospitals_11.set('fieldAliases', {
    'id': 'id',
    'IDTAG': 'IDTAG',
    'Name': 'Name',
    'Address': 'Address',
    'Year Built': 'Year Built',
    'Summary': 'Summary',
    'Photo': 'Photo',
});
lyr_Landmarks_Community_12.set('fieldAliases', {
    'id': 'id',
    'IDTAG': 'IDTAG',
    'Name': 'Name',
    'Address': 'Address',
    'Year Built': 'Year Built',
    'Summary': 'Summary',
    'Photo': 'Photo',
});
lyr_Helene_Sables_13.set('fieldAliases', {
    'id': 'id',
    'Place': 'Place',
    'Address': 'Address',
    'Memory': 'Memory',
    'Photo': 'Photo',
});
lyr_Denise_Lowton_14.set('fieldAliases', {
    'id': 'id',
    'Place': 'Place',
    'Address': 'Address',
    'Memory': 'Memory',
    'Photo': 'Photo',
});
lyr_Susan_Lewis_15.set('fieldAliases', {
    'id': 'id',
    'Place': 'Place',
    'Address': 'Address',
    'Memory': 'Memory',
    'Photo': 'Photo',
});
lyr_Kenneth_Hess_16.set('fieldAliases', {
    'id': 'id',
    'Place': 'Place',
    'Address': 'Address',
    'Memory': 'Memory',
    'Photo': 'Photo',
});
lyr_Esther_Cottle_17.set('fieldAliases', {
    'id': 'id',
    'Place': 'Place',
    'Address': 'Address',
    'Memory': 'Memory',
    'Photo': 'Photo',
});
lyr_Colin_Carollisen_18.set('fieldAliases', {
    'id': 'id',
    'Place': 'Place',
    'Address': 'Address',
    'Memory': 'Memory',
    'Photo': 'Photo',
});
lyr_June_AdamsBorien_19.set('fieldAliases', {
    'id': 'id',
    'Place': 'Place',
    'Address': 'Address',
    'Memory': 'Memory',
    'Photo': 'Photo',
});
lyr_D6_Streets_2.set('fieldImages', {
    'ID': 'Range',
    'STREETNAME': 'TextEdit',
    'TownMap': 'TextEdit',
    'STREETCODE': 'TextEdit',
    'DateStart': 'DateTime',
    'DateEnd': 'DateTime',
});
lyr_Buildings_Added_3.set('fieldImages', {
    'fid': 'TextEdit',
    'cat': 'TextEdit',
    'Layer': 'TextEdit',
    'PaperSpace': 'TextEdit',
    'SubClasses': 'TextEdit',
    'Linetype': 'TextEdit',
    'EntityHand': 'TextEdit',
    'Text': 'TextEdit',
});
lyr_1968DistrictSix_4.set('fieldImages', {
    'Table_1__': 'TextEdit',
    'Table_1_1': 'TextEdit',
    'Table_1_12': 'TextEdit',
});
lyr_streetno_5.set('fieldImages', {
    'Id': 'Range',
    'StreetNo': 'TextEdit',
    'StreetN': 'TextEdit',
    'Function': 'TextEdit',
    'StreetNO_': 'TextEdit',
    'StreetName': 'TextEdit',
    'Street_No': 'TextEdit',
    'Street_Nam': 'TextEdit',
    'StretNo_': 'TextEdit',
    'STREET_NUM': 'TextEdit',
    'FUNCTION_1': 'TextEdit',
});
lyr_D6StudyArea_6.set('fieldImages', {
    'Id': 'Range',
});
lyr_Landmarks_Cinemas_7.set('fieldImages', {
    'fid': 'TextEdit',
    'id': 'TextEdit',
    'Name': 'TextEdit',
    'Address': 'TextEdit',
    'Photo': 'Photo',
    'Summary': 'TextEdit',
    'Year Built': 'TextEdit',
    'IDTAG': 'TextEdit',
});
lyr_Landmarks_Schools_8.set('fieldImages', {
    'id': 'TextEdit',
    'IDTAG': 'TextEdit',
    'Name': 'TextEdit',
    'Address': 'TextEdit',
    'Year Built': 'TextEdit',
    'Summary': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Landmarks_Churches_9.set('fieldImages', {
    'id': 'TextEdit',
    'IDTAG': 'TextEdit',
    'Name': 'TextEdit',
    'Address': 'TextEdit',
    'Year Built': 'TextEdit',
    'Summary': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Landmarks_Mosques_10.set('fieldImages', {
    'id': 'TextEdit',
    'IDTAG': 'TextEdit',
    'Name': 'TextEdit',
    'Address': 'TextEdit',
    'Year Built': 'TextEdit',
    'Summary': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Landmarks_Hospitals_11.set('fieldImages', {
    'id': 'TextEdit',
    'IDTAG': 'TextEdit',
    'Name': 'TextEdit',
    'Address': 'TextEdit',
    'Year Built': 'TextEdit',
    'Summary': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Landmarks_Community_12.set('fieldImages', {
    'id': 'TextEdit',
    'IDTAG': 'TextEdit',
    'Name': 'TextEdit',
    'Address': 'TextEdit',
    'Year Built': 'TextEdit',
    'Summary': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Helene_Sables_13.set('fieldImages', {
    'id': 'TextEdit',
    'Place': 'TextEdit',
    'Address': 'TextEdit',
    'Memory': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Denise_Lowton_14.set('fieldImages', {
    'id': 'TextEdit',
    'Place': 'TextEdit',
    'Address': 'TextEdit',
    'Memory': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Susan_Lewis_15.set('fieldImages', {
    'id': 'TextEdit',
    'Place': 'TextEdit',
    'Address': 'TextEdit',
    'Memory': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Kenneth_Hess_16.set('fieldImages', {
    'id': 'TextEdit',
    'Place': 'TextEdit',
    'Address': 'TextEdit',
    'Memory': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Esther_Cottle_17.set('fieldImages', {
    'id': 'TextEdit',
    'Place': 'TextEdit',
    'Address': 'TextEdit',
    'Memory': 'TextEdit',
    'Photo': 'Photo',
});
lyr_Colin_Carollisen_18.set('fieldImages', {
    'id': 'TextEdit',
    'Place': 'TextEdit',
    'Address': 'TextEdit',
    'Memory': 'TextEdit',
    'Photo': 'Photo',
});
lyr_June_AdamsBorien_19.set('fieldImages', {
    'id': 'TextEdit',
    'Place': 'TextEdit',
    'Address': 'TextEdit',
    'Memory': 'TextEdit',
    'Photo': 'Photo',
});
lyr_D6_Streets_2.set('fieldLabels', {
    'ID': 'no label',
    'STREETNAME': 'no label',
    'TownMap': 'no label',
    'STREETCODE': 'no label',
    'DateStart': 'no label',
    'DateEnd': 'no label',
});
lyr_Buildings_Added_3.set('fieldLabels', {
    'fid': 'no label',
    'cat': 'no label',
    'Layer': 'no label',
    'PaperSpace': 'no label',
    'SubClasses': 'no label',
    'Linetype': 'no label',
    'EntityHand': 'no label',
    'Text': 'no label',
});
lyr_1968DistrictSix_4.set('fieldLabels', {
    'Table_1__': 'no label',
    'Table_1_1': 'no label',
    'Table_1_12': 'no label',
});
lyr_streetno_5.set('fieldLabels', {
    'Id': 'no label',
    'StreetNo': 'no label',
    'StreetN': 'no label',
    'Function': 'no label',
    'StreetNO_': 'no label',
    'StreetName': 'no label',
    'Street_No': 'no label',
    'Street_Nam': 'no label',
    'StretNo_': 'no label',
    'STREET_NUM': 'no label',
    'FUNCTION_1': 'no label',
});
lyr_D6StudyArea_6.set('fieldLabels', {
    'Id': 'no label',
});
lyr_Landmarks_Cinemas_7.set('fieldLabels', {
    'fid': 'no label',
    'id': 'no label',
    'Name': 'no label',
    'Address': 'no label',
    'Photo': 'no label',
    'Summary': 'no label',
    'Year Built': 'no label',
    'IDTAG': 'no label',
});
lyr_Landmarks_Schools_8.set('fieldLabels', {
    'id': 'no label',
    'IDTAG': 'no label',
    'Name': 'no label',
    'Address': 'no label',
    'Year Built': 'no label',
    'Summary': 'no label',
    'Photo': 'no label',
});
lyr_Landmarks_Churches_9.set('fieldLabels', {
    'id': 'no label',
    'IDTAG': 'no label',
    'Name': 'no label',
    'Address': 'no label',
    'Year Built': 'no label',
    'Summary': 'no label',
    'Photo': 'no label',
});
lyr_Landmarks_Mosques_10.set('fieldLabels', {
    'id': 'no label',
    'IDTAG': 'no label',
    'Name': 'no label',
    'Address': 'no label',
    'Year Built': 'no label',
    'Summary': 'no label',
    'Photo': 'no label',
});
lyr_Landmarks_Hospitals_11.set('fieldLabels', {
    'id': 'no label',
    'IDTAG': 'no label',
    'Name': 'no label',
    'Address': 'no label',
    'Year Built': 'no label',
    'Summary': 'no label',
    'Photo': 'no label',
});
lyr_Landmarks_Community_12.set('fieldLabels', {
    'id': 'no label',
    'IDTAG': 'no label',
    'Name': 'no label',
    'Address': 'no label',
    'Year Built': 'no label',
    'Summary': 'no label',
    'Photo': 'no label',
});
lyr_Helene_Sables_13.set('fieldLabels', {
    'id': 'no label',
    'Place': 'no label',
    'Address': 'no label',
    'Memory': 'no label',
    'Photo': 'no label',
});
lyr_Denise_Lowton_14.set('fieldLabels', {
    'id': 'no label',
    'Place': 'no label',
    'Address': 'no label',
    'Memory': 'no label',
    'Photo': 'no label',
});
lyr_Susan_Lewis_15.set('fieldLabels', {
    'id': 'no label',
    'Place': 'no label',
    'Address': 'no label',
    'Memory': 'no label',
    'Photo': 'no label',
});
lyr_Kenneth_Hess_16.set('fieldLabels', {
    'id': 'no label',
    'Place': 'no label',
    'Address': 'no label',
    'Memory': 'no label',
    'Photo': 'no label',
});
lyr_Esther_Cottle_17.set('fieldLabels', {
    'id': 'no label',
    'Place': 'no label',
    'Address': 'no label',
    'Memory': 'no label',
    'Photo': 'no label',
});
lyr_Colin_Carollisen_18.set('fieldLabels', {
    'id': 'no label',
    'Place': 'no label',
    'Address': 'no label',
    'Memory': 'no label',
    'Photo': 'no label',
});
lyr_June_AdamsBorien_19.set('fieldLabels', {
    'id': 'no label',
    'Place': 'no label',
    'Address': 'no label',
    'Memory': 'no label',
    'Photo': 'no label',
});
lyr_June_AdamsBorien_19.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});