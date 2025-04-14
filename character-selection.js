// character-selection.js
import React, { useState, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Preload, Text } from "@react-three/drei";

const baseURL = "/wildboard/thumbnails/";
const modelBaseURL = "/wildboard/models/";

const characters = [
  {
    id: "wizard-kid",
    name: "Wizard Kid",
    role: "Magical Prodigy",
    bio: "Barely taller than a wand, but packs a punch.",
    modelPath: modelBaseURL + "wizard-kid.glb",
    thumbnail: baseURL + "wizard-kid.png",
  },
  {
    id: "chef",
    name: "Chef",
    role: "Culinary Conqueror",
    bio: "Chops veggies and villains with equal flair.",
    modelPath: modelBaseURL + "chef.glb",
    thumbnail: baseURL + "chef.png",
  }
];

characters.forEach((char) => useGLTF.preload(char.modelPath));

function CharacterPreview({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  scene.rotation.y = Math.PI;
  return <primitive object={scene} scale={1.2} position={[0, -1, 0]} />;
}

function App() {
  const [selected, setSelected] = useState(characters[0]);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", background: "#111", color: "#fff", overflowY: "auto", padding: "1rem" }}>
        <h2>Select Your Character</h2>
        {characters.map((char) => (
          <div key={char.id} onClick={() => setSelected(char)} style={{ cursor: "pointer", marginBottom: "1rem", backgroundColor: selected.id === char.id ? "#444" : "#222", padding: "0.5rem", borderRadius: "0.5rem" }}>
            <img src={char.thumbnail} alt={char.name} width="64" height="64" style={{ float: "left", marginRight: "0.5rem", borderRadius: "0.5rem" }} />
            <strong>{char.name}</strong><br />
            <em>{char.role}</em><br />
            <small>{char.bio}</small>
            <div style={{ clear: "both" }}></div>
          </div>
        ))}
      </div>
      <div style={{ flexGrow: 1 }}>
        <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <Suspense fallback={<Text position={[0, 0, 0]} fontSize={0.2} color="white">Loading model...</Text>}>
            <CharacterPreview modelPath={selected.modelPath} />
          </Suspense>
          <OrbitControls />
          <Preload all />
        </Canvas>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
