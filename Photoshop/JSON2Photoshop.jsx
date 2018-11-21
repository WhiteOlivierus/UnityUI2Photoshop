//import the json library
#include "json2.js"
#include "boundsOfLayer.jsx"

//Get the json file to read from
var file = new File;
file = file.openDlg("Open unity UI json", "*.json");

//Parse the json
var uiData = readJSON(file);

//creating a new document with a size
var docRef = app.documents.add(2, 4);

//getting the ruler units off the document
var orginalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

//creating a normal photoshop layer and setting it to a text layer
var artLayerRef = docRef.artLayers.add();
artLayerRef.kind = LayerKind.TEXT;

//creating a normal photoshop group
var groupLayerSetRef = app.activeDocument.layerSets.add();

//add the layer to a group
artLayerRef.move(groupLayerSetRef, ElementPlacement.INSIDE);

//setting color
var colorRef = new SolidColor;
colorRef.rgb.red = uiData.color.r;
colorRef.rgb.green = uiData.color.g;
colorRef.rgb.blue = uiData.color.b;
artLayerRef.opacity = uiData.color.a * 100;

//getting the text item from the layer and adding color and text
var textItemRef = artLayerRef.textItem;
textItemRef.contents = uiData.text;
textItemRef.color = colorRef;

var size = getBounds(artLayerRef);
alert(size.w + "x" + size.h);

//creating a new document with a size
var docRef = app.documents.add(size.w, size.h);

//clearing the variables
docRef = null;
artLayerRef = null;
textItemRef = null;
groupLayerSetRef = null;

//reseting the document units
app.preferences.rulerUnits = orginalUnit;

//json parser
function readJSON(f) {
    var currentLine;
    var jsonString = [];

    //open the file
    f.open("r");
    while (!f.eof) {
        currentLine = f.readln();
        //fill the json string
        jsonString.push(currentLine);
    }
    f.close();

    //string cleanup for parsing
    jsonString = jsonString.join("");

    //return parsed json
    return JSON.parse(jsonString);
}