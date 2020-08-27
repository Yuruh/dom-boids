import React, {ChangeEvent} from 'react';
import './App.scss';
import Text from "./text";
import Parameters from "./simulation/Parameters";
import SimulatorControls from "./simulation/SimulatorControls";
import TextSection from "./TextSection";

/*On pourrait avoir un boutton qui propose d'arrêter les collisions avec les div aussi.
<label>
Obstacles Force / Quadtree / Rules on boid forces
<input type={"checkbox"}/>
</label>*/

function OutLink(props: React.PropsWithChildren<{
    link: string
}>) {
    return <a target={"_blank"} rel="noopener noreferrer" href={props.link}>
        {props.children}
    </a>
}

const simService = <TextSection title={<span>
    <i className={"fa fa-cogs"}/>
    The simulation service
</span>} size={20} content={<span>
    <OutLink link={"https://github.com/yuruh/boids-service"}>
        <i className={"fa fa-github"}/>
        Source Code
    </OutLink>
    <hr/>
    Written in C++.
    <br/>
    Exposes an HTTP endpoint, using <OutLink link={"https://github.com/microsoft/cpprestsdk"}>cpprestsdk</OutLink> library.
    <br/>
    Serialize data with <OutLink link={"https://developers.google.com/protocol-buffers/docs/cpptutorial"}>protobuf</OutLink> for efficiency. The protocol can be found <a href={"https://github.com/Yuruh/boids-service/blob/master/proto/map.proto"} target={"_blank"} rel="noopener noreferrer">
        here.
    </a>
    <br/>
    Docker image accessible <a href={"https://hub.docker.com/repository/docker/yuruh/boids"} target={"_blank"} rel="noopener noreferrer">
    here
</a>.
    <hr/>
    More information, Road map and Contribution Guidelines can be found in the repository's <a href={"https://github.com/yuruh/boids-service#boids-service"} target={"_blank"} rel="noopener noreferrer">
    README.md
</a>
    <hr/>
    <i className={"fa fa-star"}/>If you enjoy this project, leave a star<i className={"fa fa-star"}/>
</span>}/>

const demo = <TextSection title={<span>
                    <i className={"fa fa-code"}/>
                    The web demo
</span>} size={20} content={<span>
    <OutLink link={"https://github.com/yuruh/dom-boids"}>
        <i className={"fa fa-github"}/>
        Demo Code
    </OutLink>
    <hr/>
    Written in HTML / SCSS / TypeScript.
    <br/>
    With React.JS.
    <br/>
    Draws a canvas on top of the existing webpage, and animates the boids based on the results provided by the simulation.
    <br/>
    Asks the simulation for 5 seconds of results, with 60 frames per second.
    <br/>
    Docker image accessible <a href={"https://hub.docker.com/repository/docker/yuruh/dom-boids-demo"} target={"_blank"} rel="noopener noreferrer">
    here
</a>.
    <hr/>
    More information, Road map and Contribution Guidelines can be found in the repository's <OutLink link={"https://github.com/yuruh/dom-boids#dom-boids"}>
    README.md
</OutLink>
    <hr/>
    <i className={"fa fa-star"}/>If you enjoy this project, leave a star<i className={"fa fa-star"}/>
</span>}/>

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
        <div className={"section"} style={{
            width: "23vw"
        }}>
            <Slider objectKey="numberOfBoids" title={"Number of Boids"} min={1} max={500} step={1}/>
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
            <div id="grid-wrapper">
                <TextSection title={"Purpose"} size={20} content={"Making a complex behaviour emerge from simple rules. Transforming a web page in a suitable environment."}/>
                <TextSection title={"What's going on"} size={20} content={"Stuff"}/>
                {simService}
                {demo}
            </div>
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
