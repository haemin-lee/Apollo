
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

let JennyData = [{
    "id": "Jenny",
    "data": [
      {
        "x": 30,
        "y": 90
      },
      {
        "x": 60,
        "y": 120
      },
      {
        "x": 90,
        "y": 86
      },
      {
        "x": 120,
        "y": 120
      },
      {
        "x": 150,
        "y": 99
      },
      {
        "x": 180,
        "y": 102
      }
    ]
  }];
let DevinData = [{
    "id": "Devin",
    "data": [
      {
        "x": 30,
        "y": 101
      },
      {
        "x": 60,
        "y": 150
      },
      {
        "x": 90,
        "y": 70
      },
      {
        "x": 120,
        "y": 80
      },
      {
        "x": 150,
        "y": 90
      },
      {
        "x": 180,
        "y": 102
      }
    ]
  }];
let MaxData = [{
    "id": "Max",
    "data": [
      {
        "x": 30,
        "y": 120
      },
      {
        "x": 60,
        "y": 140
      },
      {
        "x": 90,
        "y": 110
      },
      {
        "x": 120,
        "y": 129
      },
      {
        "x": 150,
        "y": 102
      },
      {
        "x": 180,
        "y": 98
      }
    ]
  }];
let BaranData = [{
    "id": "Baran",
    "data": [
      {
        "x": 30,
        "y": 130
      },
      {
        "x": 60,
        "y": 121
      },
      {
        "x": 90,
        "y": 117
      },
      {
        "x": 120,
        "y": 87
      },
      {
        "x": 150,
        "y": 90
      },
      {
        "x": 180,
        "y": 113
      }
    ]
  }];


//constructor(name, age, height, weight, biosex, DOB, BMI, BodyFat, notes, stepData, HeartData, BPData, BGData, SleepData)

let users = [new User("Jenny", 20, 43, 32, "Female", "6/30/2000", 43, 12, "Very cool", JennyData, MaxData, JennyData, MaxData, JennyData), 
             new User("Devin", 20, 54, 12, "Male", "10/42/2000", 76, 49, "Very epic", DevinData, BaranData, DevinData, BaranData, DevinData)];
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
