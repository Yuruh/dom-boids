import React, {ChangeEvent, MutableRefObject, useEffect} from 'react';
import './App.scss';
import Simulator from "./simulation/Simulator";
import Text from "./text";
import Parameters from "./simulation/Parameters";

/*
    Imperative style, easier to control simulation this way
 */
function SimulatorControls(props: {
    params: Parameters,
}) {
    const ref: MutableRefObject<Simulator | null> = React.useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.restartFromCurrentFrame();
        }
    }, [props.params]);

    return <h4 style={{
        position: "fixed",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
    }}><button onClick={() => {
        if (ref.current)
            ref.current.start();
    }}>Start</button>
        <button onClick={() => {
            if (ref.current)
                ref.current.pause();
        }}>Pause</button>
        <button onClick={() => {
            if (ref.current)
                ref.current.resume();
        }}>Resume</button>
        <button onClick={() => {
            if (ref.current)
                ref.current.prevFrame();
        }}>Prev Frame</button>
        <button onClick={() => {
            if (ref.current)
                ref.current.nextFrame();
        }}>Next Frame</button>
        <button onClick={() => {
            if (ref.current)
                ref.current.stop();
        }}>Stop</button>
        <br/>
        <label>
            Obstacles Force / Quadtree / Rules on boid forces
            <input type={"checkbox"}/>
        </label>
        <Simulator ref={ref} params={props.params}/>
    </h4>
}

function Configuration(props: {onParamsChange:(params: Parameters) => void}) {
    const [config, setConfig] = React.useState<Parameters>(new Parameters());

    function onInputChange(event: ChangeEvent<HTMLInputElement>, key: string) {
        const updated: Parameters = {
            ...config,
            [key]: Number(event.target.value),
        }
        setConfig(updated);
        props.onParamsChange(updated);
    }

    function Slider(props: {
        objectKey: keyof Parameters,
        title: string,
        min: number,
        max: number,
        step: number,
    }) {
        return <span>
            {props.title}
            <input type={"range"} value={config[props.objectKey]} style={{marginLeft: "10px", marginRight: 10}}
                   onChange={(e) => onInputChange(e, props.objectKey)} min={props.min} max={props.max} step={props.step}/>
            {config[props.objectKey]}
        </span>
    }

    return <div className={"align-center"}>
        <div className={"section"}>
            <Slider objectKey="numberOfBoids" title={"Number of Boids"} min={1} max={100} step={1}/>
            <hr/>
            <Slider objectKey="alignmentScale" title={"Alignment"} min={0} max={2} step={0.01}/>
            <br/>
            <Slider objectKey="cohesionScale" title={"Cohesion"} min={0} max={2} step={0.01}/>
            <br/>
            <Slider objectKey="separationScale" title={"Separation"} min={0} max={2} step={0.01}/>
            <br/>
            <Slider objectKey="avoidanceScale" title={"Obstacle avoidance"} min={0} max={2} step={0.01}/>
            <hr/>
            <Slider objectKey="visionDistance" title={"Vision Distance"} min={0} max={500} step={1}/>
            <br/>
            <Slider objectKey="obstacleDistance" title={"Obstacle Distance"} min={0} max={500} step={1}/>
            <br/>
            <Slider objectKey="separationDistance" title={"Separation Distance"} min={0} max={500} step={1}/>
            <hr/>
            <Slider objectKey="maxLocalFlockmates" title={"Max Local Flockmates"} min={0} max={100} step={1}/>
        </div>
    </div>
}

function App() {
    const [params, setParams] = React.useState<Parameters>(new Parameters());

    return (
        <div className="App">
            <SimulatorControls params={params}/>
            <br/>
            <br/>
            <br/>
            <h1>{Text.title}</h1>
            <h4>{Text.tagline}</h4>
            <h6>{Text.by} <a href={"https://github.com/yuruh"} target={"_blank"} rel="noopener noreferrer">Antoine Lempereur</a></h6>
            <p>{Text.basicExplanation}</p>
            <p>{Text.trickyQuestion}</p>
            <hr/>
            <h2>{Text.configTitle}</h2>
            <Configuration onParamsChange={(params: Parameters) =>
                setParams(params)
            }/>
            <hr/>
            <h2>{Text.aboutTitle}</h2>
            <div className={"section"}>Purpose<p>Making a complex behaviour emerge from simple rules. Transforming a web page in a suitable environment.</p></div>
            <div className={"section"}>Understanding what's going on: how does it work ? (toggle arrows and explain rules)</div>
            <div className={"section"}>Technical Specificities / Architecture</div>
            <div className={"section"}>Source Code / Contributing / Roadmap</div>
        </div>
    );
}

export default App;
/*
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
</div>*/
