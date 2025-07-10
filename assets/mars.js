import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders'; 
import * as CANNON from 'cannon'; 
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin.js';




let rover = null; // Global reference

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

   scene.enablePhysics(new BABYLON.Vector3(0, -3.71, 0), new CannonJSPlugin(true, 60, CANNON));
  

  const camera = new BABYLON.ArcRotateCamera("roverCamera", -Math.PI/1, Math.PI/5, 200, BABYLON.Vector3.Zero(), scene);
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

const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);
skybox.material = skyboxMaterial;
skybox.infiniteDistance = true;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.5, 0.1, 0), scene);
const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
                "https://raw.githubusercontent.com/godfatherc08/Kairos/refs/heads/main/another%20one.jpg", 
                { 
                    width: 500, 
                    height: 500, 
                    subdivisions: 100,
                    minHeight: 0, 
                    maxHeight: 4
                }, scene);
                
            const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
            const groundTexture = new BABYLON.Texture("https://raw.githubusercontent.com/godfatherc08/Kairos/main/Mars_Map_main.jpg", scene);
            groundMat.diffuseTexture = groundTexture;
            ground.material = groundMat;
            
            // Wait for ground to be ready
            ground.onReady = () => {
                ground.physicsImpostor = new BABYLON.PhysicsImpostor(
                    ground,
                    BABYLON.PhysicsImpostor.BoxImpostor,
                    { mass: 0, friction: 2, restitution: 0 },
                    scene
                );
            };
            

 // ground.material.wireframe = true;

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

  //scale the rover
  roverRoot.scaling = new BABYLON.Vector3(20, 20, 20);
  roverRoot.position = new BABYLON.Vector3(0, 5, 0);

  // Apply physics to rover
  roverRoot.physicsImpostor = new BABYLON.PhysicsImpostor(
    roverRoot,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 100, friction: 1.0, restitution: 0.1 },
    scene
  );

  

  rover = roverRoot;

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

 /* if (!impulse.equals(BABYLON.Vector3.Zero())) {
    const contactPoint = rover.getAbsolutePosition().add(new BABYLON.Vector3(0, -1, 0)); // slightly above center
    powerSystem.batteryLevel = Math.max(0, powerSystem.batteryLevel - 0.2);
  }*/

  console.log("X:", rover.getDirection(BABYLON.Axis.X).toString());
console.log("Y:", rover.getDirection(BABYLON.Axis.Y).toString());
console.log("Z:", rover.getDirection(BABYLON.Axis.Z).toString());

});


  console.log("Rover physics set.");
});



  return scene;
}; 

const scene = createScene();
const telemetryEl = {
  position: document.getElementById('position'),
  gravity: document.getElementById('gravity'),
  speed: document.getElementById('speed'),
  heat: document.getElementById('heat'),
  power: document.getElementById('power')
};


const powerSystem = {
  batteryLevel: 100, // %
  solarHeat: () => Math.random() * 100 // solar heat intensity
};




engine.runRenderLoop(() => {
  scene.render();
 if (rover && rover.physicsImpostor) {
  const pos = rover.position;
  const velocity = rover.physicsImpostor.getLinearVelocity();
  const speed = velocity ? velocity.length() : 0; // ✅ Safe fallback

  telemetryEl.position.textContent = `x:${pos.x.toFixed(2)}, y:${pos.y.toFixed(2)}, z:${pos.z.toFixed(2)}`;
  telemetryEl.gravity.textContent = `-3.71 m/s²`;
  telemetryEl.speed.textContent = `${speed.toFixed(2)} m/s`;
  telemetryEl.heat.textContent = `${powerSystem.solarHeat().toFixed(1)} %`;
  telemetryEl.power.textContent = `${powerSystem.batteryLevel.toFixed(1)}`;
} else {
  telemetryEl.position.textContent = `Loading...`;
}

});

window.addEventListener("resize", () => {
  engine.resize();
});
