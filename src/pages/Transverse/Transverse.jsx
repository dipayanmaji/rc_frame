import './Transverse.scss';
import React, { useState } from 'react';
import transverse1 from '../../utils/images/transverse1.png';
import transverse2 from '../../utils/images/transverse2.png';
import type1 from '../../utils/images/type1.png';
import type2 from '../../utils/images/type2.png';
import FileUpload from '../../components/File Upload/FileUpload';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
const sectionBElement = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "D", "n"];
const disabledElement = ["b1", "b2", "D", "n"];
const modulusOfSubgrade = ["lower", "lateral", "upper"];

const Transverse = () => {
    const [getFormData, setFormData] = useState({ // state of all data
        lengthUnit: "m",
        type: "type1",
        sizeOfPlateElement: "",
        "b1": "",
        "b2": "1.88976",
        "b3": "",
        "b4": "",
        "b5": "",
        "b6": "",
        "b7": "",
        "D": "6.096",
        "n": "3",
        transverseFixedSupport: "fromLeftSide",
        springType: "general",
        lower: "",
        lateral: "",
        upper: "",
        lengthOfElasticLink: "",

    });
    const [displayDropDown, setDisplayDropDown] = useState(false);

    const inputHandler = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if (key === "sizeOfPlateElement") {
            setFormData({
                ...getFormData,
                [key]: value,
                b4: value * 2,
                b6: value * 2,
            })

            return;
        }

        if (key === "b3") {
            setFormData({
                ...getFormData,
                [key]: value,
                b7: value
            })

            return;
        }

        if (key === "lower") {
            setFormData({
                ...getFormData,
                [key]: value,
                lateral: value,
                upper: value
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
            "b1": parseFloat((Number(getFormData.b1) * unit).toFixed(5)),
            "b2": parseFloat((Number(getFormData.b2) * unit).toFixed(5)),
            "b3": parseFloat((Number(getFormData.b3) * unit).toFixed(5)),
            "b4": parseFloat((Number(getFormData.b4) * unit).toFixed(5)),
            "b5": parseFloat((Number(getFormData.b5) * unit).toFixed(5)),
            "b6": parseFloat((Number(getFormData.b6) * unit).toFixed(5)),
            "b7": parseFloat((Number(getFormData.b7) * unit).toFixed(5)),
            "D": parseFloat((Number(getFormData.D) * unit).toFixed(5)),
            lower: parseFloat((Number(getFormData.lower) / (unit * unit * unit)).toFixed(5)),
            lateral: parseFloat((Number(getFormData.lateral) / (unit * unit * unit)).toFixed(5)),
            upper: parseFloat((Number(getFormData.upper) / (unit * unit * unit)).toFixed(5)),
            lengthOfElasticLink: parseFloat((Number(getFormData.lengthOfElasticLink) * unit).toFixed(5)),
        })
    }

    return (
        <div className='transverse-container'>
            <img className='main-image' src={getFormData.type === "type1" ? transverse1 : transverse2} alt='longitudinal' />

            <form className='transverse-form'>
                {/* type - size of plate element */}
                <section className='section-a'>
                    <div className='type-container'>
                        <span className='label-name'>Type</span>
                        <div className='options' onClick={() => setDisplayDropDown(!displayDropDown)}>
                            {getFormData.type === "type1" ? <img src={type1} alt='type1' /> : <img src={type2} alt='type2' />}
                            <MdOutlineKeyboardArrowDown />

                            <div className='drop-down' style={{ display: displayDropDown && "block" }}>
                                <img src={type1} alt='type1' onClick={() => setFormData({ ...getFormData, "type": "type1" })} />
                                <img src={type2} alt='type2' onClick={() => setFormData({ ...getFormData, "type": "type2" })} />
                            </div>
                        </div>
                    </div>

                    <div className='plate-element'>
                        <label htmlFor='plateElement' className='label-name'>Size of Plate Element</label>
                        <input id='plateElement' type='number' name='sizeOfPlateElement' value={getFormData.sizeOfPlateElement} onChange={inputHandler} />
                        <span className='unit'>{getFormData.lengthUnit}</span>
                    </div>
                </section>

                {/* section-b */}
                <fieldset className='section-b'>
                    {
                        sectionBElement.map((element, index) => {
                            let sameElementValue = element === "b1" ? "sizeOfPlateElement" : element;
                            return <div key={index}>
                                <label htmlFor={element} className='label-name'>{element}</label>
                                <input id={element}
                                    type='number'
                                    name={sameElementValue}
                                    value={getFormData[sameElementValue]}
                                    onChange={inputHandler}
                                    disabled={disabledElement.includes(element) || (element === "b6" && getFormData.type === "type2")}
                                />
                                <span className='unit'>{element === "n" ? "" : getFormData.lengthUnit}</span>
                            </div>
                        })
                    }
                </fieldset>

                {/* Supports of Pi Frame */}
                <fieldset className='section-c'>
                    <legend>Supports of Pi Frame</legend>
                    <label htmlFor='support' className='label-name'>Transverse Fixed Support</label>
                    <select id='support' name='transverseFixedSupport' onChange={inputHandler} value={getFormData.transverseFixedSupport}>
                        <option value={"fromLeftSide"}>from left side</option>
                        <option value={"fromRightSide"}>from right side</option>
                    </select>
                </fieldset>

                {/* Supports of Culvert */}
                <fieldset className='section-d'>
                    <legend>Supports of Culvert</legend>

                    {/* Spring Type */}
                    <div className='spring-type'>
                        <span className='label-name'>Spring Type</span>
                        <section className='right-section'>
                            <div>
                                <label htmlFor='general'>
                                    <input type='radio' id='general' name='springType' onChange={inputHandler} value={"general"} checked={getFormData.springType === "general"} />
                                    General
                                </label>

                                <label htmlFor='compressionOnly'>
                                    <input type='radio' id='compressionOnly' name='springType' onChange={inputHandler} value={"compressionOnly"} checked={getFormData.springType === "compressionOnly"} />
                                    Compression Only
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Modulus of Subgrade Reaction */}
                    <div className='subgrade-reaction'>
                        <span className='label-name'>Modulus of Subgrade Reaction</span>

                        <section className='right-section'>
                            {
                                modulusOfSubgrade.map((element) => {
                                    return <div className='right-section-div' key={element}>
                                        <label htmlFor={element}>{element}:</label>
                                        <input type='number'
                                            id={element}
                                            name={element}
                                            onChange={inputHandler}
                                            value={getFormData[element]}
                                            disabled={
                                                (getFormData.springType === "general" && (element === "lateral" || element === "upper")) ||
                                                (getFormData.springType === "compressionOnly" && element === "lower")
                                            }
                                        />
                                        <span className='unit'>kN/{getFormData.lengthUnit}<sup>3</sup></span>
                                    </div>
                                })
                            }
                        </section>
                    </div>

                    {/* Length of Elastic Link */}
                    <div className='elastic-link'>
                        <label htmlFor='elasticLink' className='label-name'>Length of Elastic Link</label>
                        <section className='right-section'>
                            <div>
                                <input type='number' id='elasticLink' name='lengthOfElasticLink' onChange={inputHandler} value={getFormData.lengthOfElasticLink} />
                                <span className='unit'>{getFormData.lengthUnit}</span>
                            </div>
                        </section>
                    </div>
                </fieldset>

                {/* length unit */}
                <div className='length-unit'>
                    <label htmlFor='lengthUnit' className='label-name'>Length-Unit</label>
                    <select id='lengthUnit' value={getFormData.lengthUnit} onChange={lengthUnitHandler}>
                        <option value={"m"}>M,mm,in</option>
                        <option value={"cm"}>C,cm,in</option>
                    </select>
                </div>

            </form>

            <hr />
            {/* import - download */}
            <FileUpload getFormData={getFormData} setFormData={setFormData} fileName={"transverse"} />
        </div>
    )
}

export default Transverse;