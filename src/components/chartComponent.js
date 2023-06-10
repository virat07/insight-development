import React from "react";
import { Bar } from "react-chartjs-2";

const ChartComponent = ({ userResponses }) => {
  // Prepare the data for the chart
  const data = {
    labels: userResponses.map((response, index) => `Question ${index + 1}`),
    datasets: [
      {
        label: "User Responses",
        data: userResponses,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Configure the chart options
  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };
  

  return <Bar data={data} options={options} />;
};

export default ChartComponent;
