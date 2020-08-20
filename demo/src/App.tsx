import React from 'react';
import './App.scss';
import {SliderSection} from "./SliderSection";

function App() {
  return (
    <div className="App">
      <h1>DOM BOIDS</h1>
      <h4>Teeming the web with life</h4>
      <h6>By <a href={"https://github.com/yuruh"} target={"_blank"} rel="noopener noreferrer">Antoine Lempereur</a></h6>
      <p>Based on Craig Reynolds BOIDS model, stuff that should be said so ppl understand what's going on</p>
      <hr/>
      <h2>Configuring the simulation</h2>
      <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
      <div className={"align-right"}>
        <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
      </div>
      <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
      <div className={"align-right"}>
        <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
      </div>
      <hr/>
      <h2>About the project</h2>
      <div className={"section"}>About<p>Making a complex behaviour emerge from simple rules. Transforming a web page in the boids environment</p></div>
      <div className={"section"}>Technical Specificities</div>
      <div className={"section"}>Development</div>
    </div>
  );
}

export default App;
