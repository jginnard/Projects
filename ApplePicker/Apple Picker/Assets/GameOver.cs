using UnityEngine;
using System.Collections;
using UnityEngine.UI;


public class GameOver : MonoBehaviour {
    public Text scoreGT;
    public Text highScoreGT;

    // Use this for initialization
    void Start () {
        // Find a reference to the ScoreCounter GameObject 
        GameObject highScoreGO = GameObject.Find("HighScoreValue"); // 2 
        // Get the GUIText Component of that GameObject 
        highScoreGT = highScoreGO.GetComponent<Text>(); // 3 
        // Set the starting number of points to 0 
        highScoreGT.text = HighScore.score.ToString();


        // Find a reference to the ScoreCounter GameObject 
        GameObject scoreGO = GameObject.Find("YourScoreValue"); // 2 
        // Get the GUIText Component of that GameObject 
        scoreGT = scoreGO.GetComponent<Text>(); // 3 
        // Set the starting number of points to 0 
        scoreGT.text = HighScore.myScore.ToString();
    }
	
	// Update is called once per frame
	void Update () {
	
	}
}
