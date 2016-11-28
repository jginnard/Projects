using UnityEngine;
using System.Collections;

public class Drone : MonoBehaviour {

    static public Drone S; // Singleton 
    public float gameRestartDelay = 2f;
    // These fields control the movement of the ship 
    public float speed = 200;
    // Ship status information 
    [SerializeField]
    private float _shieldLevel = 1;
    // Weapon fields 
    public Weapon[] weapons;
    public bool ____________________________;
    public Bounds bounds;

    // Declare a new delegate type WeaponFireDelegate 
    public delegate void WeaponFireDelegate();
    // Create a WeaponFireDelegate field named fireDelegate. 
    public WeaponFireDelegate fireDelegate;

    void Awake() {
        S = this; // Set the Singleton 
        bounds = Utils.CombineBoundsOfChildren(this.gameObject);
    }

    void Update () {
        // This is where I update the drone's direction
        GameObject target = FindClosestEnemy();
        Vector3 targetDir = target.transform.position - transform.position;
        float step = speed * Time.deltaTime;
        Vector3 newDir = Vector3.RotateTowards(transform.forward, targetDir, step, 0.0F);
        Debug.DrawRay(transform.position, newDir, Color.red);
        transform.rotation = Quaternion.LookRotation(newDir);
        // Use the fireDelegate to fire Weapons 
        // First, make sure the Axis("Jump") button is pressed 
        // Then ensure that fireDelegate isn't null to avoid an error

        //This is where I fire the drone after cheking that a target is on the screen 

        if(Vector3.Distance(target.transform.position, transform.position) < 35 && fireDelegate != null) {
            fireDelegate();
        }
}
    // This variable holds a reference to the last triggering GameObject 
    public GameObject lastTriggerGo = null; // 1

    void OnTriggerEnter(Collider other) {
        // Find the tag of other.gameObject or its parent GameObjects 
        GameObject go = Utils.FindTaggedParent(other.gameObject);
        // If there is a parent with a tag 
        if (go != null) {
            // Make sure it's not the same triggering go as last time 
            if (go == lastTriggerGo)
            { // 2 
                return;
            }
            lastTriggerGo = go; // 3 
            if (go.tag == "Enemy")
            {
                // If the shield was triggered by an enemy 
                // Decrease the level of the shield by 1 
                shieldLevel--;
                // Destroy the enemy 
                Destroy(go); // 4 
            } else {
                print("Triggered: " + go.name); // Move this line here! }
            }
        }
        else {
            // Otherwise announce the original other.gameObject
            print("Triggered: " + other.gameObject.name);
        }
    }

    public float shieldLevel {
        get {
            return (_shieldLevel); // 1 
        }
        set {
            _shieldLevel = Mathf.Min( value, 4 ); // 2 
            // If the shield is going to be set to less than zero 
            if (value < 0) { // 3 
                Destroy(this.gameObject);
                // Tell Main.S to restart the game after a delay 
                Main.S.DelayedRestart( gameRestartDelay );
            }
        }
    }

    Weapon GetEmptyWeaponSlot() {
        for (int i=0; i<weapons.Length; i++) {
            if ( weapons[i].type == WeaponType.none ) {
                return ( weapons[i] );
            }
        }
        return ( null );
    }

    // Find the name of the closest enemy
    GameObject FindClosestEnemy() {
        GameObject[] gos;
        gos = GameObject.FindGameObjectsWithTag("Enemy");
        GameObject closest = null;
        float distance = Mathf.Infinity;
        Vector3 position = transform.position;
        foreach (GameObject go in gos)
        {
            Vector3 diff = go.transform.position - position;
            float curDistance = diff.sqrMagnitude;
            if (curDistance < distance)
            {
                closest = go;
                distance = curDistance;
            }
        }
        return closest;
    }
}
