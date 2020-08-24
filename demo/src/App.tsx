import React, {MutableRefObject} from 'react';
import './App.scss';
import {SliderSection} from "./SliderSection";
import Simulator from "./simulation/Simulator";
import Text from "./text";

function SimulatorControls() {

    const ref: MutableRefObject<Simulator> = React.useRef(new Simulator({}));

    return <h4 style={{
        position: "fixed",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
    }}><button onClick={() => {
        ref.current.start();
    }}>Start</button>
        <button onClick={() => {
            ref.current.pause();
        }}>Pause</button>
        <button onClick={() => {
            ref.current.resume();
        }}>Resume</button>
        <button onClick={() => {
            ref.current.prevFrame();
        }}>Prev Frame</button>
        <button onClick={() => {
            ref.current.nextFrame();
        }}>Next Frame</button>
        <button onClick={() => {
            ref.current.stop();
        }}>Stop</button>
        <Simulator ref={ref}/>
    </h4>
}

function App() {
    return (
        <div className="App">
            <SimulatorControls/>
            <p style={{margin: 5}}>{Text.alphaVersion}</p>
            <br/>
            <h1>{Text.title}</h1>
            <h4>{Text.tagline}</h4>
            <h6>{Text.by} <a href={"https://github.com/yuruh"} target={"_blank"} rel="noopener noreferrer">Antoine Lempereur</a></h6>
            <p>{Text.basicExplanation}</p>
            <p>{Text.trickyQuestion}</p>
            <hr/>
            <h2>{Text.configTitle}</h2>
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
            <h2>{Text.aboutTitle}</h2>
            <div className={"section"}>About<p>Making a complex behaviour emerge from simple rules. Transforming a web page in a suitable environment.</p></div>
            <div className={"section"}>Technical Specificities</div>
            <div className={"section"}>Source Code / Contributing</div>
        </div>
    );
}

export default App;
