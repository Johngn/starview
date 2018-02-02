import React, { Component } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Results from './components/Results';
import Sidebar from './components/Sidebar';
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
      route: '',
      chartData: {},
      day: '0',
      date: ''
    } 
  }




  // select day
  dayPickerHandler = (e) => {
    this.setState({
      day: e.target.value
    }, () => this.resultlog())
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
    const sunriseHour = Number(this.state.astronomy.sun_phase.sunrise.hour)
    // const sunset = (
    //   'Sunset - ' + Number(sunsetHour - 12) + ':' + 
    //   this.state.astronomy.sun_phase.sunset.minute + ' PM'
    // )    
    // const sunrise = (
    //   'Sunrise - ' + sunriseHour + ':' + 
    //   this.state.astronomy.sun_phase.sunrise.minute + ' AM'
    // )
    const weather = this.state.weather

    const middayArray = []
    weather.forEach((hourIndex) => {
      if (hourIndex.FCTTIME.hour === (sunriseHour + 1).toString()) {
        middayArray.push(weather.indexOf(hourIndex))
      }
    })

    let weatherTonight = []

    switch (this.state.day) {
      case '0': 
        weatherTonight = weather.slice(0, middayArray[0]);
        break;
      case '1':
        weatherTonight = weather.slice(middayArray[0], middayArray[1]);
        break;
      case '2':
        weatherTonight = weather.slice(middayArray[1], middayArray[2]);
        break;
      case '3':
        weatherTonight = weather.slice(middayArray[2], middayArray[3]);
        break;
      case '4':
        weatherTonight = weather.slice(middayArray[3], middayArray[4]);
        break;        
      default:
        weatherTonight = weather.slice(0, middayArray[0]);
    }
   
    

    const nightTimeWeather = weatherTonight.filter(weatherHour => (
      !(Number(weatherHour.FCTTIME.hour) > sunriseHour && Number(weatherHour.FCTTIME.hour) <= sunsetHour)
    ))

    const forecastTimes = [], 
          cloudArray = [], 
          humidityArray = [], 
          windArray = []
    nightTimeWeather.forEach((hourly) => {
      let forecastTime = hourly.FCTTIME.hour
      let cloud = hourly.sky
      let humidity = hourly.humidity
      let wind = hourly.wspd.metric

      forecastTimes.push(forecastTime)
      cloudArray.push(cloud)
      humidityArray.push(humidity)
      windArray.push(wind)
    })

    this.setState({
      route: 'display',
      chartData: {
        labels: forecastTimes,
        datasets:[
          {
            pointRadius: 0,
            label: 'Cloud cover (%)',
            data: cloudArray,
            borderColor: 'red'
          },
          {
            pointRadius: 0,
            label: 'Humidity (%)',
            data: humidityArray,
            borderColor: 'rgb(255, 100, 0)'
          },
          {
            pointRadius: 0,
            label: 'Wind speed (km/hr)',
            data: windArray,
            borderColor: 'rgb(255, 0, 225)'
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
        <Nav />
        <div className="container">
          <form className="row" onSubmit={this.formSubmitHandler}>
          <div className="col-sm-7 col-7">
            <PlacesAutocomplete inputProps={inputProps}  />
            </div>
            {this.state.route === 'display' ? 
            <div className="col-sm-3 col-3">
            <Sidebar dayPickerHandler={this.dayPickerHandler} state={this.state} />
            </div> : ''}
            <div className="col-sm-2 col-2">
            <button className="" type="submit">Go</button>
            </div>
          </form>          
        </div>
        <div className="border-line"></div>
        {this.state.route === 'display' ? <Results state={this.state}/> : ''}
      </div>
    );
  }
}

export default App;