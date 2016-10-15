using UnityEngine;
using System.Collections;

public class AppleTree : MonoBehaviour {

    //Prefab for instantiating apples
    public GameObject applePrefab;

    //Speed at which the AppleTree moves in meters/second
    public float speed = 1f;

    //Chance that the AppleTree will change directions
    public float leftAndRightEdge = 10f;

    // Chance that the AppleTree will change directions
    public float chanceToChangeDirections - 0.1f;

    // Rate at which Apples will be instantiated
    public float secondsBetweenAppleDrops = 1f;

	// Use this for initialization
	void Start () {
	    //Dropping apples every second
	}
	
	// Update is called once per frame
	void Update () {
	    // Basic Movement
        // Changing Direction
	}
}
