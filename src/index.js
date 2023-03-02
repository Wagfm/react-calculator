import React from "react";
import { createRoot } from "react-dom/client"

import App from "./components/App"

import "./style.css"

const element = document.getElementById("root");
const root = createRoot(element);
root.render(<App />)