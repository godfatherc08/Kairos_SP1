import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders'; 
import * as CANNON from 'cannon'; 
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin.js';
import * as Materials from 'babylonjs-materials';
import * as GUI from 'babylonjs-gui';

let position = [];
const discoverables = [  "Hematite Deposits",
    "Perchlorate Salt Crystals",
    "Ancient River Delta",
    "Basalt Lava Tubes",
    "Silica-rich Soil Patches",
    "Polar Water Ice Caps",
    "Carbonate Rock Outcrops",
    "Dust Devil Tracks",
    "Meteorite Fragments",
    "Layered Sedimentary Cliffs"];

for (let x = 0; x < 10; x++) {
  let posX = Math.floor(Math.random() * 1000);
  let posZ = Math.floor(Math.random() * 1000);
 position.push([posX, posZ]);
}
  const resourcesMap = new Map();
    discoverables.forEach((key, index) => {
    resourcesMap.set(key, position[index]);
});
resourcesMap.forEach((value, key) => {
    console.log(`${key}: X=${value[0]}, Z=${value[1]}`);
});
let rover = null; // Global reference

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true);

const limitxyz = 1500
const random_x = Math.floor(Math.random() * limitxyz);
const random_y = Math.floor(Math.random() * limitxyz);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

   scene.enablePhysics(new BABYLON.Vector3(0, -3.71, 0), new CannonJSPlugin(true, 60, CANNON));
     // ✅ GUI belongs here, inside scene
  const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

 const popup = new GUI.Rectangle("popup");
popup.width = "250px";
popup.height = "120px";
popup.cornerRadius = 15;
popup.color = "lime";
popup.thickness = 3;
popup.background = "rgba(10,10,10,0.85)";
popup.isVisible = false;
popup.shadowBlur = 10;
popup.shadowOffsetX = 2;
popup.shadowOffsetY = 2;
ui.addControl(popup);

// Title
const popupTitle = new GUI.TextBlock();
popupTitle.text = "Discovery";
popupTitle.color = "orange";
popupTitle.fontSize = 20;
popupTitle.top = "-40%";
popup.addControl(popupTitle);

// Resource name
const popupText = new GUI.TextBlock();
popupText.text = "";
popupText.color = "white";
popupText.fontSize = 18;
popupText.top = "-10%";
popup.addControl(popupText);

// Details
const popupDetail = new GUI.TextBlock();
popupDetail.text = "";
popupDetail.color = "#a0ffa0";
popupDetail.fontSize = 14;
popupDetail.textWrapping = true;
popupDetail.width = "220px";
popupDetail.height = "60px";
popupDetail.top = "25%";
popup.addControl(popupDetail);

scene.metadata = { popup, popupText, popupDetail };

  const camera = new BABYLON.ArcRotateCamera("roverCamera", -Math.PI/1, Math.PI/5, 2000, BABYLON.Vector3.Zero(), scene);
 // camera.upperRadiusLimit = 550
  camera.upperBetaLimit = Math.PI / 2.2;
  //camera.lowerBetaLimit = 

  camera.attachControl(canvas, true);


const skyboxTexture = BABYLON.CubeTexture.CreateFromImages([
  "https://raw.githubusercontent.com/godfatherc08/Kairos/main/Standard-Cube-Map%20(2)/mars_px.png",
  "https://raw.githubusercontent.com/godfatherc08/Kairos/main/Standard-Cube-Map%20(2)/mars_nx.png",
  "https://raw.githubusercontent.com/godfatherc08/Kairos/main/Standard-Cube-Map%20(2)/mars_py.png",
  "https://raw.githubusercontent.com/godfatherc08/Kairos/main/Standard-Cube-Map%20(2)/mars_ny.png",
  "https://raw.githubusercontent.com/godfatherc08/Kairos/main/Standard-Cube-Map%20(2)/mars_pz.png",
  "https://raw.githubusercontent.com/godfatherc08/Kairos/main/Standard-Cube-Map%20(2)/mars_nz.png"
], scene);

const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.disableLighting = true;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

skyboxMaterial.reflectionTexture = skyboxTexture;
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 4000 }, scene);
skybox.material = skyboxMaterial;
//skybox.infiniteDistance = true;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.5, 0.1, 0), scene);
  light.intensity = 0.7;


const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
                "https://assets.babylonjs.com/environments/villageheightmap.png", 
                { 
                    width: 4000, 
                    height: 4000, 
                    subdivisions: 100,
                    minHeight: 10, 
                    maxHeight: 30
                }, scene);
                
            const groundMat = new Materials.GridMaterial("groundMat", scene);
            groundMat.majorUnitFrequency = 5;
	groundMat.minorUnitVisibility = 0.45;
	groundMat.gridRatio = 2;
	groundMat.backFaceCulling = false;
	groundMat.mainColor = new BABYLON.Color3(0, 0.05, 0.2);
	groundMat.lineColor = new BABYLON.Color3(0, 1.0, 1.0);
	groundMat.opacity = 0.98;
            const groundTexture = new BABYLON.Texture("https://raw.githubusercontent.com/godfatherc08/Kairos/main/Mars_Map_main.jpg", scene);
            groundMat.diffuseTexture = groundTexture;
            ground.material = groundMat;

            const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat", scene);
