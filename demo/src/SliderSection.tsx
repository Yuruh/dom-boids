import React, {ChangeEvent} from "react"

export function SliderSection (props: {
    title: string
    explanation: string
    value: number
    onSliderValueChange: () => void
}) {
    const [value, setValue] = React.useState(1);

    function onInputChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(Number(event.target.value));
    }

    return <div className={"section"}>
        <p>{props.title}</p>
        <label htmlFor="section-range-input">
            0
            <input id="section-range-input" type={"range"} value={value} onChange={onInputChange} min={0} max={2} step={0.01}/>
        </label>
        <label htmlFor="section-range-input">2</label>
        <p>{props.explanation}</p>
    </div>
}
