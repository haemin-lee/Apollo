// Future feature: import from Excel
import { useState, useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";



let xaxis = "";
let yaxis = "";

let stepgraphdata = {};
let heartgraphdata = {};
let BPgraphdata = {};
let BGgraphdata = {};
let sleepgraphdata = {};

let ticks = [];
let stepticks = [];
let heartticks = [];
let BPticks = [];
let BGticks = [];
let sleepticks = [];

let graphtypevar = 0;


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  const datesAreOnSameDay = (first, second) => (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
    
// Prob better way to do prop mapping
function Graphs(props) {

  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    setTimeout(()=>{
      ticks = stepticks;
      props.userData.presetgraph = stepgraphdata;
      xaxis = "Steps"
      yaxis = "Date"
      setRefresh(!refresh);
      }, 50)
}, [])

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;
  var onemobefore = new Date(today) 
  onemobefore.setMonth(onemobefore.getMonth()-1)


    const [startDate, setStartDate] = useState(new Date(onemobefore));
    const [endDate, setEndDate] = useState(new Date(today));


    function dateRange() {
        
        return (
          <>
            <DatePicker
              selected={startDate}
              onChange={date => {
                setStartDate(date)
                setGraph(graphtypevar)
              }
            }
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={date => {
                setEndDate(date)
                setGraph(graphtypevar)
              }
            }
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </>
        );
      };


    
    setGraph(graphtypevar)

    function setStepGraph(){
      

      let currTime = props.userData.StepData[0].startDate;
      let sum = props.userData.StepData[0].value;
      let newObj = [];
      
        for (let j = 1; j < props.userData.StepData.length; j++)
        {
        
        

        if ((!datesAreOnSameDay(new Date(currTime), new Date(props.userData.StepData[j].startDate))))
          {
              newObj.push({
              x: new Date(currTime).toDateString(),
              y: sum })
          currTime = props.userData.StepData[j].startDate
          sum = props.userData.StepData[j].value
          }
          else
            sum += props.userData.StepData[j].value
        }

      

      let stepgraphObj = [];
      for (let i = 0; i < newObj.length; i++)
        {

          if (new Date(newObj[i].x) >= startDate && new Date(newObj[i].x) <= endDate)
          {
            stepgraphObj.push(newObj[i])
          }
        }
      
      

      if (stepgraphObj.length > 8)
      {
      stepticks = [];
      let shown1 = 0;
      let shown2 = Math.floor((stepgraphObj.length - 1) / 4)
      let shown3 = Math.floor((stepgraphObj.length - 1) / 2)
      let shown4 = Math.floor((stepgraphObj.length - 1) / 4 * 3)
      let shown5 = (stepgraphObj.length - 1)

      stepticks = [stepgraphObj[shown1].x, stepgraphObj[shown2].x, stepgraphObj[shown3].x, stepgraphObj[shown4].x, stepgraphObj[shown5].x];
      }
      else
      {
        stepticks = [];
        for (let i = 0; i < stepgraphObj.length; i++)
        {
          stepticks.push(stepgraphObj[i].x)
        }
      }
      
      props.userData.presetgraph = [{"id": props.userData.name, "data": stepgraphObj.reverse()}]; 
      ticks = stepticks;
      xaxis = "Steps"
      yaxis = "Date"
    }


    function setHeartGraph(){
      

      let currTime = props.userData.HeartData[0].startDate;
      let sum = props.userData.HeartData[0].value;
      let perday = 1;
      let newObj = [];
      
        for (let j = 1; j < props.userData.HeartData.length; j++)
        {
        
        

        if ((!datesAreOnSameDay(new Date(currTime), new Date(props.userData.HeartData[j].startDate))))
          {
              newObj.push({
              x: new Date(currTime).toDateString(),
              y: sum/perday })
          currTime = props.userData.HeartData[j].startDate
          sum = props.userData.HeartData[j].value
          perday = 1
          }
          else
          {
            sum += props.userData.HeartData[j].value
            perday++
          }
            
        }

      

      let heartgraphObj = [];
      for (let i = 0; i < newObj.length; i++)
        {

          if (new Date(newObj[i].x) >= startDate && new Date(newObj[i].x) <= endDate)
          {
            heartgraphObj.push(newObj[i])
          }
        }
      
      

      if (heartgraphObj.length > 8)
      {
      ticks = [];
      let shown1 = 0;
      let shown2 = Math.floor((heartgraphObj.length - 1) / 4)
      let shown3 = Math.floor((heartgraphObj.length - 1) / 2)
      let shown4 = Math.floor((heartgraphObj.length - 1) / 4 * 3)
      let shown5 = (heartgraphObj.length - 1)

      heartticks = [heartgraphObj[shown1].x, heartgraphObj[shown2].x, heartgraphObj[shown3].x, heartgraphObj[shown4].x, heartgraphObj[shown5].x];
      }
      else
      {
        heartticks = [];
        for (let i = 0; i < heartgraphObj.length; i++)
        {
          heartticks.push(heartgraphObj[i].x)
        }
      }
      
      props.userData.presetgraph = [{"id": props.userData.name, "data": heartgraphObj.reverse()}]; 
      ticks = heartticks;
      xaxis = "Avg Heart Rate"
      yaxis = "Date"
    }

      
    function setBPGraph(){
      

      let currTime = props.userData.BPData[0].startDate;
      let sumsys = props.userData.BPData[0].bloodPressureSystolicValue;
      let sumdiast = props.userData.BPData[0].bloodPressureDiastolicValue;
      let perday = 1;
      let newObjsys = [];
      let newObjdiast = [];
      
        for (let j = 1; j < props.userData.BPData.length; j++)
        {
        
        

        if ((!datesAreOnSameDay(new Date(currTime), new Date(props.userData.BPData[j].startDate))))
          {
              newObjsys.push({
              x: new Date(currTime).toDateString(),
              y: sumsys / perday })
              newObjdiast.push({
              x: new Date(currTime).toDateString(),
              y: sumdiast / perday })
          currTime = props.userData.BPData[j].startDate
          sumsys = props.userData.BPData[j].bloodPressureSystolicValue
          sumdiast = props.userData.BPData[j].bloodPressureDiastolicValue
          perday = 1
          }
          else
          {
            sumsys += props.userData.BPData[j].bloodPressureDiastolicValue
            sumdiast += props.userData.BPData[j].bloodPressureDiastolicValue
            perday++
          }
        }

      

      let BPgraphObjsys = [];
      let BPgraphObjdiast = [];
      for (let i = 0; i < newObjsys.length; i++)
        {

          if (new Date(newObjsys[i].x) >= startDate && new Date(newObjsys[i].x) <= endDate)
          {
            BPgraphObjsys.push(newObjsys[i])
          }
        }

      for (let i = 0; i < newObjdiast.length; i++)
      {

        if (new Date(newObjdiast[i].x) >= startDate && new Date(newObjdiast[i].x) <= endDate)
        {
          BPgraphObjdiast.push(newObjdiast[i])
        }
      }
      
      

      if (BPgraphObjsys.length > 8)
      {
      BPticks = [];
      let shown1 = 0;
      let shown2 = Math.floor((BPgraphObjsys.length - 1) / 4)
      let shown3 = Math.floor((BPgraphObjsys.length - 1) / 2)
      let shown4 = Math.floor((BPgraphObjsys.length - 1) / 4 * 3)
      let shown5 = (BPgraphObjsys.length - 1)

      ticks = [BPgraphObjsys[shown1].x, BPgraphObjsys[shown2].x, BPgraphObjsys[shown3].x, BPgraphObjsys[shown4].x, BPgraphObjsys[shown5].x];
      }
      else
      {
        BPticks = [];
        for (let i = 0; i < BPgraphObjsys.length; i++)
        {
          BPticks.push(BPgraphObjsys[i].x)
        }
      }
      
      props.userData.presetgraph = [{"id": props.userData.name + " systolic", "data": BPgraphObjsys.reverse()}, {"id": props.userData.name + " diastolic", "data": BPgraphObjdiast.reverse()}]; 

      console.log(props.userData.BPData)
      console.log(BPgraphObjsys)
      console.log(BPgraphObjdiast)

      ticks = BPticks;
      xaxis = "Avg Blood Pressure"
      yaxis = "Date"
    }


    function setBGGraph(){

      let currTime = props.userData.BGData[0].startDate;
      let sum = props.userData.BGData[0].value;
      let perday = 1;
      let newObj = [];
      
        for (let j = 1; j < props.userData.BGData.length; j++)
        {
        
        

        if ((!datesAreOnSameDay(new Date(currTime), new Date(props.userData.BGData[j].startDate))))
          {
              newObj.push({
              x: new Date(currTime).toDateString(),
              y: sum/perday })
          currTime = props.userData.BGData[j].startDate
          sum = props.userData.BGData[j].value
          perday = 1
          }
          else
          {
            sum += props.userData.BGData[j].value
            perday++
          }
            
        }

      

      let BGgraphObj = [];
      for (let i = 0; i < newObj.length; i++)
        {

          if (new Date(newObj[i].x) >= startDate && new Date(newObj[i].x) <= endDate)
          {
            BGgraphObj.push(newObj[i])
          }
        }
      
      

      if (BGgraphObj.length > 8)
      {
      BGticks = [];
      let shown1 = 0;
      let shown2 = Math.floor((BGgraphObj.length - 1) / 4)
      let shown3 = Math.floor((BGgraphObj.length - 1) / 2)
      let shown4 = Math.floor((BGgraphObj.length - 1) / 4 * 3)
      let shown5 = (BGgraphObj.length - 1)

      ticks = [BGgraphObj[shown1].x, BGgraphObj[shown2].x, BGgraphObj[shown3].x, BGgraphObj[shown4].x, BGgraphObj[shown5].x];
      }
      else
      {
        BGticks = [];
        for (let i = 0; i < BGgraphObj.length; i++)
        {
          BGticks.push(BGgraphObj[i].x)
        }
      }
      
      props.userData.presetgraph = [{"id": props.userData.name, "data": BGgraphObj.reverse()}]; 
      ticks = BGticks;
      xaxis = "Avg Blood Glucose"
      yaxis = "Date"
    }


    function setSleepGraph(){

      let currTime = props.userData.SleepData[0].startDate;
      let sum = ((new Date(props.userData.SleepData[0].endDate).getMinutes()) - (new Date(props.userData.SleepData[0].startDate).getMinutes())) + 60*((new Date(props.userData.SleepData[0].endDate).getHours()) - (new Date(props.userData.SleepData[0].startDate).getHours()));
      let newObj = [];
      
        for (let j = 1; j < props.userData.SleepData.length; j++)
        {
        
        

        if ((!datesAreOnSameDay(new Date(currTime), new Date(props.userData.SleepData[j].startDate))))
          {
              newObj.push({
              x: new Date(currTime).toDateString(),
              y: sum })
          currTime = props.userData.SleepData[j].startDate
          sum = ((new Date(props.userData.SleepData[j].endDate).getMinutes()) - (new Date(props.userData.SleepData[j].startDate).getMinutes())) + 60*((new Date(props.userData.SleepData[j].endDate).getHours()) - (new Date(props.userData.SleepData[j].startDate).getHours()))
          }
          else
            sum += ((new Date(props.userData.SleepData[j].endDate).getMinutes()) - (new Date(props.userData.SleepData[j].startDate).getMinutes())) + 60*((new Date(props.userData.SleepData[j].endDate).getHours()) - (new Date(props.userData.SleepData[j].startDate).getHours()))
        }

      

      let sleepgraphObj = [];
      for (let i = 0; i < newObj.length; i++)
        {

          if (new Date(newObj[i].x) >= startDate && new Date(newObj[i].x) <= endDate)
          {
            sleepgraphObj.push(newObj[i])
          }
        }
      
      

      if (sleepgraphObj.length > 8)
      {
      sleepticks = [];
      let shown1 = 0;
      let shown2 = Math.floor((sleepgraphObj.length - 1) / 4)
      let shown3 = Math.floor((sleepgraphObj.length - 1) / 2)
      let shown4 = Math.floor((sleepgraphObj.length - 1) / 4 * 3)
      let shown5 = (sleepgraphObj.length - 1)

      ticks = [sleepgraphObj[shown1].x, sleepgraphObj[shown2].x, sleepgraphObj[shown3].x, sleepgraphObj[shown4].x, sleepgraphObj[shown5].x];
      }
      else
      {
        sleepticks = [];
        for (let i = 0; i < sleepgraphObj.length; i++)
        {
          sleepticks.push(sleepgraphObj[i].x)
        }
      }
      
      props.userData.presetgraph = [{"id": props.userData.name, "data": sleepgraphObj.reverse()}]; 
      ticks = sleepticks;
      xaxis = "Minutes of Sleep"
      yaxis = "Date"
    }


    
      

    const classes = useStyles();
    const [graphtype, setGraphType] = React.useState(0);
  

    function setGraph(val)
    {
      if (val == 0)
      {
        setStepGraph()
      }
      if (val  == 1)
      {
        setHeartGraph()
      }
      if (val  == 2)
      {
        setBPGraph()
      }
      if (val  == 3)
      {
        setBGGraph()
      }
      if (val  == 4)
      {
        setSleepGraph()
      }

    }

    const handleChange = (event) => {
      graphtypevar = event.target.value
      setGraph(event.target.value)
      setGraphType(event.target.value)
    };

    const [value, setValue] = React.useState([null, null]);


    const MyResponsiveLine = ({ data }) => (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            yFormat=" >-.2f"
            colors={{"scheme":"accent"}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yaxis,
                legendOffset: 36,
                legendPosition: 'middle',
                tickValues: ticks
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: xaxis,
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
/>
)


    return (

        <div>
        
        <div>

        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Graph Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={graphtype}
          onChange={handleChange}
        >
          <MenuItem value={0}>Step Count</MenuItem>
          <MenuItem value={1}>Heart Rate</MenuItem>
          <MenuItem value={2}>Blood Pressure</MenuItem>
          <MenuItem value={3}>Blood Glucose</MenuItem>
          <MenuItem value={4}>Sleep</MenuItem>
        </Select>
        </FormControl>

        </div>

        <div>
        
        {dateRange()}

        </div>


        <div style={{height:300}}>


      
        <MyResponsiveLine data={props.userData.presetgraph}/>
        


        </div>
        </div>

    );
}

export default Graphs

