import React from 'react';

const Sidebar = (props) => {
  return (
      <select className="" onChange={props.dayPickerHandler}>
        <option value="0">{props.state.weather[0].FCTTIME.mon_abbrev} {props.state.weather[0].FCTTIME.mday}</option>
        <option value="1">{props.state.weather[24].FCTTIME.mon_abbrev} {props.state.weather[24].FCTTIME.mday}</option>
        <option value="2">{props.state.weather[48].FCTTIME.mon_abbrev} {props.state.weather[48].FCTTIME.mday}</option>
        <option value="3">{props.state.weather[72].FCTTIME.mon_abbrev} {props.state.weather[72].FCTTIME.mday}</option>
        <option value="4">{props.state.weather[96].FCTTIME.mon_abbrev} {props.state.weather[96].FCTTIME.mday}</option>
      </select>
  )
}

export default Sidebar;