import React from 'react';
import Chart from './Chart';

const Results = (props) => {
  return (
    <div className="results">
      <Chart state={props.state}/>
      <div className="info container">
        <div className="legend">
          <p className="legend-cloud">Cloud cover (%)</p>
          <p className="legend-humidity">Humitity (%)</p>
          <p className="legend-wind">Wind speed (km/hr)</p>
        </div>
      </div>
    </div>
  )
}

export default Results;