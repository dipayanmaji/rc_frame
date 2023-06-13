import React from 'react'
import './GenerateLabel.scss';
const GenerateLabel = ({ label, element, getFormData, inputHandler }) => {
    const { name, displayName, forceUnit, lengthUnit, square, degreeUnit } = label;
    return (
        <div className='generate-label'>
            {displayName && <label htmlFor={name === "loadSlope" ? null : name} className='label-name'>{displayName}</label>}
            {name === "loadSlope" ?
                <>
                    <label htmlFor='loadSlopeL'>{"(L) 1 : "}
                        <input type='number' id={"loadSlopeL"} name={"loadSlopeL"} onChange={inputHandler} value={getFormData["loadSlopeL"]} disabled={true} />
                    </label>
                    <label htmlFor='loadSlopeR'>{"(R) 1 : "}
                        <input type='number' id={"loadSlopeR"} name={"loadSlopeR"} onChange={inputHandler} value={getFormData["loadSlopeR"]} disabled={true} />
                    </label>
                </>
                :
                <>
                    <input type='number' id={name} name={name} onChange={inputHandler} value={getFormData[name]} disabled={name === "pavementThickness" ? true : !getFormData[element]} />
                    <span className='unit'>{forceUnit && getFormData.forceUnit + "/"}{lengthUnit && getFormData.lengthUnit}<sup>{square}</sup>{degreeUnit}</span>
                </>
            }
        </div>
    )
}

export default GenerateLabel