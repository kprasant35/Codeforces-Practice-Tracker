import React, {useState} from 'react';
import {Pie} from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';
import './components.css';

function PlotGraph({userData}){
    const chartData={
        labels: ['WA','AC','Others'],
    
        datasets: [{
          label: "Verdict",
          data: userData,
          borderColor: "black",
          borderWidth: 1,
          backgroundColor: [
            "red",
            "green",
            "blue"
          ]
        }]
      }
    return (<div className='pie-wrapper'>
        <Pie data={chartData} redraw/>
    </div>);
}

export default PlotGraph;