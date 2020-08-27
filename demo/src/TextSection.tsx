import React from "react"

export default function TextSection(props: {title: string | JSX.Element, content: string | JSX.Element, size: number}) {
    const maxSize = 50;
    let size = props.size
    if (size > maxSize) {
        size = maxSize;
    }
    return <div className={"section"} style={{
        //width: size + "vw"
    }}>
        <h3>{props.title}</h3>
        <p>{props.content}</p>
    </div>
}