largeGroundMat.diffuseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/godfatherc08/Kairos/main/Mars_Map_main.jpg");


          const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "https://assets.babylonjs.com/environments/villageheightmap.png" /* url to height map */, 
    {width:4000, height:4000, subdivisions: 300, minHeight:100, maxHeight: 500});
largeGround.material = largeGroundMat;

 ground.diffuseColor = new BABYLON.Color3(0.6, 0.3, 0.1);
ground.specularColor = new BABYLON.Color3(0, 0, 0); 

largeGround.position.y = -60;

ground.position.y = 40.1;


            ground.onReady = () => {
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, friction: 1, restitution: 0.5 },
    scene
  );


  BABYLON.SceneLoader.LoadAssetContainerAsync(
    "https://raw.githubusercontent.com/godfatherc08/Kairos/main/",
    "Perseverance.glb",
    scene
  ).then(container => {
    container.addAllToScene();


    const roverRoot = new BABYLON.Mesh("roverRoot", scene);
    const roverParts = container.meshes.filter(m =>
      m.isVerticesDataPresent("position") && !m.name.startsWith("__root__")
    );

    roverParts.forEach(part => {
      part.setParent(roverRoot);
    });

    // Scale and position
    roverRoot.scaling = new BABYLON.Vector3(70, 70, 70);
   roverRoot.position = new BABYLON.Vector3(0, 80, 0); // ⬆️ higher above the terrain

    // Physics
    roverRoot.physicsImpostor = new BABYLON.PhysicsImpostor(
      roverRoot,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 150, friction: 1.0, restitution: 0 },
      scene
    );

    scene.onBeforeRenderObservable.add(() => {
  if (!rover) return;

  const limit = 1000; // edge
  rover.position.x = BABYLON.Scalar.Clamp(rover.position.x, -limit, limit);
  rover.position.z   = BABYLON.Scalar.Clamp(rover.position.z, -limit, limit);
});

    rover = roverRoot;

    // Controls
    window.addEventListener("keydown", (e) => {
      if (!rover || !rover.physicsImpostor) return;
      switch (e.key.toLowerCase()) {
        case "w":
          rover.translate(BABYLON.Axis.Z, -0.5, BABYLON.Space.LOCAL);
          return;
        case "s":
          rover.translate(BABYLON.Axis.Z, 0.5, BABYLON.Space.LOCAL);
          return;
        case "a":
          rover.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.LOCAL);
          return;
        case "d":
          rover.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.LOCAL);
          return;
      }
    });

    console.log("Rover loaded and physics applied.");
  });

  
};

  return scene;
}; 

const scene = createScene();
const telemetryEl = {
  positionx: document.getElementById('positionx'),
  positiony: document.getElementById('positiony'),
  positionz: document.getElementById('positionz'),
  gravity: document.getElementById('gravity'),
  speed: document.getElementById('speed'),
  heat: document.getElementById('heat'),
  power: document.getElementById('power'),
  carbon: document.getElementById('carbon')
};
//what is that

const powerSystem = {
  batteryLevel: 100, // %
  solarHeat: () => Math.random() * 100 // solar heat intensity
};




engine.runRenderLoop(() => {
  scene.render();
   let found = false;
 if (rover && rover.physicsImpostor) {
  const posx = rover.position.x;
  const posy = rover.position.y;
  const posz = rover.position.z;
  const velocity = rover.physicsImpostor.getLinearVelocity();
  const speed = velocity ? velocity.length() : 0; // ✅ Safe fallback
  const { popup, popupText, popupDetail } = scene.metadata;

resourcesMap.forEach((coords, name) => {

  const dist = posx - coords[0];

  if (dist < 10) {
    popup.isVisible = true;
     popupText.text = `🔎 ${name}`;
    popup.linkWithMesh(rover);
    popup.linkOffsetY = -150;
    found = true;
  }
});

      if (!found) {
      popup.isVisible = false;
    }


  telemetryEl.gravity.textContent = `-3.71 m/s²`;
  telemetryEl.speed.textContent = `${speed.toFixed(2)} m/s`;
  telemetryEl.positionx.textContent = `${posx.toFixed(2)} `;
  telemetryEl.positiony.textContent = `${posy.toFixed(2)} `;
  telemetryEl.positionz.textContent = `${posz.toFixed(2)} `;
  telemetryEl.heat.textContent = `${powerSystem.solarHeat().toFixed(1)} %`;
  telemetryEl.power.textContent = `${powerSystem.batteryLevel.toFixed(1)}`;
} else {
  telemetryEl.positionx.textContent = `Loading...`;
}

});

window.addEventListener("resize", () => {
  engine.resize();
});
