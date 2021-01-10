
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabbar from './home';
import get_client from '../app/apiConnector';
// ^^ change this relative path 
//import { ResponsiveLine } from '@nivo/line'

class User {
    constructor(name, data, height, weight)
    {
        this.name = name;
        this.data = data;
        this.height = height;
        this.weight = weight;
    }
}

let JennyData = [1, 2, 3, 4, 5];
let DevinData = [1, 2, 3, 4, 5];
let MaxData = [1, 2, 3, 4, 5];
let BaranData = [1, 2, 3, 4, 5];

let users = [new User("Jenny", JennyData, 23, 12), new User("Devin", DevinData, 42, 12), new User("Max", MaxData, 32, 12), new User("Baran", BaranData, 12, 21)];
let activeUser = users[0];

// figure styles out later...
function Home() {

    const [data, setData] = useState(activeUser);

    async function get_appointment_data() {
        const client = get_client()
        const d = await client.appointments.get_appointments()
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
        get_appointment_data();
        get_patient_data();
      });

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
