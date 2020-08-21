import React, {MutableRefObject, useEffect} from 'react';
import './App.scss';
import {SliderSection} from "./SliderSection";
import Simulator from "./simulation/Simulator";

// If simulator becomes a react component, we get a ref on it
function SimulatorButton() {
  //  let simulator = new Simulator();

    useEffect(() => {
//        simulator = new Simulator();
    })

    const ref: MutableRefObject<Simulator> = React.useRef(new Simulator({}));

    return <h4><button onClick={() => {
        ref.current.start();
    }}>Start</button>
        <button onClick={() => {
            ref.current.pause();
        }}>Pause</button>
        <button onClick={() => {
            ref.current.resume();
        }}>Resume</button>
        <button onClick={() => {
            ref.current.stop();
        }}>Stop</button>
        <Simulator ref={ref}/>
    </h4>
}

function App() {

    return (
        <div className="App">
            <h1>DOM BOIDS</h1>
            <h4>Teeming the web with life</h4>
            <h6>By <a href={"https://github.com/yuruh"} target={"_blank"} rel="noopener noreferrer">Antoine Lempereur</a></h6>
            <p>Based on Craig Reynolds BOIDS model, stuff that should be said so ppl understand what's going on</p>
            <SimulatorButton/>
            <hr/>
            <h2>Configuring the simulation</h2>
            <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
            <span style={{display: "flex"}}>
                <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
                <SliderSection title={"Cohesion"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
            </span>
            <div className={"align-center"}>
                <SliderSection
                    title={"Alignment"}
                    explanation={"Boids should always steer towards the average heading of local flockmates"}
                    value={1} onSliderValueChange={() => {}}/>
            </div>
            <div className={"align-center"}>
                <SliderSection title={"Number of boids"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
            </div>
            <div className={"align-center"}>
                <SliderSection title={"Number of FPS"} explanation={"Lower the value if your browsers has a hard time showing every frame"} value={1} onSliderValueChange={() => {}}/>
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
