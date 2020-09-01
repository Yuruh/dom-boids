import TextSection from "../TextSection";
import Text from "../text";
import React from "react";

export function OutLink(props: React.PropsWithChildren<{
    link: string
}>) {
    return <a target={"_blank"} rel="noopener noreferrer" href={props.link}>
        {props.children}
    </a>
}
function ParamDescription(props: {title: string, content: string}) {
    return <li><strong>{props.title}</strong>: {props.content}</li>
}

export const purpose = <TextSection title={"Goals"} size={20} content={<span>
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

export const explanation = <TextSection title={"What's going on ?"} size={20} content={<span>
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

export const simService = <TextSection title={<span>
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

export const demo = <TextSection title={<span>
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

export const author = <TextSection title={"Author"} size={20} content={<span>
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
