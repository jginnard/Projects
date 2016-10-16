using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class HighScore : MonoBehaviour {

    static public int score = 1000;
    static public int myScore = 0;
    // Use this for initialization
    void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
        Text gt1 = this.GetComponent<Text>();
        gt1.text = myScore.ToString();
        Text gt = this.GetComponent<Text>();
        gt.text = "High Score: " + score;
    }
}
