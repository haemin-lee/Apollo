// Future feature: import from Excel
import { useState } from 'react'
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


let graphdata = {};
let ticks = [];

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


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;

    const [startDate, setStartDate] = useState(new Date(today));
    const [endDate, setEndDate] = useState(new Date(today));

    function dateRange() {
        
        return (
          <>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </>
        );
      };


    function setGraph(){
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

      

      let graphObj = [];
      for (let i = 0; i < newObj.length; i++)
        {

          if (new Date(newObj[i].x) >= startDate && new Date(newObj[i].x) <= endDate)
          {
            graphObj.push(newObj[i])
          }
        }
      
      

      if (graphObj.length > 8)
      {
      ticks = [];
      let shown1 = 0;
      let shown2 = Math.floor((graphObj.length - 1) / 4)
      let shown3 = Math.floor((graphObj.length - 1) / 2)
      let shown4 = Math.floor((graphObj.length - 1) / 4 * 3)
      let shown5 = (graphObj.length - 1)

      ticks = [graphObj[shown1].x, graphObj[shown2].x, graphObj[shown3].x, graphObj[shown4].x, graphObj[shown5].x];
      }
      else
      {
        ticks = [];
        for (let i = 0; i < graphObj.length; i++)
        {
          ticks.push(graphObj[i].x)
        }
      }

      
    
      
      graphdata = [{"id": props.userData.name, "data": graphObj.reverse()}];
    }

      
      

    const classes = useStyles();
    const [graphtype, setGraphType] = React.useState(0);
  
    const handleChange = (event) => {
      setGraphType(event.target.value);

      if (event.target.value == 0)
      {
        
      }
    };

    const [value, setValue] = React.useState([null, null]);


    const MyResponsiveLine = ({ data }) => (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2f"
            colors={{"scheme":"accent"}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
                tickValues: ticks
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Steps',
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

    
        <MyResponsiveLine data={graphdata}/>
        {setGraph()}


        </div>
        </div>

    );
}

export default Graphs

