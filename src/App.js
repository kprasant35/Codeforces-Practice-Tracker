import React, { useEffect, useState } from 'react';
import './App.css';
import HandleForm from './components/handleform';
import Content from './components/content';
import PlotGraph from './components/plotgraph';
import PlotRating from './components/PlotRating';
import Axios from "axios";

import { UserData } from './Data';


const url="https://codeforces.com/api/user.status?handle=";
function App() {
  const [userStats, setUserStats] = useState({});
  const [userData,setUserData] = useState([]);
  const [solvedRating,setSolvedRating] = useState({});
  
  function callCodeforcesApi(handle){
    const problems = {};
    Axios.get(url+handle).then((response)=>{
      const date = new Date();
      date.setDate(date.getDate()-30);
      console.log('date: ',date.toDateString());
      const data=response.data.result;
      
      
      const problemTried = new Set();
      const problemSolved = new Set();
      let cnt=0, wa=0, ac=0, others=0;
      const solvedRating={};
      const solvedMap = {};

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
          if(data[i].problem.rating!=undefined){
            if(solvedRating[data[i].problem.rating]===undefined){
              solvedRating[data[i].problem.rating]=1;
              solvedMap[data[i].problem.contestId+data[i].problem.index]=true;
            }else
              if(solvedMap[data[i].problem.contestId+data[i].problem.index]===undefined){
                solvedRating[data[i].problem.rating]++;
                solvedMap[data[i].problem.contestId+data[i].problem.index]=true;
              } 
          }
        }
      }

      setUserStats({
        solved: problemSolved.size,
        tried: problemTried.size,
        submission: cnt,
        attempt: cnt/problemSolved.size
      });
      setUserData([wa,ac,others]);
      setSolvedRating(solvedRating);

    }).catch(error =>{
      console.log(error);
      console.log("some error happened");
    }); 

  }
  

  return ( <div className={'container '}>
    <HandleForm callback={callCodeforcesApi}/>
    <div className={'stats-container '+(userStats.solved===undefined?'hidden':'')}>
      <Content stats={userStats}/>
      <PlotGraph userData={userData}/>
    </div>
    <div className={'rating-container '+(userStats.solved===undefined?'hidden':'')}>
      <PlotRating solvedRating={solvedRating}/>
    </div>
  </div>);
}

export default App;
