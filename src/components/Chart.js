import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = (props) => {
  return (
    <div className="chart">
      <Line
        data={props.state.chartData}
        options={{            
          legend: {
            display: true
          },
          title: {
            display: false,
            text: 'Tonight',
            position: 'bottom'
          },  
          scales: {              
            xAxes: [{
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              ticks: {
                beginatZero: true,
                max: 100,
                min: 0
              },
              gridLines: {
                display: false
              }
            }]
          }        
        }}
      />
    </div>      
  )  
}

export default Chart;