import React, { useEffect, useState } from 'react';
import './App.css';
import HandleForm from './components/handleform';
import Content from './components/content';
import PlotGraph from './components/plotgraph';
import Axios from "axios";



const url="https://codeforces.com/api/user.status?handle=";
function App() {
  const [userStats, setUserStats] = useState({});

  function callCodeforcesApi(handle){
    const problems = {};
    Axios.get(url+handle).then((response)=>{
      var date = new Date();
      date.setDate(date.getDate()-30);
      console.log(date);
      const data=response.data.result;
      
      let cnt=0, wa=0, ac=0, others=0;
      const problemTried = new Set();
      const problemSolved = new Set();

      for(let i=0;i<data.length;i++){
        let submissionTime=new Date(0);
        submissionTime.setSeconds(data[i].creationTimeSeconds);
        if(submissionTime>=date){ // past 30 days
          cnt++;
          problemTried.add(data[i].problem.name);
          if(data[i].verdict==="OK"){
            problemSolved.add(data[i].problem.name);
            ac++;
          }else if(data[i].verdict==="WRONG_ANSWER"){
            wa++;
          }else others++;
        }
      }

      setUserStats({
        solved: problemSolved.size,
        tried: problemTried.size,
        submission: cnt,
        attempt: cnt/problemSolved.size
      });

      console.log(userStats);
      
    }).catch(error =>{
      console.log(error);
      console.log("some error happened");
    }); 
  }

  return ( <div className="container">
    <HandleForm callback={callCodeforcesApi}/>
    <div className='stats-container'>
      <Content stats={userStats}/>
      <PlotGraph />
    </div>
  </div>);
}

export default App;
