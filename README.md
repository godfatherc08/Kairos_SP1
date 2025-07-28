# KAIROS: Adaptive Mars Rover Simulation 🚀

KAIROS (Kinetically Adaptive Intelligent Rover Operating System) is an ongoing Mars rover simulation project built using [Babylon.js](https://www.babylonjs.com/), [Cannon.js](https://github.com/schteppe/cannon.js), and web technologies. It simulates key aspects of a Mars rover's movement, terrain interaction, and telemetry monitoring, with upcoming features like autonomous navigation and AI-based decision-making.

---

 🌍 Live Preview
[https://godfatherc08.github.io/Kairos_SP1/]

---

🧠 Features Implemented

- 🌄 Mars terrain generated from height maps
- 📦 Realistic physics using `CannonJSPlugin`
- 🛰️ Simulated telemetry panel for position, speed, heat, and power
- 🚗 Manual movement controls (WASD)
- 🪐 Mars skybox with realistic texture

---

🎯 Roadmap

| Status | Feature                        | Description                                |
|--------|--------------------------------|--------------------------------------------|
| ✅     | Manual control                 | WASD movement using impulse physics        |
| ✅     | Terrain heightmap              | Mars surface generated with `CreateGroundFromHeightMap` |
| ✅     | Rover model integration        | GLB model loaded and wrapped in root mesh  |
| 🔜     | Autonomous navigation          | AI/pathfinding to drive without manual input |
| 🔜     | Power management module        | Drain/charge system based on solar and load |
| 🔜     | Collision & hazard detection   | React to steep slopes and obstacles        |
| 🔜     | Camera modes                   | Follow cam, 1st person, orbital            |
| 🔜     | Logging & data export          | Export telemetry logs to JSON              |

---

## 🧰 Tech Stack

- Renderer: Babylon.js
- Physics: Cannon.js (via `@babylonjs/core/Physics/Plugins/cannonJSPlugin`)
- 3D Model: NASA Perseverance GLB 
- UI: HTML/CSS, basic JavaScript
- Textures: Mars heightmaps & skybox

