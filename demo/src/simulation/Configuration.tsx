import Parameters from "./Parameters";
import React, {ChangeEvent} from "react";

/*On pourrait avoir un boutton qui propose d'arrêter les collisions avec les div aussi.
<label>
Obstacles Force / Quadtree / Rules on boid forces
<input type={"checkbox"}/>
</label>*/


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
               onTouchEnd={props.onValueChosen}
            //onChange={(e) => onInputChange(e, props.objectKey)}
            //                   onMouseUp={(e) => configProps.onParamsChange(config)}
        />
        {props.value}
        </span>
}

export default function Configuration(props: {onParamsChange:(params: Parameters) => void}) {
    const [config, setConfig] = React.useState<Parameters>(new Parameters());

    function onInputChange(event: ChangeEvent<HTMLInputElement>, key: keyof Parameters) {
        const updated: Parameters = {
            ...config,
            [key]: Number(event.target.value),
        }
        setConfig(updated);
    }

    // To set distance based on window width, we set values when function did mount
    React.useEffect(() => {
        const updated: Parameters = {
            ...config,
            obstacleDistance: Math.floor(document.body.offsetWidth / 15),
            visionDistance: Math.floor(document.body.offsetWidth / 20),
            separationDistance: Math.floor(document.body.offsetWidth / 25),
        }
        setConfig(updated)
    }, []); // No deps as we only want to run this on mount, not on update

    return <div className={"align-center"}>
        <div className={"section"} id={"config-section"}>
            <Slider value={config.numberOfBoids}
                    onInputChange={(e) => onInputChange(e ,"numberOfBoids")}
                    onValueChosen={() => props.onParamsChange(config)}
                    title={"Number of Boids"} min={1} max={2000} step={1}/>
            {/*<br/>
            <Slider value={config.FPS}
                    onInputChange={(e) => onInputChange(e ,"FPS")}
                    onValueChosen={() => props.onParamsChange(config)}
                    title={"FPS"} min={10} max={60} step={1}/>*/}
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
