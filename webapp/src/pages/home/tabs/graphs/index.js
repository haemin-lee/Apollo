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




const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  


// Prob better way to do prop mapping
function Graphs(props) {

    const [startDate, setStartDate] = useState(new Date("2021/01/08"));
    const [endDate, setEndDate] = useState(new Date("2021/01/10"));

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


    const classes = useStyles();
    const [graphtype, setGraphType] = React.useState(0);
  
    const handleChange = (event) => {
      setGraphType(event.target.value);
    };

    const [value, setValue] = React.useState([null, null]);


    const MyResponsiveLine = ({ data }) => (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Minute',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'BPM',
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

        <MyResponsiveLine data={props.userData.data[graphtype]}/>

        </div>
        </div>

    );
}

export default Graphs

