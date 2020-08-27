import Parameters from "./Parameters";
import React, {MutableRefObject, useEffect} from "react";
import Simulator from "./Simulator";
import "./SimulatorControls.scss";

/*
    Imperative style, easier to control simulation this way
 */

enum AnimState {
    PLAYING,
    PAUSE,
    STOP,
}

export default function SimulatorControls(props: {
    params: Parameters,
}) {
    const ref: MutableRefObject<Simulator | null> = React.useRef(null);

    const [animState, setAnimState] = React.useState(AnimState.STOP);

    useEffect(() => {
        if (ref.current) {
            ref.current.restartFromCurrentFrame();
        }
    }, [props.params]);

    return <div id={"simulator-controls"} style={{
    }}>
        {animState === AnimState.STOP &&
        <button title={"Play"} onClick={() => {
            if (ref.current)
                ref.current.start();
            setAnimState(AnimState.PLAYING)
        }}><i className="fa fa-play"/></button>}

        {animState === AnimState.PLAYING &&
            <button title={"Pause"} onClick={() => {
                if (ref.current)
                    ref.current.pause();
                setAnimState(AnimState.PAUSE)
            }}><i className="fa fa-pause"/></button>
        }
        {animState === AnimState.PAUSE &&
        <button title={"Resume"} onClick={() => {
            if (ref.current)
                ref.current.resume();
            setAnimState(AnimState.PLAYING)
        }}><i className="fa fa-play"/></button>}
        {animState !== AnimState.STOP &&
        <React.Fragment>
            <button title={"Prev frame"} onClick={() => {
                if (ref.current)
                    ref.current.prevFrame();
            }}><i className="fa fa-step-backward"/></button>
            <button title={"Next frame"} onClick={() => {
                if (ref.current)
                    ref.current.nextFrame();
            }}><i className="fa fa-step-forward"/></button>
        <button title={"Stop"} onClick={() => {
            if (ref.current)
                ref.current.stop();
        }}><i className="fa fa-stop"/></button>
        </React.Fragment>}
        <br/>
        <Simulator ref={ref} params={props.params}/>
    </div>
}
