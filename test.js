import * as BABYLON from 'babylonjs';
import { Scene, Engine } from 'babylonjs';

const createScene = () => {
   const scene = new BABYLON.Scene(engine);

   const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI/2, Math.PI/2.5,3, new BABYLON.Vector3(0, 0, 0), scene)
   camera.attachControl(canvas, true)

   const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)
   
   const faceUV = [];
faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side

   const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true}, scene)
   box.position.y = 0.5
   const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
   roof.scaling.x = 0.75;
   roof.rotation.z = Math.PI / 2;
   roof.position.y = 1.22;

   const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height:10});

   const groundMat = new BABYLON.StandardMaterial("groundMat");
   groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
   ground.material = groundMat;

const roofMat = new BABYLON.StandardMaterial("roofMat");
roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
const boxMat = new BABYLON.StandardMaterial("boxMat");
boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png");
roof.material = roofMat
box.material = boxMat

   return scene;
}