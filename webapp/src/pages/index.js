
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabbar from './home';
import get_client from '../app/apiConnector';
import SearchBar from "material-ui-search-bar";
//import { ResponsiveLine } from '@nivo/line'

class User {
    constructor(name, id, age, height, weight, biosex, DOB, BMI, BodyFat, notes, StepData, HeartData, BPData, BGData, SleepData, Image1, Image2, Image3)
    {
        this.name = name;
        this.id = id;
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
        this.data = [StepData,HeartData,BPData,BGData,SleepData,Image1, Image2, Image3];
        
    }
}

//constructor(name, age, height, weight, biosex, DOB, BMI, BodyFat, notes, stepData, HeartData, BPData, BGData, SleepData)

// figure styles out later...
function Home() {

    let users = [new User("Jenny", 1232131, 20, 43, 32, "Female", "6/30/2000", 43, 12, "Very cool",{},{},{},{},{},"","","",""), 
                 new User("Devin", 1232131, 20, 54, 12, "Male", "10/2/2000", 76, 49, "Very epic",{},{},{},{},{},"","","","")];
    let activeUser = users[0];

    const [data, setData] = useState(activeUser);
    const [userarr, setUsers] = useState(users);
    const [searchResult, setSearchResult] = useState("");

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

        if(!idexist)
        {
            users.push(new User("Penis", d[0].patient, 20, 54, 12, "Male", "10/2/9000", 76, 49, "Very poggers",{},{},{},{},{},"","","",""))
            activeUser = users[users.length-1];
        }

        var copy = users

        for(let i = 0; i < d.length; i++)
        {
            if(d[i].type === "LINE_GRAPH")
            {
                if(d[i].name === "Steps")
                {
                    copy[usersindex].StepData = d[i].data;
                }
                if(d[i].name === "Heart")
                {
                    copy[usersindex].HeartData = d[i].data;
                }
                if(d[i].name === "BP")
                {
                    copy[usersindex].BPData = d[i].data;
                }
                if(d[i].name === "BG")
                {
                    copy[usersindex].BGData = d[i].data;
                }
                if(d[i].name === "Sleep")
                {
                    copy[usersindex].SleepData = d[i].data;
                }
            }
            if(d[i].type === "IMAGE")
            {
                if (imagenum === 0)
                {
                    copy[usersindex].Image1 = d[i].data;
                }
                if (imagenum === 1)
                {
                    copy[usersindex].Image2 = d[i].data;
                }
                if (imagenum === 2)
                {
                    copy[usersindex].Image3 = d[i].data;
                }
                imagenum++;
            }

        }

        
        setUsers(copy);

        console.log(users)
    }

    function changeSelectedUser(i){
        setData(userarr[i]);
        console.log(i);
    }

    function getName(i)
    {
        return (
            <div>
                <Button color="primary" onClick={() => { changeSelectedUser(i) }}>
                    {userarr[i].name}
                </Button>
            </div>
        );
    }

    function returnNameList(inputArray)
    {
        var returnObj = [];
        var i = 0;
        for(i = 0; i < inputArray.length; i++)
        {
            returnObj.push(getName(i));
        }
        return returnObj;
    }

    function doSomethingWith(literalName)
    {
        console.log(literalName);
        var i = 0;
        let tempUserArray = userarr;
        for(i = 0; i < userarr.length; i++)
        {
            console.log(tempUserArray[i].name)
            if(tempUserArray[i].name === literalName)
            {
                console.log("young sheck wes")
                var tempUser = tempUserArray[i];
                tempUserArray.splice(i, 1); 
                tempUserArray.unshift(tempUser);
                console.log(tempUserArray)
            }
        }
        setUsers([...tempUserArray]);
    }

    useEffect(() => {
        // Update the document title using the browser API
        const id = "164057523";
        get_appointment_data();
        get_patient_data();
        get_appointment_document(id);
      },[]);

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
                        <SearchBar
                            value={searchResult}
                            onChange={(newValue) => setSearchResult(newValue)}
                            onRequestSearch={() => doSomethingWith(searchResult)}
                        />
                        {returnNameList(userarr)}
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
