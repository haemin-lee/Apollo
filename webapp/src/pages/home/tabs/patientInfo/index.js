// Future feature: import from Excel
import { motionDefaultProps } from '@nivo/core';
import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';

// Prob better way to do prop mapping
function PatientInfo(props) {


//constructor(name, id, age, height, weight, biosex, DOB, BMI, BodyFat, notes, StepData, HeartData, BPData, BGData, SleepData, Image1, Image2, Image3)
    return (
        <div>
            <Container>
                <Row>
                    <div style={{height:40}}></div>
                </Row>
                <Row>
                    <div className='col-4'>
                        <h2 className = "patientname">{props.userData.name}</h2>
                    </div>
                    <div className='col-4'>
                        <Avatar alt={props.userData.name} src={props.userData.photo} style={{height: '75px', width: '75px'}} />
                    </div>
                </Row>
                <Row>
                    <div style={{height:20}}></div>
                </Row>
                <Row >
                    <Col className = "basicinfo">
                            <h3>Basic Information</h3>
                            <h4>Age: {props.userData.age} years old</h4>
                            <h4>Biological Sex: {props.userData.biosex}</h4>
                            <h4>Date of Birth: {props.userData.DOB}</h4>   
                    </Col>
                    <div style={{width:20}}></div>
                    <Col className = "contactinfo">
                            <h3>Contact Information</h3>
                            <h4>Patient ID: {props.userData.id}</h4>
                            <h4>Email: {props.userData.email}</h4>
                            <h4>Home Phone: {props.userData.homePhone}</h4>
                    </Col>
                </Row>
                <Row>
                    <div style={{height:20}}></div>
                </Row>
                <Row>
                    <Col className = "appointment">
                            <h3>Appointment</h3>
                            <h4>Appointment Date: {props.userData.scheduledAppointmentDate}</h4>
                            <h4>Appointment Time: {props.userData.scheduledAppointmentTime}</h4>
                            <h4>Duration: {props.userData.duration} minutes</h4>
                            <h4>Reason: {props.userData.reason}</h4>
                            <h4>Reoccuring: {props.userData.reoccurring}</h4>
                            <h4>Status: {props.userData.status}</h4>
                    </Col>
                    <div style={{width:20}}></div>
                    <Col className = "notescol">
                            <h3>Notes</h3>
                            <h4>{props.userData.notes}</h4>

                    </Col>
                </Row>
            </Container>
          {/*   <div>
                <h2>{props.userData.name}</h2>
            </div>
            <div>
            <h3>Basic Info</h3> 
            <h4>Age: {props.userData.age} years old</h4>
            <h4>DOB: {props.userData.DOB}</h4>
            <h4>Biological Sex: {props.userData.biosex}</h4>
            </div>  
            <div>
            <h3>Measurements</h3> 
            <h4>Height: {props.userData.height} inches</h4>
            <h4>Weight: {props.userData.weight} pounds</h4> 
            <h4>BMI: {props.userData.BMI}</h4> 
            <h4>Body Fat: {props.userData.BodyFat}%</h4> 
            </div>  
            <div>
            <h3>Notes</h3> 
            <h5>{props.userData.notes}</h5> 
            </div>  
             */}
            
        </div>
    );
}

export default PatientInfo
