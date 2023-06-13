import './Loads.scss';
import React, { useState } from 'react';
import FileUpload from '../../components/File Upload/FileUpload';
import { sectionBElement } from '../../utils/loadsElement/loadsElement';
import GenerateLabel from '../../components/GenerateLabel/GenerateLabel';

const Loads = () => {
    const [getFormData, setFormData] = useState({
        lengthUnit: "m",
        forceUnit: "kN",
        factored: false,
        unfactored: false,
        selfWeight: false,
        pavement: false,
        pavementWeightDensity: "",
        pavementThickness: 0.09144,
        soil: false,
        soilWeightDensity: "",
        phi: "",
        surcharge: "",
        submergedWeightDensity: "",
        loadSlope: "",
        loadSlopeL: 1.5,
        loadSlopeR: 1.5,
        undergroundWater: false,
        gl: "",
        barrier: false,
        barrierSelfWeight: "",
        additionalLoad: "",
        medianStrip: false,
        medianStripValue: "",
        sideWalk: false,
        sideWalkWeightDensity: "",
        sideWalkThickness: "",
        crowdLoad: "",
        liveLoad: false,
        classOfLoading: "H15-44",
        eccentricity: "left",
        settlement: false,
        settlementValue: "",
        systemTemperature: false,
        systemTemperatureValue: "",
        temperatureGradient: false,
        deltaT: "",
        shrinkageStrain: false,
        shrinkageStrainValue: "",
        thermalCoefficient: "",

    })

    const inputHandler = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({
            ...getFormData,
            [key]: value
        })
    }

    const checkboxHandler = (e) => {
        const key = e.target.name;
        setFormData({
            ...getFormData,
            [key]: !getFormData[key]
        })
    }

    const forceUnitHandler = (e) => {
        let unit = 101.9716212978; // 1kN = 101.9716212978kgf
        if (e.target.value === "kN") {
            unit = 1 / unit;
        };
        setFormData({
            ...getFormData,
            forceUnit: e.target.value,
            pavementWeightDensity: parseFloat((Number(getFormData.pavementWeightDensity) * unit).toFixed(5)),
            soilWeightDensity: parseFloat((Number(getFormData.soilWeightDensity) * unit).toFixed(5)),
            surcharge: parseFloat((Number(getFormData.surcharge) * unit).toFixed(5)),
            submergedWeightDensity: parseFloat((Number(getFormData.submergedWeightDensity) * unit).toFixed(5)),
            barrierSelfWeight: parseFloat((Number(getFormData.barrierSelfWeight) * unit).toFixed(5)),
            additionalLoad: parseFloat((Number(getFormData.additionalLoad) * unit).toFixed(5)),
            medianStripValue: parseFloat((Number(getFormData.medianStripValue) * unit).toFixed(5)),
            sideWalkWeightDensity: parseFloat((Number(getFormData.sideWalkWeightDensity) * unit).toFixed(5)),
            crowdLoad: parseFloat((Number(getFormData.crowdLoad) * unit).toFixed(5)),
        })
    }

    const lengthUnitHandler = (e) => {
        let unit = 0.1;
        if (e.target.value === "cm") unit = 10;
        setFormData({
            ...getFormData,
            lengthUnit: e.target.value,
            pavementWeightDensity: parseFloat((Number(getFormData.pavementWeightDensity) / (unit * unit * unit)).toFixed(5)),
            pavementThickness: parseFloat((Number(getFormData.pavementThickness) / unit).toFixed(5)),
            soilWeightDensity: parseFloat((Number(getFormData.soilWeightDensity) / (unit * unit * unit)).toFixed(5)),
            surcharge: parseFloat((Number(getFormData.surcharge) / (unit * unit)).toFixed(5)),
            submergedWeightDensity: parseFloat((Number(getFormData.submergedWeightDensity) / (unit * unit * unit)).toFixed(5)),
            gl: parseFloat((Number(getFormData.gl) / unit).toFixed(5)),
            barrierSelfWeight: parseFloat((Number(getFormData.barrierSelfWeight) / unit).toFixed(5)),
            additionalLoad: parseFloat((Number(getFormData.additionalLoad) / unit).toFixed(5)),
            medianStripValue: parseFloat((Number(getFormData.medianStripValue) / unit).toFixed(5)),
            sideWalkWeightDensity: parseFloat((Number(getFormData.sideWalkWeightDensity) / (unit * unit * unit)).toFixed(5)),
            sideWalkThickness: parseFloat((Number(getFormData.sideWalkThickness) / unit).toFixed(5)),
            crowdLoad: parseFloat((Number(getFormData.crowdLoad) / (unit * unit)).toFixed(5)),
            settlementValue: parseFloat((Number(getFormData.settlementValue) / unit).toFixed(5)),
        })
    }


    return (
        <div className='loads-container'>
            <form className='loads-form'>
                {/* section-a */}
                <fieldset className='section-a'>
                    <label htmlFor='loadCombinations'>Load Combinations:</label>
                    <div className='right-section'>
                        <div className='top'>
                            <select id='loadCombinations'>
                                <option value={"AASHTO-Std2K"}>AASHTO-Std2K</option>
                            </select>
                            <label htmlFor='factored'>
                                <input id='factored' type='checkbox' name='factored' onChange={checkboxHandler} checked={getFormData.factored} />
                                Factored
                            </label>
                            <label htmlFor='unfactored'>
                                <input id='unfactored' type='checkbox' name='unfactored' onChange={checkboxHandler} checked={getFormData.unfactored} />
                                Unfactored
                            </label>
                        </div>
                        <span className='loadCode'>Define Moving Load Code</span>
                    </div>
                </fieldset>

                {/* section-b */}
                <fieldset className='section-b'>
                    {
                        sectionBElement.map((element) => {
                            return (
                                <div key={element.name} className='section-div'>
                                    <label className='checkbox-label' htmlFor={element.name}>
                                        <input type='checkbox' id={element.name} name={element.name} onChange={checkboxHandler} checked={getFormData[element.name]} />
                                        {element.displayName} :
                                    </label>

                                    <div className='right-section'>
                                        {
                                            element.labels?.map((label) => {
                                                return <GenerateLabel key={label.name} label={label} element={element.name} getFormData={getFormData} inputHandler={inputHandler} />
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </fieldset>

                {/* section-c */}
                <fieldset className='section-c'>
                    <div className='section-div'>
                        <label className='checkbox-label' htmlFor={"liveLoad"}>
                            <input type='checkbox' id={"liveLoad"} name={"liveLoad"} onChange={checkboxHandler} checked={getFormData.liveLoad} />
                            Live Load :
                        </label>
                        <div className='right-section'>
                            <div className='generate-label'>
                                <label htmlFor="classOfLoading" className='label-name'>Class of Loading</label>
                                <select id="classOfLoading" name="classOfLoading" onChange={inputHandler} value={getFormData.classOfLoading} disabled={!getFormData.liveLoad}>
                                    <option value={"H15-44"}>H15-44</option>
                                </select>
                            </div>
                            <div className='generate-label'>
                                <span className='label-name'>Eccentricity</span>
                                <div className='radio-buttons'>
                                    <label htmlFor='left'>
                                        <input type='radio' id="left" name="eccentricity" onChange={inputHandler} value={"left"} checked={getFormData.eccentricity === "left"} disabled={!getFormData.liveLoad} />
                                        left
                                    </label>
                                    <label htmlFor='right'>
                                        <input type='radio' id="right" name="eccentricity" onChange={inputHandler} value={"right"} checked={getFormData.eccentricity === "right"} disabled={!getFormData.liveLoad} />
                                        right
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* section-d */}
                <fieldset className='section-d'>
                    <div className='section-div'>
                        <label className='checkbox-label' htmlFor={"settlement"}>
                            <input type='checkbox' id={"settlement"} name={"settlement"} onChange={checkboxHandler} checked={getFormData.settlement} />
                            Settlement :
                        </label>
                        <div className='right-section'>
                            <div className='generate-label'>
                                <input type='number' name='settlementValue' value={getFormData.settlementValue} onChange={inputHandler} disabled={!getFormData.settlement} />
                                <span className='unit'>{getFormData.lengthUnit}</span>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* section-e */}
                <fieldset className='section-e'>
                    <div className='section-div'>
                        <label className='checkbox-label' htmlFor={"systemTemperature"}>
                            <input type='checkbox' id={"systemTemperature"} name={"systemTemperature"} onChange={checkboxHandler} checked={getFormData.systemTemperature} />
                            System Temperature :
                        </label>
                        <div className='right-section'>
                            <div className='generate-label'>
                                <label htmlFor='systemTemperatureValue' className='label-name'>T [+/-]</label>
                                <input id='systemTemperatureValue' type='number' name='systemTemperatureValue' value={getFormData.systemTemperatureValue} onChange={inputHandler} disabled={!getFormData.systemTemperature} />
                                <span className='unit'>[T]</span>
                            </div>
                        </div>
                    </div>

                    <div className='section-div'>
                        <label className='checkbox-label' htmlFor={"temperatureGradient"}>
                            <input type='checkbox' id={"temperatureGradient"} name={"temperatureGradient"} onChange={checkboxHandler} checked={getFormData.temperatureGradient} />
                            Temperature Gradient :
                        </label>
                        <div className='right-section'>
                            <div className='generate-label'>
                                <label htmlFor='deltaT' className='label-name'>Delta T</label>
                                <input id='deltaT' type='number' name='deltaT' value={getFormData.deltaT} onChange={inputHandler} disabled={!getFormData.temperatureGradient} />
                                <span className='unit'>[T]</span>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* section-f */}
                <fieldset className='section-f'>
                    <div className='section-div'>
                        <label className='checkbox-label' htmlFor={"shrinkageStrain"}>
                            <input type='checkbox' id={"shrinkageStrain"} name={"shrinkageStrain"} onChange={checkboxHandler} checked={getFormData.shrinkageStrain} />
                            Shrinkage Strain :
                        </label>
                        <div className='right-section'>
                            <div className='generate-label'>
                                <input type='number' name='shrinkageStrainValue' value={getFormData.shrinkageStrainValue} onChange={inputHandler} disabled={!getFormData.shrinkageStrain} />
                            </div>
                        </div>
                    </div>
                    <div className='section-div'>
                        <label className='checkbox-label' htmlFor={"thermalCoefficient"}>
                            Thermal Coefficient :
                        </label>
                        <div className='right-section'>
                            <div className='generate-label'>
                                <input type='number' id='thermalCoefficient' name='thermalCoefficient' value={getFormData.thermalCoefficient} onChange={inputHandler} />
                                <span className='unit'>1/[T]</span>
                            </div>
                        </div>
                    </div>
                </fieldset>

                {/* unit changer */}
                <section className='unit-changer'>
                    {/* force unit */}
                    <div className='force-unit'>
                        <label htmlFor='forceUnit' className='label-name'>Force-Unit</label>
                        <select id='forceUnit' value={getFormData.forceUnit} onChange={forceUnitHandler}>
                            <option value={"kN"}>kN,Kips,N</option>
                            <option value={"kgf"}>kgf,Kips,N</option>
                        </select>
                    </div>

                    {/* length unit */}
                    <div className='length-unit'>
                        <label htmlFor='lengthUnit' className='label-name'>Length-Unit</label>
                        <select id='lengthUnit' value={getFormData.lengthUnit} onChange={lengthUnitHandler}>
                            <option value={"m"}>M,mm,in</option>
                            <option value={"cm"}>C,cm,in</option>
                        </select>
                    </div>
                </section>
            </form>

            <hr />
            {/* import - download */}
            <FileUpload getFormData={getFormData} setFormData={setFormData} fileName={"loads"} />
        </div>
    )
}

export default Loads