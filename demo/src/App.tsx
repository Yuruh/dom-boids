import React from 'react';
import './App.scss';
import Text from "./text";
import Parameters from "./simulation/Parameters";
import SimulatorControls from "./simulation/SimulatorControls";
import {author, demo, explanation, purpose, simService} from "./content/ExplanationContent";
import Configuration from "./simulation/Configuration";


function AboutTitle() {
    const refOnTitle = React.useRef(null);

    function scrollToTop() {
        if (refOnTitle && refOnTitle.current) {
            window.scrollTo({
                left: 0,
                // Ts doesn't get that its null
                // @ts-ignore
                top: refOnTitle.current.offsetTop - 50,
                behavior: "smooth"
            });
        }
    }

    return <div id={"about-button"} onClick={scrollToTop}>
        <i className={"fa fa-chevron-down"}/>
        <h3 ref={refOnTitle}>{Text.aboutTitle}</h3>
        <i className={"fa fa-chevron-down"}/>
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
           <AboutTitle/>
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
                    {purpose}
                </div>
                <div id={"explanation"} className={"align-center"}>
                    {explanation}
                </div>
                <div id={"simulation-about"} className={"align-center"}>
                    {simService}
                </div>
                <div id={"demo-about"} className={"align-center"}>
                    {demo}
                </div>
                <div id={"author"} className={"align-center"}>
                    {author}
                </div>

            </div>
        </div>
    );
}

export default App;
