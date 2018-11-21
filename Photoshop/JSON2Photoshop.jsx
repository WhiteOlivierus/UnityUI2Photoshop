// using Promise
fetch("test.json")
	.then(response => response.json())
	.then(parsed => /* parsed contains the parsed json object */);
// var rawText = loadJSON("text.json")
// var textJ = JSON.parse(rawText);

var colorRef = new SolidColor;
colorRef.rgb.red = parsed.color.r;
colorRef.rgb.green = parsed.color.g;
colorRef.rgb.blue = parsed.color.b;

var orginalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.INCHES;

var docRef = app.documents.add(2, 4);

var artLayerRef = docRef.artLayers.add();
var groupLayerSetRef = app.activeDocument.layerSets.add();

artLayerRef.kind = LayerKind.TEXT;
artLayerRef.move(groupLayerSetRef, ElementPlacement.INSIDE);
artLayerRef.opacity = parsed.color.a * 100;

var textItemRef = artLayerRef.textItem;

textItemRef.contents = parsed.text;

textItemRef.color = colorRef;

docRef = null;
artLayerRef = null;
textItemRef = null;
groupLayerSetRef = null;

app.preferences.rulerUnits = orginalUnit;