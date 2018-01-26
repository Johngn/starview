import React from 'react';
import Chart from './Chart';

const Results = (props) => {
  return (
    <div className="results col-md-9">
      <Chart state={props.state}/>
    </div>
  )
}

export default Results;