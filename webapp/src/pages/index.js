
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabbar from './home';
import get_client from '../app/apiConnector';
import DevinStepData from './DevinStepData.json'
//import { ResponsiveLine } from '@nivo/line'

class User {
    constructor(name, age, height, weight, biosex, DOB, BMI, BodyFat, notes, StepData, HeartData, BPData, BGData, SleepData)
    {
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.biosex = biosex;
        this.DOB = DOB;
        this.BMI = BMI;
        this.BodyFat = BodyFat;
        this.notes = notes;
        this.StepData = StepData;
        this.HeartData = HeartData;
        this.BPData = BPData;
        this.BGData = BGData;
        this.SleepData = SleepData;
        this.data = [StepData,HeartData,BPData,BGData,SleepData];
    }
}

//constructor(name, age, height, weight, biosex, DOB, BMI, BodyFat, notes, stepData, HeartData, BPData, BGData, SleepData)

// figure styles out later...
function Home() {
    let users = [new User("Jenny", 20, 43, 32, "Female", "6/30/2000", 43, 12, "Very cool", DevinStepData, DevinStepData, DevinStepData, DevinStepData, DevinStepData), 
    new User("Devin", 20, 54, 12, "Male", "10/2/2000", 76, 49, "Very epic", DevinStepData, DevinStepData, DevinStepData, DevinStepData, DevinStepData)];
    let activeUser = users[0];
    const [data, setData] = useState(activeUser);

    async function get_appointment_data() {
        const client = get_client()
        const d = await client.appointments.get_appointments()
    }

    async function get_appointment_document(id) {
        
        const client = get_client()
        const d = await client.appointments.get_appointment_documents(id)
        console.log(d);
    }

    async function get_appointment_document(id) {
        
        const client = get_client()
        const d = await client.appointments.get_appointment_documents(id)
        console.log(d);
    }

    async function get_patient_data() {
        const client = get_client()
        const d = await client.patients.get_patients()
        console.log(d);
    }

    function changeSelectedUser(i){
        setData(users[i]);
        console.log(i);
    }

    function getName(i)
    {
        return (
            <div>
                <Button color="primary" onClick={() => { changeSelectedUser(i) }}>
                    {users[i].name}
                </Button>
            </div>
        );
    }

    function returnNameList()
    {
        var returnObj = [];
        var i = 0;
        for(i = 0; i < users.length; i++)
        {
            returnObj.push(getName(i));
        }
        return returnObj;
    }

    useEffect(() => {
        // Update the document title using the browser API
        const id = "164057523";
        get_appointment_data();
        get_patient_data();
        get_appointment_document(id);
    });
    //}, []);

    return (
        <Container>
            <Row>
            <h1>Welcome to Apollo</h1>
            </Row>
            <Row style={{height:30}}></Row>
            <Row>
                <div style={{outline: "1px solid gray"}}>
                    <Col>
                        <h3>
                            Select a patient
                        </h3>
                        {returnNameList()}
                    </Col>
                </div>
                <Col>
                    <Tabbar userData={data} />
                    
                </Col>
            </Row>
        </Container>
    );
}

export default Home
