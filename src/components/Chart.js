import React from "react";
import { Line } from "react-chartjs-2";

const Chart = props => {
    return (
        <div className="chart">
            <div className="">
                <Line
                    data={props.state.chartData}
                    options={{
                        maintainAspectRatio: true,
                        legend: {
                            display: true,
                            labels: {
                                fontColor: "#fff",
                            },
                        },
                        title: {
                            display: false,
                        },
                        scales: {
                            xAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        fontSize: 15,
                                        fontColor: "#fff",
                                    },
                                    gridLines: {
                                        display: false,
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        beginatZero: true,
                                        max: 100,
                                        min: 0,
                                        fontSize: 15,
                                        fontColor: "#fff",
                                    },
                                    gridLines: {
                                        display: true,
                                    },
                                },
                            ],
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Chart;
