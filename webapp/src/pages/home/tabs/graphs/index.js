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


    const classes = useStyles();
    const [graphtype, setGraphType] = React.useState('');
  
    const handleChange = (event) => {
      setGraphType(event.target.value);
    };

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
        <div style={{height:300}}>

        <MyResponsiveLine data={props.userData.data}/>
    
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Graph Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={graphtype}
          onChange={handleChange}
        >
          <MenuItem value={"Step Count"}>Step Count</MenuItem>
          <MenuItem value={"Heart Rate"}>Heart Rate</MenuItem>
          <MenuItem value={"Blood Pressure"}>Blood Pressure</MenuItem>
          <MenuItem value={"Blood Glucose"}>Blood Glucose</MenuItem>
          <MenuItem value={"Sleep"}>Sleep</MenuItem>
        </Select>
      </FormControl>

        </div>
    );
}

export default Graphs

