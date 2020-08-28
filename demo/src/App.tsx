import React, {ChangeEvent, Fragment} from 'react';
import './App.scss';
import Text from "./text";
import Parameters from "./simulation/Parameters";
import SimulatorControls from "./simulation/SimulatorControls";
import TextSection from "./TextSection";
import {IParameters} from "./simulation/ProtoInterfaces";

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
    More information and features road map can be found in the repository's <a href={"https://github.com/yuruh/boids-service#boids-service"} target={"_blank"} rel="noopener noreferrer">
    README.md
</a>
    <hr/>
    <i className={"fa fa-star"}/>{Text.star}<i className={"fa fa-star"}/>
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
    More information and features road map can be found in the repository's <OutLink link={"https://github.com/yuruh/dom-boids#dom-boids"}>
    README.md
</OutLink>
    <hr/>
    <i className={"fa fa-star"}/>{Text.star}<i className={"fa fa-star"}/>
</span>}/>


function Slider(props: {
    title: string,
    min: number,
    max: number,
    step: number,
    value: number,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onValueChosen: () => void;
}) {
    return <span>
        {props.title}
        <input type={"range"} value={props.value} style={{marginLeft: "10px", marginRight: 10}}
               onChange={props.onInputChange}
               min={props.min} max={props.max} step={props.step}
               onMouseUp={props.onValueChosen}
               //onChange={(e) => onInputChange(e, props.objectKey)}
            //                   onMouseUp={(e) => configProps.onParamsChange(config)}
        />
        {props.value}
        </span>
}

function Configuration(props: {onParamsChange:(params: Parameters) => void}) {
    const [config, setConfig] = React.useState<IParameters>(new Parameters());

    function onInputChange(event: ChangeEvent<HTMLInputElement>, key: keyof Parameters) {
        const updated: Parameters = {
            ...config,
            [key]: Number(event.target.value),
        }
        setConfig(updated);
    }

    return <div className={"align-center"}>
        <div className={"section"} id={"config-section"}>
            <Slider value={config.numberOfBoids}
                    onInputChange={(e) => onInputChange(e ,"numberOfBoids")}
                    onValueChosen={() => props.onParamsChange(config)}
                    title={"Number of Boids"} min={1} max={2000} step={1}/>
            <hr/>
            <Slider title={"Vision Distance"} min={0} max={500} step={1}
                    value={config.visionDistance}
                    onInputChange={(e) => onInputChange(e ,"visionDistance")}
                    onValueChosen={() => props.onParamsChange(config)}
            />
            <br/>
            <Slider title={"Obstacle Distance"} min={0} max={500} step={1}
                    onValueChosen={() => props.onParamsChange(config)}
                    onInputChange={(e) => onInputChange(e ,"obstacleDistance")}
                    value={config.obstacleDistance}
            />
            <br/>
            <Slider title={"Separation Distance"} min={0} max={500} step={1}
                    onInputChange={(e) => onInputChange(e ,"separationDistance")}
                    onValueChosen={() => props.onParamsChange(config)}
                    value={config.separationDistance}
            />
            <br/>
            <Slider title={"Max Local Flockmates"} min={0} max={100} step={1}
                    onInputChange={(e) => onInputChange(e ,"maxLocalFlockmates")}
                    onValueChosen={() => props.onParamsChange(config)}
                    value={config.maxLocalFlockmates}
            />
            <hr/>

            <Slider title={"Alignment"} min={0} max={2} step={0.01}
                    onInputChange={(e) => onInputChange(e ,"alignmentScale")}
                    onValueChosen={() => props.onParamsChange(config)}
                    value={config.alignmentScale}
            />
            <br/>
            <Slider title={"Cohesion"} min={0} max={2} step={0.01}
                    onValueChosen={() => props.onParamsChange(config)}
                    onInputChange={(e) => onInputChange(e ,"cohesionScale")}
                    value={config.cohesionScale}
            />
            <br/>
            <Slider title={"Separation"} min={0} max={2} step={0.01}
                    onValueChosen={() => props.onParamsChange(config)}
                    onInputChange={(e) => onInputChange(e ,"separationScale")}
                    value={config.separationScale}
            />
            <br/>
            <Slider title={"Evasion"} min={0} max={2} step={0.01}
                    onValueChosen={() => props.onParamsChange(config)}
                    onInputChange={(e) => onInputChange(e ,"avoidanceScale")}
                    value={config.avoidanceScale}
            />
        </div>
    </div>
}

