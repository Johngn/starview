import React, { Component } from 'react';
import axios from 'axios';
// import Nav from './components/Nav';
import Results from './components/Results';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './App.css';

class App extends Component {
  constructor () {
    super ()
    this.state = { 
      address: '',
      weather: {},
      astronomy: {},
      lat: '',
      lng: '',
      route: 'display',
      chartData: {}
    } 
  }




  // Api calls
  apiCall = (latLng) => {
    this.getWeather(latLng)
  }  
  getWeather = (latLng) => {
    this.setState({
      lat: latLng.lat,
      lng: latLng.lng
    })
    axios.get(`http://api.wunderground.com/api/547a76a2afd69505/hourly10day/q/${this.state.lat},${this.state.lng}.json`)
      .then((response) => {
        this.setState({
          weather: response.data.hourly_forecast
        }, () => this.getAstro())
      })
      .catch((error) => {
        console.log(error);
      })      
  }
  getAstro = () => {
    axios.get(`http://api.wunderground.com/api/547a76a2afd69505/astronomy/q/${this.state.lat},${this.state.lng}.json`)
      .then((response) => {
        this.setState({
          astronomy: response.data
        }, () => this.resultlog())
      })
      .catch((error) => {
        console.log(error);
      })      
  }



  
  // get location and convert to lat lng
  formSubmitHandler = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.apiCall(latLng))
      .catch(error => console.error('Error', error))
  }
  // places autocomplete
  onChange = (address) => {
    this.setState({
      address
    })
  }

  resultlog = () => {
    console.log(this.state)
    const sunsetHour = Number(this.state.astronomy.sun_phase.sunset.hour)
    const sunset = (
      'Sunset - ' + Number(sunsetHour - 12) + ':' + 
      this.state.astronomy.sun_phase.sunset.minute + ' PM'
    )
    const sunriseHour = Number(this.state.astronomy.sun_phase.sunrise.hour)
    const sunrise = (
      'Sunrise - ' + sunriseHour + ':' + 
      this.state.astronomy.sun_phase.sunrise.minute + ' AM'
    )
    const weather = this.state.weather

    weather.forEach((hourly) => {
      hourly = hourly.FCTTIME.hour
      console.log(typeof hourly )    
    })



    const timeArray = (
      sunset + ',' +
      weather[0].FCTTIME.civil + ',' +
      weather[1].FCTTIME.civil + ',' +
      weather[2].FCTTIME.civil + ',' +
      weather[3].FCTTIME.civil + ',' +
      weather[4].FCTTIME.civil + ',' +
      weather[5].FCTTIME.civil + ',' +
      weather[6].FCTTIME.civil + ',' +
      weather[7].FCTTIME.civil + ',' +
      weather[8].FCTTIME.civil + ',' +
      weather[9].FCTTIME.civil + ',' +
      weather[10].FCTTIME.civil + ',' +
      weather[11].FCTTIME.civil + ',' +
      weather[12].FCTTIME.civil + ',' +
      weather[13].FCTTIME.civil + ',' +
      weather[14].FCTTIME.civil + ',' +
      weather[15].FCTTIME.civil + ',' +
      weather[16].FCTTIME.civil + ',' +
      weather[17].FCTTIME.civil + ',' +
      weather[18].FCTTIME.civil + ',' +
      weather[19].FCTTIME.civil + ',' +
      weather[20].FCTTIME.civil + ',' +
      weather[21].FCTTIME.civil + ',' +
      weather[22].FCTTIME.civil + ',' +
      sunrise
    ).split(",")
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
      weather[9].sky + ',' +
      weather[10].sky + ',' +
      weather[11].sky + ',' +
      weather[12].sky + ',' +
      weather[13].sky + ',' +
      weather[14].sky + ',' +
      weather[15].sky + ',' +
      weather[16].sky + ',' +
      weather[17].sky + ',' +
      weather[18].sky + ',' +
      weather[19].sky + ',' +
      weather[20].sky + ',' +
      weather[21].sky + ',' +
      weather[22].sky + ',' +
      weather[23].sky + ',' +
      weather[24].sky
    ).split(",")
    const humidityArray = (
      weather[0].humidity + ',' +
      weather[1].humidity + ',' +
      weather[2].humidity + ',' +
      weather[3].humidity + ',' +
      weather[4].humidity + ',' +
      weather[5].humidity + ',' +
      weather[6].humidity + ',' +
      weather[7].humidity + ',' +
      weather[8].humidity + ',' +
      weather[9].humidity + ',' +
      weather[10].humidity + ',' +
      weather[11].humidity + ',' +
      weather[12].humidity + ',' +
      weather[13].humidity + ',' +
      weather[14].humidity + ',' +
      weather[15].humidity + ',' +
      weather[16].humidity + ',' +
      weather[17].humidity + ',' +
      weather[18].humidity + ',' +
      weather[19].humidity + ',' +
      weather[20].humidity + ',' +
      weather[21].humidity + ',' +
      weather[22].humidity + ',' +
      weather[23].humidity + ',' +
      weather[24].humidity
    ).split(",")
    const windArray = (
      weather[0].wspd.metric + ',' +
      weather[1].wspd.metric + ',' +
      weather[2].wspd.metric + ',' +
      weather[3].wspd.metric + ',' +
      weather[4].wspd.metric + ',' +
      weather[5].wspd.metric + ',' +
      weather[6].wspd.metric + ',' +
      weather[7].wspd.metric + ',' +
      weather[8].wspd.metric + ',' +
      weather[9].wspd.metric + ',' +
      weather[10].wspd.metric + ',' +
      weather[11].wspd.metric + ',' +
      weather[12].wspd.metric + ',' +
      weather[13].wspd.metric + ',' +
      weather[14].wspd.metric + ',' +
      weather[15].wspd.metric + ',' +
      weather[16].wspd.metric + ',' +
      weather[17].wspd.metric + ',' +
      weather[18].wspd.metric + ',' +
      weather[19].wspd.metric + ',' +
      weather[20].wspd.metric + ',' +
      weather[21].wspd.metric + ',' +
      weather[22].wspd.metric + ',' +
      weather[23].wspd.metric + ',' +
      weather[24].wspd.metric
    ).split(",")


    this.setState({
      chartData: {
        labels: timeArray,
        datasets:[
          {
            pointRadius: 0,
            label: 'Cloud cover (%)',
            data: cloudArray,
            backgroundColor: 'rgba(255, 0, 225, 0.2)'
          },
          {
            pointRadius: 0,
            label: 'Humidity (%)',
            data: humidityArray,
            backgroundColor: 'rgba(255, 100, 0, 0.3)'
          },
          {
            pointRadius: 0,
            label: 'Wind speed (km/hr)',
            data: windArray,
            backgroundColor: 'gray'
          }
        ]
      }
    })
  }

  render() {
    // places autocomplete
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        {/* <Nav /> */}
        <div className="">
          <div className="row">
            <div className="col-md-3">
              <form onSubmit={this.formSubmitHandler}>
                <PlacesAutocomplete inputProps={inputProps} />
                <button type="submit">Submit</button>
              </form>
            </div>
            {this.state.route === 'display' ? <Results state={this.state}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
