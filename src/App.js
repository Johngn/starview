import React, { Component } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Results from './components/Results';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './App.css';

class App extends Component {
  constructor () {
    super ()
    this.state = { 
      address: '',
      weather: '',
      astronomy: '',
      lat: '',
      lng: '',
      route: 'display'
    } 
  }

  apiCall = (latLng) => {
    this.getWeather(latLng);
    this.getAstro(latLng);
    this.setState({
      route: 'display'
    })
  }
  
  getAstro = (latLng) => {
    this.setState({
      lat: latLng.lat,
      lng: latLng.lng
    })
    axios.get(`http://api.wunderground.com/api/547a76a2afd69505/astronomy/q/${this.state.lat},${this.state.lng}.json`)
      .then((response) => {
        this.setState({
          astronomy: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })      
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
        })
        console.log(this.state)
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
