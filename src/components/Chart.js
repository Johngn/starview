import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  constructor (props) {
    super (props)
    this.state = {
      chartData: {
        labels: ['16:00','17:00','18:00', '19:00', '20:00', '21:00', '22:00', '23:00','00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00'],
        datasets:[
          {
            pointRadius: 0,
            label: 'Cloud cover',
            data:[],
            backgroundColor: 'red'
          },
          {
            pointRadius: 0,
            label: 'Humidity',
            data:[]
          },
          {
            pointRadius: 0,
            label: 'Wind speed',
            data:[]
          }
        ]
      }
    }
  }

  resultlog = (props) => {
    const sunset = (
      this.props.state.astronomy.sun_phase.sunset.hour + ':' + 
      this.props.state.astronomy.sun_phase.sunset.minute
    )
    const sunrise = (
      this.props.state.astronomy.sun_phase.sunrise.hour + ':' + 
      this.props.state.astronomy.sun_phase.sunrise.minute
    )
    console.log(sunrise, sunset)
    const weather = this.props.state.weather
    const cloudArray = (
         weather[0].sky + ',' +
         weather[1].sky + ',' +
         weather[2].sky + ',' +
         weather[3].sky + ',' +
         weather[4].sky + ',' +
         weather[5].sky + ',' +
         weather[6].sky + ',' +
         weather[7].sky + ',' +
         weather[8].sky + ',' +
         weather[9].sky
    ).split(",")
    const timeArray = (
      weather[0].FCTTIME.civil + ',' +
      weather[1].FCTTIME.civil + ',' +
      weather[2].FCTTIME.civil + ',' +
      weather[3].FCTTIME.civil + ',' +
      weather[4].FCTTIME.civil + ',' +
      weather[5].FCTTIME.civil + ',' +
      weather[6].FCTTIME.civil + ',' +
      weather[7].FCTTIME.civil + ',' +
      weather[8].FCTTIME.civil + ',' +
      weather[9].FCTTIME.civil
 ).split(",")
    console.log(timeArray)


    this.setState({
      chartData: {
        labels: timeArray,
        datasets:[
          {
            pointRadius: 0,
            label: 'Cloud cover',
            data: cloudArray,
            backgroundColor: 'red'
          },
          {
            pointRadius: 0,
            label: 'Humidity',
            data:[]
          },
          {
            pointRadius: 0,
            label: 'Wind speed',
            data:[]
          }
        ]
      }
    })
  }

  render () {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{            
            legend: {
              display: true
            },
            title: {
              display: true,
              text: 'Custom Chart Title'
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
      <button onClick={this.resultlog}>Go</button>
      </div>      
    )
  }  
}

export default Chart;