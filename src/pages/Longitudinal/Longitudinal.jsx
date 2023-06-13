import './Longitudinal.scss';
import React, { useState } from 'react';
import longitudinalNormal from '../../utils/images/longitudinalNormal.png';
import longitudinalBox from '../../utils/images/longitudinalBox.png';
import FileUpload from '../../components/File Upload/FileUpload';
const allDimensions = ["t1", "t2", "t3", "t4", "a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", "b5", "b6", "h1", "h2", "h3", "A", "C", "p"];
const disabledDimensions1 = ["t2", "t4", "a2", "a3", "a4", "b2", "b5", "b6", "A", "C"];
const disabledDimensions2 = ["t2", "a2", "a4", "b2", "b3", "b6", "A", "C"];

const Longitudinal = () => {
    const [getFormData, setFormData] = useState({ // state of all data
        lengthUnit: "m",
        structureType: "2D",
        bridgeType: "normal",
        material: "",
        sizeOfPlateElement: "",
        span: "",
        wingWallCheck: true,
        thickness: "",
        skewAngle: "",
        "t1": "",
        "t2": "0.48768",
        "t3": "",
        "t4": "",
        "a1": "",
        "a2": "",
        "a3": "",
        "a4": "0.54864",
        "b1": "",
        "b2": "",
        "b3": "",
        "b4": "",
        "b5": "",
        "b6": "",
        "h1": "",
        "h2": "",
        "h3": "",
        "A": 60,
        "C": 0.4572,
        "p": ""
    });

    const inputHandler = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        if (key === "wingWallCheck") {
            value = !getFormData.wingWallCheck;
            setFormData({
                ...getFormData,
                [key]: value,
                thickness: ""
            })
            return;
        }

        setFormData({
            ...getFormData,
            [key]: value
        })
    }

    const lengthUnitHandler = (e) => {
        let unit = 0.1;
        if (e.target.value === "cm") unit = 10;
        setFormData({
            ...getFormData,
            lengthUnit: e.target.value,
            sizeOfPlateElement: parseFloat((Number(getFormData.sizeOfPlateElement) * unit).toFixed(5)),
            span: parseFloat((Number(getFormData.span) * unit).toFixed(5)),
            thickness: parseFloat((Number(getFormData.thickness) * unit).toFixed(5)),
            "t1": parseFloat((Number(getFormData.t1) * unit).toFixed(5)),
            "t2": parseFloat((Number(getFormData.t2) * unit).toFixed(5)),
            "t3": parseFloat((Number(getFormData.t3) * unit).toFixed(5)),
            "t4": parseFloat((Number(getFormData.t4) * unit).toFixed(5)),
            "a1": parseFloat((Number(getFormData.a1) * unit).toFixed(5)),
            "a2": parseFloat((Number(getFormData.a2) * unit).toFixed(5)),
            "a3": parseFloat((Number(getFormData.a3) * unit).toFixed(5)),
            "a4": parseFloat((Number(getFormData.a4) * unit).toFixed(5)),
            "b1": parseFloat((Number(getFormData.b1) * unit).toFixed(5)),
            "b2": parseFloat((Number(getFormData.b2) * unit).toFixed(5)),
            "b3": parseFloat((Number(getFormData.b3) * unit).toFixed(5)),
            "b4": parseFloat((Number(getFormData.b4) * unit).toFixed(5)),
            "b5": parseFloat((Number(getFormData.b5) * unit).toFixed(5)),
            "b6": parseFloat((Number(getFormData.b6) * unit).toFixed(5)),
            "h1": parseFloat((Number(getFormData.h1) * unit).toFixed(5)),
            "h2": parseFloat((Number(getFormData.h2) * unit).toFixed(5)),
            "h3": parseFloat((Number(getFormData.h3) * unit).toFixed(5)),
            "C": parseFloat((Number(getFormData.C) * unit).toFixed(5)),
            "p": parseFloat((Number(getFormData.p) * unit).toFixed(5)),
        })
    }

    return (
        <div className='longitudinal-container'>
            <img className='main-image' src={getFormData.bridgeType === "normal" ? longitudinalNormal : longitudinalBox} alt='longitudinal' />

            <form className='longitudinal-form'>
                {/* Structure Type */}
                <section className='structure-type'>
                    <span className='label-name'>Structure Type</span>
                    <label htmlFor='2d'>
                        <input id='2d' type='radio' name='structureType' onChange={inputHandler} value={"2D"} checked={getFormData.structureType === "2D"} />
                        2-Dimensional
                    </label>
                    <label htmlFor='3d'>
                        <input id='3d' type='radio' name='structureType' onChange={inputHandler} value={"3D"} checked={getFormData.structureType === "3D"} />
                        3-Dimensional
                    </label>
                </section>

                {/* Type of Bridge */}
                <fieldset className='bridge-type'>
                    <legend>Type of Bridge</legend>
                    <label htmlFor='normalType' className='normal-type'>
                        <input id='normalType' type='radio' name='bridgeType' onChange={inputHandler} value={"normal"} checked={getFormData.bridgeType === "normal"} />
                        Normal Type Frame
                    </label>
                    <label htmlFor='boxType' className='box-type'>
                        <input id='boxType' type='radio' name='bridgeType' onChange={inputHandler} value={"box"} checked={getFormData.bridgeType === "box"} />
                        Box Culvert
                    </label>
                </fieldset>

                {/* Middle section */}
                <section className='middle-section'>
                    <div className='material'>
                        <label htmlFor='material' className='label-name'>Material</label>
                        {/* <input id='material' type='number' value={getFormData.material} name='material' onChange={inputHandler} /> */}
                        <select id='material' value={getFormData.material} name='material' onChange={inputHandler}>
                            <option value={""}></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                    </div>

                    <div className='plate-element'>
                        <label htmlFor='plate-element' className='label-name'>Size of Plate Element</label>
                        <input id='plate-element' type='number' value={getFormData.sizeOfPlateElement} name='sizeOfPlateElement' onChange={inputHandler} />
                        <span className='unit'>{getFormData.lengthUnit}</span>
                    </div>

                    <div className='span'>
                        <label htmlFor='span' className='label-name'>Span</label>
                        <div className='span-bottom'>
                            <div>
                                <input id='span' type='number' value={getFormData.span} name='span' onChange={inputHandler} />
                                <span className='unit'>{getFormData.lengthUnit}</span>
                            </div>
                            <div className='example'>(ex : 3, 4, 5@5.5)</div>
                        </div>
                    </div>

                    <div className='wing-wall'>
                        <input id='wing-wall-check' type='checkbox' name='wingWallCheck' checked={getFormData.wingWallCheck} onChange={inputHandler} />
                        <label htmlFor='wing-wall-check'>Wing Wall : </label>
                        <label htmlFor='thickness' className='label-name'>Thickness</label>
                        <input id='thickness' type='number' value={getFormData.thickness} name='thickness' disabled={!getFormData.wingWallCheck} onChange={inputHandler} />
                        <span className='unit'>{getFormData.lengthUnit}</span>
                    </div>

                    <div className='skew-angle'>
                        <label htmlFor='skew-angle' className='label-name'>Skew Angle</label>
                        <input id='skew-angle' type='number' value={getFormData.skewAngle} name='skewAngle' onChange={inputHandler} />
                        <span className='unit'>deg</span>
                    </div>
                </section>

                {/* length unit */}
                <div className='length-unit'>
                    <label htmlFor='lengthUnit' className='label-name'>Length-Unit</label>
                    <select id='lengthUnit' value={getFormData.lengthUnit} onChange={lengthUnitHandler}>
                        <option value={"m"}>M,mm,in</option>
                        <option value={"cm"}>C,cm,in</option>
                    </select>
                </div>

                {/* Dimensions */}
                <fieldset className='dimensions'>
                    <legend>Dimensions</legend>
                    {
                        allDimensions.map((dimension, index) => {
                            let sameDimensionValue = dimension === "a2" ? "a1" : dimension === "b2" ? "b1" : dimension === "b6" ? "b5" : dimension;
                            return <div key={index}>
                                <label htmlFor={`dimension-${dimension}`} className='label-name'>{dimension}</label>
                                <input id={`dimension-${dimension}`}
                                    type='number'
                                    name={sameDimensionValue}
                                    value={getFormData[sameDimensionValue]}
                                    onChange={inputHandler}
                                    disabled={getFormData.bridgeType === "normal" ? disabledDimensions1.includes(dimension) : disabledDimensions2.includes(dimension)}
                                />
                                <span className='unit'>{dimension === "A" ? "[deg]" : getFormData.lengthUnit}</span>
                            </div>
                        })
                    }
                </fieldset>

            </form>

            <hr />
            {/* import - download */}
            <FileUpload getFormData={getFormData} setFormData={setFormData} fileName={"longitudinal"} />
        </div>
    )
}

export default Longitudinal;