function ParamDescription(props: {title: string, content: string}) {
    return <li><strong>{props.title}</strong>: {props.content}</li>
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
            <h2>{Text.tagline}</h2>
            <h6>{Text.by} <a href={"https://github.com/yuruh"} target={"_blank"} rel="noopener noreferrer">Antoine Lempereur</a></h6>
            <p>{Text.basicExplanation}</p>
            <p>{Text.trickyQuestion}</p>
            <hr/>
            <h3>{Text.configTitle}</h3>
            <Configuration onParamsChange={(params: Parameters) =>
                setParams(params)
            }/>
            <hr/>
            <h3>{Text.aboutTitle}</h3>
            {/*Leave some space for boids to pass through*/}
            {// Q&D responsive, see Simulator fixme
                document.body.offsetWidth > 1230 && <React.Fragment>
                <br/>
            <br/>
            <br/>
            <br/>
                <br/></React.Fragment>}
            <div id="grid-wrapper">
                <div id="purpose" className={"align-center"}>
                    <TextSection title={"Goals"} size={20} content={<span>
                        Making a complex behaviour emerge from simple rules.
                        <hr/>
                        Transforming a web page in a suitable environment.
                        <hr/>
                        Building an efficient web-service easily accessible.
                        <hr/>
                        Providing clear visual indications to explain behaviour.
                        <br/>
                        <small>Coming soon</small>
                        <hr/>
                        Easily integrate to any website.
                        <br/>
                        <small>Down the road</small>
                    </span>}/>
                </div>
                <div id={"explanation"} className={"align-center"}>
                    <TextSection title={"What's going on ?"} size={20} content={<span>
                        Here's the explanation on how boids decide what to do, and the simulation parameters.
                        <br/>
                        Parameters are shown in <strong>bold</strong>.
                        <br/>
                        All distances are in pixels
                        <hr/>
                        Boids make decisions by observing what their local flock mates are doing and their environment.
                        <br/>
                        <ul>
                            <ParamDescription title={"Vision Distance"} content={"How close boids have to be detect each other"}/>
                            <ParamDescription title={"Separation Distance"} content={"How close boids have to be before they decide to try to avoid each other"}/>
                            <ParamDescription title={"Obstacle Distance"} content={"How close boids have to be to an obstacle to start steering away from it"}/>
                            <ParamDescription title={"Max local flockmates"} content={"The max number of mates used to make a decision"}/>
                        </ul>
                        <hr/>
                        To decide where they should head to, they respect 4 rules:
                        <ul>
                            <ParamDescription title={"Cohesion"} content={"Boids should try to steer to move toward the average position of local flockmates"}/>
                            <ParamDescription title={"Alignment"} content={"Boids should try to steer towards the average heading of local flockmates"}/>
                            <ParamDescription title={"Separation"} content={"Boids should try to steer to avoid crowding local flockmates"}/>
                            <ParamDescription title={"Evasion"} content={"Boids should try to steer away from obstacles"}/>
                        </ul>
                    </span>}/>
                </div>
                <div id={"simulation-about"} className={"align-center"}>
                    {simService}
                </div>
                <div id={"demo-about"} className={"align-center"}>
                    {demo}
                </div>
                <div id={"author"} className={"align-center"}>
                    <TextSection title={"Author"} size={20} content={<span>
                        <p>Hello ! I'm Antoine, french full stack engineer from Lille. Hit me up on socials !</p>
                        <OutLink link={"https://github.com/yuruh"}>
                            <i className={"fa fa-github"}/>
                        </OutLink>
                        <OutLink link={"https://www.linkedin.com/in/antoine-lempereur/"}>
                            <i className={"fa fa-linkedin"}/>
                        </OutLink>
                        <OutLink link={"https://www.instagram.com/antoine.yuruh"}>
                            <i className={"fa fa-instagram"}/>
                        </OutLink>
                    </span>}/>
                </div>

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
