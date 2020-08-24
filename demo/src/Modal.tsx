import React from "react"
import "./Modal.scss"

export function Modal(props: React.PropsWithChildren<{
}>) {
    return <div className={"modal-background"}>
        <div className={"modal-content"}>
            {props.children}
        </div>
    </div>
}
