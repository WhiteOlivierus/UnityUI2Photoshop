using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

[System.Serializable]
public class rootChilds
{
    public List<GameObject> childs;
}

[InitializeOnLoad]
public class UIParser : Editor
{
    private static GameObject root = new GameObject();
    private static rootChilds rootChilds;

    //get all of the UIComponents and init them
    [MenuItem("UI Creator/GetUI")]
    public static List<GameObject> getUI()
    {

        object[] c = Canvas.FindObjectsOfType(typeof(Canvas));

        //get the canvas object
        if (c.Length == 1)
        {
            Canvas cRoot = (Canvas)c[0];
            root = cRoot.gameObject;
        }
        else if (c.Length < 1)
        {
            Debug.LogError("No canvas detected");
            return null;
        }
        else
        {
            Debug.LogError("Found multiple canvasses");
            return null;
        }

        //get all childeren of the canvas object
        int children = root.transform.childCount;
        for (int i = 0; i < children; ++i)
        {
            rootChilds.childs.Add(root.transform.GetChild(i).gameObject);
            Debug.Log(root.transform.GetChild(i).gameObject.name);
        }

        return null;
    }

    public static void saveUI()
    {
        string path = Application.dataPath + "/Editor/savedUI.json";

        string json = JsonUtility.ToJson(getUI());
        File.WriteAllText(path, json);

#if UNITY_EDITOR
        UnityEditor.AssetDatabase.Refresh();
#endif
    }

    public static void openUI()
    {
        string filePath = Application.dataPath + "/Editor/savedUI.json";

        if (File.Exists(filePath))
        {
            string json = File.ReadAllText(filePath);
            rootChilds = JsonUtility.FromJson<rootChilds>(json);
        }
        else
        {
            Debug.LogError("No UI saved found");
            return;
        }
    }
}
