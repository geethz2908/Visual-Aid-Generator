import React from "react";
import VisualAidForm from "./components/VisualAidForm";
import "./App.css";
import bgImg from "./assets/bg.png";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Visual Aid Generator</h1>
      </header>

      <section
        className="hero-section"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="overlay">
          <VisualAidForm />
        </div>
      </section>
    </div>
  );
}

export default App;
