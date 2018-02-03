import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = (props) => {
  return (
    <div className="chart">
      <div className="container">
        <Line
          data={props.state.chartData}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            title: {
              display: false
            },  
            scales: {              
              xAxes: [{
                display: true,
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  beginatZero: true,
                  max: 100,
                  min: 0
                },
                gridLines: {
                  display: true
                }
              }]
            }        
          }}
        />
      </div>
    </div>      
  )  
}

export default Chart;