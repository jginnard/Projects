using UnityEngine;
using System.Collections;

public class AppleTree : MonoBehaviour {

    //Prefab for instantiating apples
    public GameObject applePrefab;
    public GameObject orangePrefab;

    //Speed at which the AppleTree moves in meters/second
    public float speed = 1f;

    //Chance that the AppleTree will change directions
    public float leftAndRightEdge = 10f;

    // Chance that the AppleTree will change directions
    public float chanceToChangeDirections = 0.1f;

    // Rate at which Apples will be instantiated
    public float secondsBetweenAppleDrops = 2f;
    public float secondsBetweenOrangeDrops = 3f;

    // Use this for initialization
    void Start()
    {
        //Dropping apples and oranges
        InvokeRepeating("DropApple", 2f, secondsBetweenAppleDrops);
        InvokeRepeating("DropOrange", 2f, secondsBetweenOrangeDrops);
    }
    void DropApple()
    {
        GameObject apple = Instantiate(applePrefab) as GameObject; apple.transform.position = transform.position;
    }
    void DropOrange()
    {
        GameObject orange = Instantiate(orangePrefab) as GameObject; orange.transform.position = transform.position;
    }

    // Update is called once per frame
    void Update() {
        // Basic Movement
        Vector3 pos = transform.position;
        pos.x += speed * Time.deltaTime;
        transform.position = pos;
        // Changing Direction
        if (pos.x < -leftAndRightEdge)
        {
            speed = Mathf.Abs(speed); // Move right 
        }
        else if (pos.x > leftAndRightEdge)
        {
            speed = -Mathf.Abs(speed); // Move left 
        }
    }

    void FixedUpdate() {
        // Changing Direction Randomly 
        if (Random.value < chanceToChangeDirections){
            speed *= -1; // Change direction 
        }
    }
}