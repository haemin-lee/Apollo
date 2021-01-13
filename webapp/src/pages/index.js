import { useState, useEffect } from 'react'
import Tabbar from './home'
import get_client from '../app/apiConnector'

class User {
    constructor(
        name,
        id,
        age,
        height,
        weight,
        biosex,
        DOB,
        BMI,
        BodyFat,
        notes,
        StepData,
        HeartData,
        BPData,
        BGData,
        SleepData,
        Image1,
        Image2,
        Image3,
        presetgraph
    ) {
        this.name = name
        this.id = id
        this.age = age
        this.height = height
        this.weight = weight
        this.biosex = biosex
        this.DOB = DOB
        this.BMI = BMI
        this.BodyFat = BodyFat
        this.notes = notes
        this.StepData = StepData
        this.HeartData = HeartData
        this.BPData = BPData
        this.BGData = BGData
        this.SleepData = SleepData
        this.data = [
            StepData,
            HeartData,
            BPData,
            BGData,
            SleepData,
            Image1,
            Image2,
            Image3,
        ]
        this.presetgraph = [{
            "id": "CHOOSE DATA",
            "data": [
              {
                "x": 1,
                "y": 1
              },
              {
                "x": 2,
                "y": 2
              },
              {
                "x": 3,
                "y": 3
              },
              {
                "x": 4,
                "y": 4
              },
              {
                "x": 5,
                "y": 5
              },
              {
                "x": 6,
                "y": 6
              }
            ]
          }];
    }
}

// figure styles out later...
function Home() {

    let users = [new User("Jenny", 1232131, 20, 43, 32, "Female", "6/30/2000", 43, 12, "Very cool",{},{},{},{},{},"","","",""), 
                 new User("Devin", 1232131, 20, 54, 12, "Male", "10/2/2000", 76, 49, "Very epic",{},{},{},{},{},"","","","")];
    let activeUser = users[0];


    const [data, setData] = useState(activeUser);
    const [userarr, setUsers] = useState(users);

    async function get_appointment_data() {
        const client = get_client()
        const d = await client.appointments.get_appointments()
    }

    async function get_patient_data() {
        const client = get_client()
        const d = await client.patients.get_patients()
    }

    async function get_appointment_document(id) {
        const client = get_client()
        const d = await client.appointments.get_appointment_documents(id)
        
        console.log(d)

        let imagenum = 0;
        var idexist = false;
        var usersindex = users.length;

        for(let i = 0; i < users.length; i++)
        {
            if (d[0].patient === users[i].id)
            {
                idexist = true;
                usersindex = i;
            }
        }

        if (!idexist) {
            users.push(
                new User(
                    'Penis',
                    d[0].patient,
                    20,
                    54,
                    12,
                    'Male',
                    '10/2/9000',
                    76,
                    49,
                    'Very poggers',
                    {},
                    {},
                    {},
                    {},
                    {},
                    '',
                    '',
                    '',
                    ''
                )
            )
            activeUser = users[users.length - 1]
            console.log(activeUser)
        }

        var copy = users

        for (let i = 0; i < d.length; i++) {
            if (d[i].type === 'LINE_GRAPH') {
                if (d[i].name === 'Steps') {
                    copy[usersindex].StepData = d[i].data
                    copy[usersindex].data[0] = d[i].data
                }
                if (d[i].name === 'Heart Rate') {
                    copy[usersindex].HeartData = d[i].data
                    copy[usersindex].data[1] = d[i].data
                }
                if (d[i].name === 'Blood Pressure') {
                    copy[usersindex].BPData = d[i].data
                    copy[usersindex].data[2] = d[i].data
                }
                if (d[i].name === 'Blood Glucose') {
                    copy[usersindex].BGData = d[i].data
                    copy[usersindex].data[3] = d[i].data
                }
                if (d[i].name === 'Sleep') {
                    copy[usersindex].SleepData = d[i].data
                    copy[usersindex].data[4] = d[i].data
                }
            }
            if (d[i].type === 'IMAGE') {
                if (imagenum === 0) {
                    copy[usersindex].Image1 = d[i].data
                    copy[usersindex].data[5] = d[i].data
                }
                if (imagenum === 1) {
                    copy[usersindex].Image2 = d[i].data
                    copy[usersindex].data[6] = d[i].data
                }
                if (imagenum === 2) {
                    copy[usersindex].Image3 = d[i].data
                    copy[usersindex].data[7] = d[i].data
                }
                imagenum++
            }
        }

        setUsers(copy)

        console.log(users)
    }

    function changeSelectedUser(i) {
        setData(userarr[i])
        console.log(i)
    }

    function renderPatientCards() {
        return userarr.map((user, i) => (
            <div
                className={`row patient-card ${
                    data.name === user.name ? 'active' : ''
                }`}
            >
                <div
                    className="col patient-card-info"
                    style={{ cursor: 'pointer' }}
                    onClick={() => changeSelectedUser(i)}
                >
                    <p>{user.name}</p>
                    <p>{user.appointment || 'Cardiology'}</p>
                    <p>{user.time || '10:45 AM'}</p>
                </div>
            </div>
        ))
    }

    useEffect(() => {
        // Update the document title using the browser API
        const id = '164057523'
        get_appointment_data()
        get_patient_data()
        get_appointment_document(id)
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <h4
                        className="header"
                        style={{
                            marginBottom: 15,
                        }}
                    >
                        Patients
                    </h4>
                    {renderPatientCards()}
                </div>
                <div className="col-9">
                    <Tabbar userData={data} />
                </div>
            </div>
        </div>
    )
}


export default Home
