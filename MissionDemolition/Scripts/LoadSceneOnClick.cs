using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class LoadSceneOnClick : MonoBehaviour {

public void LoadByIndex(int sceneIndex) {
        SceneManager.LoadScene(sceneIndex);
    }

    public void SelectLevel(int level) {
        MissionDemolition.level = level;
    }

    public void SelectProjectile(float value) {
        Slingshot.velocityMult = value;
    }

    public void exitGame() {
        Application.Quit();
    }

}
