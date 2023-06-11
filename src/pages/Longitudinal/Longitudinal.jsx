import './Longitudinal.scss';
import React, { useState } from 'react';
import longitudinalNormal from '../../utils/images/longitudinalNormal.png';
import longitudinalBox from '../../utils/images/longitudinalBox.png';
import FileUpload from '../../components/File Upload/FileUpload';
const allDimensions = ["t1", "t2", "t3", "t4", "a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", "b5", "b6", "h1", "h2", "h3", "A", "C", "p"];

const Longitudinal = () => {
    const [getFormData, setFormData] = useState({
        structureType: "2D",
        bridgeType: "normal",
        material: "",
        sizeOfPlateElement: "",
        span: "",
        wingWallCheck: true,
        thickness: "",
        skewAngle: "",
        "t1": "",
        "t2": "",
        "t3": "",
        "t4": "",
        "a1": "",
        "a2": "",
        "a3": "",
        "a4": "",
        "b1": "",
        "b2": "",
        "b3": "",
        "b4": "",
        "b5": "",
        "b6": "",
        "h1": "",
        "h2": "",
        "h3": "",
        "A": "",
        "C": "",
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
                        <input id='material' type='text' value={getFormData.material} name='material' onChange={inputHandler} />
                        <select>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>

                    <div className='plate-element'>
                        <label htmlFor='plate-element' className='label-name'>Size of Plate Element</label>
                        <input id='plate-element' type='text' value={getFormData.sizeOfPlateElement} name='sizeOfPlateElement' onChange={inputHandler} />
                        <span className='unit'>m</span>
                    </div>

                    <div className='span'>
                        <label htmlFor='span' className='label-name'>Span</label>
                        <div className='span-bottom'>
                            <div>
                                <input id='span' type='text' value={getFormData.span} name='span' onChange={inputHandler} />
                                <span className='unit'>m</span>
                            </div>
                            <div className='example'>(ex : 3, 4, 5@5.5)</div>
                        </div>
                    </div>

                    <div className='wing-wall'>
                        <input id='wing-wall-check' type='checkbox' name='wingWallCheck' checked={getFormData.wingWallCheck} onChange={inputHandler} />
                        <label htmlFor='wing-wall-check'>Wing Wall : </label>
                        <label htmlFor='thickness' className='label-name'>Thickness</label>
                        <input id='thickness' type='text' value={getFormData.thickness} name='thickness' disabled={!getFormData.wingWallCheck} onChange={inputHandler} />
                        <span className='unit'>m</span>
                    </div>

                    <div className='skew-angle'>
                        <label htmlFor='skew-angle' className='label-name'>Skew Angle</label>
                        <input id='skew-angle' type='number' value={getFormData.skewAngle} name='skewAngle' onChange={inputHandler} />
                        <span className='unit'>deg</span>
                    </div>
                </section>

                {/* Dimensions */}
                <fieldset className='dimensions'>
                    <legend>Dimensions</legend>
                    {
                        allDimensions.map((dimension, index) => {
                            return <div key={index}>
                                <label htmlFor={`dimension-${dimension}`} className='label-name'>{dimension}</label>
                                <input id={`dimension-${dimension}`} type='text' name={dimension} value={getFormData[dimension]} onChange={inputHandler} />
                                <span className='unit'>{dimension === "A" ? "[deg]" : "m"}</span>
                            </div>
                        })
                    }
                </fieldset>

            </form>
            <FileUpload getFormData={getFormData} setFormData={setFormData} />
        </div>
    )
}

export default Longitudinal;