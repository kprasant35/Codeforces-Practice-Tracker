import React, {useState} from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';
import './components.css';


function PlotRating({solvedRating}){
    const chartData={
        labels: Object.keys(solvedRating),
    
        datasets: [{
          label: "Solved",
          data: Object.values(solvedRating),
          borderColor: "black",
          borderWidth: 1,
        }]
      }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
            legend: {
                display: false
            }
        }
    }
    return (<div className='rating-wrapper'>
        <Bar data={chartData} options={options} redraw/>
    </div>);
}

export default PlotRating;