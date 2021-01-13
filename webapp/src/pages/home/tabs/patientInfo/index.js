// Future feature: import from Excel
import { useState } from 'react'


// Prob better way to do prop mapping
function PatientInfo(props) {

//constructor(name, id, age, height, weight, biosex, DOB, BMI, BodyFat, notes, StepData, HeartData, BPData, BGData, SleepData, Image1, Image2, Image3)
    return (
        <div>
            <div>
            <h2>{props.userData.name}</h2>
            </div>
            <div>
            <h3>Basic Info</h3> 
            <h4>height: {props.userData.age} inches</h4>
            <h4>height: {props.userData.DOB} inches</h4>
            <h4>height: {props.userData.biosex} inches</h4>
            </div>  
            <div>
            <h3>Measurements</h3> 
            <h4>height: {props.userData.height} inches</h4>
            <h4>weight: {props.userData.weight} pounds</h4> 
            <h4>weight: {props.userData.BMI} pounds</h4> 
            <h4>weight: {props.userData.BodyFat} pounds</h4> 
            </div>  
            <div>
            <h3>Notes</h3> 
            <h5>{props.userData.notes}</h5> 
            </div>  
            
            
        </div>
    );
}

export default PatientInfo
