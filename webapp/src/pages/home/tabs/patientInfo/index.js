// Future feature: import from Excel
import { useState } from 'react'


// Prob better way to do prop mapping
function PatientInfo(props) {


    return (
        <div>
            <h3>{props.userData.name}</h3>
            <h4>height: {props.userData.height} inches</h4>
            <h4>weight: {props.userData.weight} pounds</h4> 
        </div>
    );
}

export default PatientInfo
