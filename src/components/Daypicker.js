import React from "react";

const Daypicker = props => {
    return (
        <select className="day-picker-select" onChange={props.dayPickerHandler}>
            <option value="0">
                Today
                {/* {props.state.weather[0].FCTTIME.mon_abbrev}{" "}
        {props.state.weather[0].FCTTIME.mday} */}
            </option>
            <option value="1">
                Tomorrow
                {/* {props.state.weather[24].FCTTIME.mon_abbrev}{" "}
        {props.state.weather[24].FCTTIME.mday} */}
            </option>
            <option value="2">
                Day 3
                {/* {props.state.weather[48].FCTTIME.mon_abbrev}{" "}
        {props.state.weather[48].FCTTIME.mday} */}
            </option>
            <option value="3">
                Day 4
                {/* {props.state.weather[72].FCTTIME.mon_abbrev}{" "}
        {props.state.weather[72].FCTTIME.mday} */}
            </option>
            <option value="4">
                Day 5
                {/* {props.state.weather[96].FCTTIME.mon_abbrev}{" "}
        {props.state.weather[96].FCTTIME.mday} */}
            </option>
        </select>
    );
};

export default Daypicker;
