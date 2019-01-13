//Credits: the whole dealing with masks script is from Flatten All Masks.jsx by LeZuse

function getBounds(layer) {
    var mflayer = layer;
    var mfDoc = activeDocument;
    //var mflayer = activeDocument.activeLayer; // currently active layer
    var mfnewdLayer = mfDoc.activeLayer.duplicate(); // Dublicates active layer or group (creating a temp layer)
    mfDoc.activeLayer = mfnewdLayer; // sets the temp layer as the active layer
    mfnewdLayer.merge(); // merges it, this leaves only visible layers

    var mfmlayer = activeDocument.activeLayer; //Grab the currently selected layer

    if (hasVectorMask() == true) { // Only if it has a layer mask
        selectVectorMask(); // Select the vector mask
        rasterizeVectorMask(); // rasterize the vector mask
        applyLayerMask(); // Apply the layer mask
    }
    if (hasLayerMask() == true) { // Only if it has a layer mask
        selectLayerMask(); // Select the layer mask
        applyLayerMask(); // Apply the layer mask
    }
    if (hasFilterMask() == true) { // Only if it has a Smart Filter mask
    }

    var mfheight = mfmlayer.bounds[2] - mfmlayer.bounds[0]; //Grab the H value
    var mfwidth = mfmlayer.bounds[3] - mfmlayer.bounds[1]; //Grab the W value

    mfmlayer.remove(); // delete the temp layer
    mfDoc.activeLayer = mflayer; // gets back to the layer that was active at the begining
    return {
        w: mfheight,
        h: mfwidth
    }; // set it's name to the dimintions we now have
}


function hasLayerMask() {
    var hasLayerMask = false;
    try {
        var ref = new ActionReference();
        var keyUserMaskEnabled = app.charIDToTypeID('UsrM');
        ref.putProperty(app.charIDToTypeID('Prpr'), keyUserMaskEnabled);
        ref.putEnumerated(app.charIDToTypeID('Lyr '), app.charIDToTypeID('Ordn'), app.charIDToTypeID('Trgt'));
        var desc = executeActionGet(ref);
        if (desc.hasKey(keyUserMaskEnabled)) {
            hasLayerMask = true;
        }
    } catch (e) {
        hasLayerMask = false;
    }
    return hasLayerMask;
}


function hasVectorMask() {
    var hasVectorMask = false;
    try {
        var ref = new ActionReference();
        var keyVectorMaskEnabled = app.stringIDToTypeID('vectorMask');
        var keyKind = app.charIDToTypeID('Knd ');
        ref.putEnumerated(app.charIDToTypeID('Path'), app.charIDToTypeID('Ordn'), keyVectorMaskEnabled);
        var desc = executeActionGet(ref);
        if (desc.hasKey(keyKind)) {
            var kindValue = desc.getEnumerationValue(keyKind);
            if (kindValue == keyVectorMaskEnabled) {
                hasVectorMask = true;
            }
        }
    } catch (e) {
        hasVectorMask = false;
    }
    return hasVectorMask;
}


function hasFilterMask() {
    var hasFilterMask = false;
    try {
        var ref = new ActionReference();
        var keyFilterMask = app.stringIDToTypeID("hasFilterMask");
        ref.putProperty(app.charIDToTypeID('Prpr'), keyFilterMask);
        ref.putEnumerated(app.charIDToTypeID('Lyr '), app.charIDToTypeID('Ordn'), app.charIDToTypeID('Trgt'));
        var desc = executeActionGet(ref);
        if (desc.hasKey(keyFilterMask) && desc.getBoolean(keyFilterMask)) {
            hasFilterMask = true;
        }
    } catch (e) {
        hasFilterMask = false;
    }
    return hasFilterMask;
}

function selectLayerMask() {
    try {
        var id759 = charIDToTypeID("slct");
        var desc153 = new ActionDescriptor();
        var id760 = charIDToTypeID("null");
        var ref92 = new ActionReference();
        var id761 = charIDToTypeID("Chnl");
        var id762 = charIDToTypeID("Chnl");
        var id763 = charIDToTypeID("Msk ");
        ref92.putEnumerated(id761, id762, id763);
        desc153.putReference(id760, ref92);
        var id764 = charIDToTypeID("MkVs");
        desc153.putBoolean(id764, false);
        executeAction(id759, desc153, DialogModes.NO);
    } catch (e) {; // do nothing
    }
}

function selectVectorMask() {
    try {
        var id55 = charIDToTypeID("slct");
        var desc15 = new ActionDescriptor();
        var id56 = charIDToTypeID("null");
        var ref13 = new ActionReference();
        var id57 = charIDToTypeID("Path");
        var id58 = charIDToTypeID("Path");
        var id59 = stringIDToTypeID("vectorMask");
        ref13.putEnumerated(id57, id58, id59);
        var id60 = charIDToTypeID("Lyr ");
        var id61 = charIDToTypeID("Ordn");
        var id62 = charIDToTypeID("Trgt");
        ref13.putEnumerated(id60, id61, id62);
        desc15.putReference(id56, ref13);
        executeAction(id55, desc15, DialogModes.NO);
    } catch (e) {; // do nothing
    }
}

function applyLayerMask() {
    try {
        var id765 = charIDToTypeID("Dlt ");
        var desc154 = new ActionDescriptor();
        var id766 = charIDToTypeID("null");
        var ref93 = new ActionReference();
        var id767 = charIDToTypeID("Chnl");
        var id768 = charIDToTypeID("Ordn");
        var id769 = charIDToTypeID("Trgt");
        ref93.putEnumerated(id767, id768, id769);
        desc154.putReference(id766, ref93);
        var id770 = charIDToTypeID("Aply");
        desc154.putBoolean(id770, true);
        executeAction(id765, desc154, DialogModes.NO);
    } catch (e) {; // do nothing
    }
}