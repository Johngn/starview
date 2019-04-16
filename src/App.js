import React, { Component } from "react";
import axios from "axios";
import Results from "./components/Results";
// import Sidebar from "./components/Sidebar";
// import Welcome from "./components/Welcome";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      weather: {},
      astronomy: {},
      lat: "",
      lng: "",
      route: "",
      chartData: {},
      day: "0",
      date: ""
    };
  }

  // select day
  dayPickerHandler = e => {
    this.setState(
      {
        day: e.target.value
      },
      () => this.resultlog()
    );
  };

  // places autocomplete
  onChange = address => {
    this.setState({
      address
    });
  };

  // get location and convert to lat lng
  formSubmitHandler = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.getWeather(latLng))
      .catch(error => console.error("Error", error));
  };

  getWeather = latLng => {
    this.setState({
      lat: latLng.lat,
      lng: latLng.lng
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          latLng.lat
        }&lon=${latLng.lng}&appid=f33d03be6862e5e82150c45691c13aed`
      )
      .then(response => {
        this.setState(
          {
            weather: response.data.list
          },
          () => this.resultlog()
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  resultlog = () => {
    const weather = this.state.weather;

    // let weatherTonight = [];

    // switch (this.state.day) {
    //   case "0":
    //     weatherTonight = weather.slice(0, 5);
    //     break;
    //   case "1":
    //     weatherTonight = weather.slice(5, 10);
    //     break;
    //   case "2":
    //     weatherTonight = weather.slice(10, 15);
    //     break;
    //   case "3":
    //     weatherTonight = weather.slice(15, 20);
    //     break;
    //   case "4":
    //     weatherTonight = weather.slice(20, 25);
    //     break;
    //   default:
    //     weatherTonight = weather.slice(0, 5);
    // }

    // const nightTimeWeather = weatherTonight.filter(
    //   weatherHour =>
    //     !(
    //       Number(weatherHour[0].dt_txt.slice(10, 13)) > 10 &&
    //       Number(weatherHour[0].dt_txt.slice(10, 13)) <= 20
    //     )
    // );

    // console.log(weatherTonight[0].dt_txt.slice(10, 13));

    const forecastTimes = [],
      cloudArray = [],
      humidityArray = [],
      windArray = [];
    weather.forEach(hourly => {
      let forecastTime = hourly.dt_txt;
      let cloud = hourly.clouds.all;
      let humidity = hourly.main.humidity;
      let wind = hourly.wind.speed;

      forecastTimes.push(forecastTime);
      cloudArray.push(cloud);
      humidityArray.push(humidity);
      windArray.push(wind);
    });

    this.setState({
      route: "display",
      chartData: {
        labels: forecastTimes,
        datasets: [
          {
            pointRadius: 0,
            label: "Cloud cover (%)",
            data: cloudArray,
            borderColor: "red"
          },
          {
            pointRadius: 0,
            label: "Humidity (%)",
            data: humidityArray,
            borderColor: "rgb(255, 100, 0)"
          },
          {
            pointRadius: 0,
            label: "Wind speed (km/hr)",
            data: windArray,
            borderColor: "rgb(255, 0, 225)"
          }
        ]
      }
    });
  };

  render() {
    // places autocomplete
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    return (
      <section>
        <div>
          <div className="container">
            <form className="row" onSubmit={this.formSubmitHandler}>
              <div className="col-sm-7 col-7">
                <PlacesAutocomplete inputProps={inputProps} />
              </div>
              {this.state.route !== "" ? (
                <div className="col-sm-3 col-3">
                  {/* <Sidebar
                    dayPickerHandler={this.dayPickerHandler}
                    state={this.state}
                  /> */}
                </div>
              ) : (
                ""
              )}
              <div className="col-sm-2 col-2">
                <button className="" type="submit">
                  Go
                </button>
              </div>
            </form>
          </div>
          <div className="border-line" />

          <Results state={this.state} />
        </div>
      </section>
    );
  }
}

export default App;
