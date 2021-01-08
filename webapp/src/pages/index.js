
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabbar from './home';
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


let users = [new User("Jenny", JennyData, 23, 12), new User("Devin", DevinData, 42, 12), new User("Max", MaxData, 32, 12), new User("Baran", BaranData, 12, 21)];
let activeUser = users[0];

// figure styles out later...
function Home() {

    const [data, setData] = useState(activeUser);

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
