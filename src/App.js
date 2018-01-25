import React, { Component } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Results from './components/Results';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './App.css';

class App extends Component {
  constructor () {
    super ()
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  searchSubmitHandler = (e) => {
    e.preventDefault()
    console.log(this.state.location)
    axios.get(`http://api.wunderground.com/api/547a76a2afd69505/hourly10day/q/${this.state.location}.json`)
      .then((response) => {
        this.setState({
          weather: response.data.hourly_forecast
        })
        console.log(this.state)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
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
              <form onSubmit={this.handleFormSubmit}>
                <PlacesAutocomplete inputProps={inputProps} />
                <button type="submit">Submit</button>
              </form>
            </div>
            <Results />                       
          </div>
        </div>
      </div>
    );
  }
}

export default App;
