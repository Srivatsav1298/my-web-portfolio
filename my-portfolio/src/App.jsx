import CanvasRoot from "./canvas/CanvasRoot";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";

import "./styles/globals.css";

export default function App() {
  return (
    <>
      <CanvasRoot />

      {/* UI ABOVE AI WORLD */}
      <div className="ui-layer">
        <Navbar />
        <Hero />
      </div>
    </>
  );
}
