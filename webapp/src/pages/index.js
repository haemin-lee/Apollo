import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabbar from './home'
import get_client from '../app/apiConnector'
import SearchBar from 'material-ui-search-bar'
import Loader from 'react-loader-spinner'
//import { ResponsiveLine } from '@nivo/line'

class User {
    constructor(
        photo,
        name,
        id,
        age,
        biosex,
        DOB,
        email,
        homePhone,
        notes,
        StepData,
        HeartData,
        BPData,
        BGData,
        SleepData,
        Image1,
        Image2,
        Image3,
        scheduledAppointmentDate,
        scheduledAppointmentTime,
        duration,
        reason,
        reoccuring,
        status
    ) {
        this.photo = photo
        this.name = name
        this.id = id
        this.age = age
        this.biosex = biosex
        this.DOB = DOB
        this.email = email
        this.homePhone = homePhone
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
        this.scheduledAppointmentDate = scheduledAppointmentDate
        this.scheduledAppointmentTime = scheduledAppointmentTime
        this.duration = duration
        this.reason = reason
        this.reoccuring = reoccuring
        this.status = status
        this.appointment = [
            scheduledAppointmentDate,
            scheduledAppointmentTime,
            duration,
            reason,
            reoccuring,
            status,
        ]
    }
}

let appointments = []
let patients = []
let patient_id_for_documents = []

// figure styles out later...
function Home() {
    let users = [
        new User(
            'Jenny',
            1232131,
            20,
            43,
            32,
            'Female',
            '6/30/2000',
            43,
            12,
            'Very cool',
            {},
            {},
            {},
            {},
            {},
            '',
            '',
            '',
            ''
        ),
        new User(
            'Devin',
            1232131,
            20,
            54,
            12,
            'Male',
            '10/2/2000',
            76,
            49,
            'Very epic',
            {},
            {},
            {},
            {},
            {},
            '',
            '',
            '',
            ''
        ),
    ]
    let activeUser = users[0]

    const [data, setData] = useState(activeUser)
    const [userarr, setUsers] = useState(users)
    const [searchResult, setSearchResult] = useState('')
    const [refreshing, setRefreshing] = useState(true)

    function getFormattedDate(datetemp) {
        var date = new Date(datetemp)
        var year = date.getFullYear()

        var month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month

        var day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day

        return month + '/' + day + '/' + year
    }

    function getFormattedTime(timetemp) {
        var date = new Date(timetemp)
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + ':' + minutes + ' ' + ampm
        return strTime
    }

    function getAge(birthdayTemp) {
        var birthday = new Date(birthdayTemp)
        var ageDifMs = Date.now() - birthday
        var ageDate = new Date(ageDifMs) // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }

    function correlatePatientsWithAppointments() {
        var i, j
        users = []
        for (j = 0; j < appointments.length; j++) {
            var patient_id_string = appointments[j].drchrono_id.toString()
            patient_id_for_documents.push(patient_id_string)
        }
        for (i = 0; i < patients.length; i++) {
            var id = patients[i].data.id
            for (j = 0; j < appointments.length; j++) {
                if (id === appointments[j].data.patient) {
                    var formattedDOB = getFormattedDate(
                        patients[i].data.date_of_birth
                    )
                    var appointment_date = getFormattedDate(
                        patients[i].data.date_of_birth
                    )
                    var appointment_time = getFormattedTime(
                        patients[i].data.date_of_birth
                    )
                    var reoccuring_appointment_temp = appointments[
                        j
                    ].data.recurring_appointment.toString()
                    var age = getAge(patients[i].data.date_of_birth)
                    console.log('why isnt this working')
                    console.log(reoccuring_appointment_temp)
                    var totalName =
                        patients[i].data.first_name +
                        ' ' +
                        patients[i].data.last_name
                    let newUserTemp = new User(
                        patients[i].data.patient_photo,
                        totalName,
                        id,
                        age,
                        patients[i].data.gender,
                        formattedDOB,
                        patients[i].data.email,
                        patients[i].data.home_phone,
                        appointments[j].data.notes,
                        {},
                        {},
                        {},
                        {},
                        {},
                        '',
                        '',
                        '',
                        appointment_date,
                        appointment_time,
                        appointments[j].data.duration,
                        appointments[j].data.reason,
                        reoccuring_appointment_temp,
                        appointments[j].data.status
                    )
                    users.push(newUserTemp)
                    break
                }
            }
        }
        console.log(users)
    }

    async function get_appointment_data() {
        const client = get_client()
        const d = await client.appointments.get_appointments()
        appointments = d

        console.log('appointnents')
        console.log(appointments)
    }

    async function get_patient_data() {
        const client = get_client()
        const d = await client.patients.get_patients()
        patients = d
        console.log('patietns')
        console.log(d)

        correlatePatientsWithAppointments()
        console.log('i objectively need to not be styupid')

        console.log(patient_id_for_documents)
    }

    async function get_appointment_document(id) {
        const client = get_client()
        const d = await client.appointments.get_appointment_documents(id)
        console.log('appointmnet docunmebts')
        console.log(d)
        let imagenum = 0
        var idexist = false
        var usersindex = users.length

        for (let i = 0; i < users.length; i++) {
            if (d[0].patient === users[i].id) {
                idexist = true
                usersindex = i
            }
        }

        if (!idexist) {
            users.push(
                new User(
                    'not Penis',
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
                console.log('type')
                console.log(d[i].name)
                if (d[i].name === 'Steps') {
                    console.log('doopdoopdoopp')
                    console.log(d[i].data)
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

        setUsers([...copy])
        setData(copy[0])
    }

    function changeSelectedUser(i) {
        console.log('crochet')
        console.log(userarr[i])
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
                    <p>{user.scheduledAppointmentDate || '6/30/2021'}</p>
                    <p>{user.time || '10:45 AM'}</p>
                </div>
            </div>
        ))
    }

    function doSomethingWith(literalName) {
        console.log(literalName)
        var i = 0
        let tempUserArray = userarr
        for (i = 0; i < userarr.length; i++) {
            console.log(tempUserArray[i].name)
            if (tempUserArray[i].name === literalName) {
                console.log('young sheck wes')
                var tempUser = tempUserArray[i]
                tempUserArray.splice(i, 1)
                tempUserArray.unshift(tempUser)
                console.log(tempUserArray)
            }
        }
        setUsers([...tempUserArray])
    }

    useEffect(() => {
        // Update the document title using the browser API
        //const id = '164393747'

        async function getData() {
            setRefreshing(true)
            await get_appointment_data()
            await get_patient_data()
            let m = 0
            for (m = 0; m < patient_id_for_documents.length; m++) {
                console.log('iterating rn')
                await get_appointment_document(patient_id_for_documents[m])
            }
            setRefreshing(false)
        }
        getData()
    }, [])

    if (refreshing)
        return (
            <div className="loader">
                <Loader
                    type="TailSpin"
                    color="#3b42bf"
                    height={100}
                    width={100}
                    timeout={6000}
                />
            </div>
        )

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <h2
                        className="header"
                        style={{
                            marginBottom: 15,
                        }}
                    >
                        Patients
                    </h2>
                    <div class="row">
                        <div class="col">
                            <SearchBar
                                style={{
                                    width: '112%',
                                    marginLeft: '-15px',
                                    marginBottom: '10px',
                                }}
                                value={searchResult}
                                onChange={(newValue) =>
                                    setSearchResult(newValue)
                                }
                                onRequestSearch={() =>
                                    doSomethingWith(searchResult)
                                }
                            />
                        </div>
                    </div>

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
