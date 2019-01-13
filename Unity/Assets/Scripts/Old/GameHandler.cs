using System.IO;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameHandler : MonoBehaviour {

    [SerializeField]
    private Text m_text;

    // Use this for initialization
    private void Start () {
        Debug.Log("Gamehandler.start");

        /*
        // Create new user data variables and save to a json script
        UserData userData = new UserData();
        userData.position = new Vector3(280, 160, 0);
        userData.color = new Color(255,0,0);
        userData.text = "This is a text created by a json script.";

        string json = JsonUtility.ToJson(userData);
        Debug.Log(json);

        File.WriteAllText(Application.dataPath + "/saveFile.json", json);
        */

        // Read and load the user data variables from json script
        string json = File.ReadAllText(Application.dataPath + "/saveFile.json");
        UserData loadedUserData = JsonUtility.FromJson<UserData>(json);
        m_text.transform.position = loadedUserData.position;
        m_text.color = loadedUserData.color;
        m_text.text = loadedUserData.text;
    }
}
