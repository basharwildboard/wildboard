import React from "react";
import ReactDOM from "react-dom/client";
import CharacterSelectionScene from "./character-selection";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <CharacterSelectionScene />
  </React.StrictMode>
);
