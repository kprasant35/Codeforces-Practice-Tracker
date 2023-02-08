import React, {useState} from 'react';
import './components.css';

function Content(props){
    const {solved, tried, submission, attempt} = props.stats;
    return (<div className={'sectionWrapper '+(solved===undefined?'hidden':'')}>
        
        <ul>
            <li className='dataElements'>
                Problem Solved : <span>{solved}</span>
            </li>
            <li className='dataElements'>
                Problem Tried : <span>{tried}</span>
            </li>
            <li className='dataElements'>
                Total Submission : <span>{submission}</span>
            </li>
            <li className='dataElements'>
                Average attempt : <span>{parseFloat(attempt).toFixed(2)}</span>
            </li>
        </ul>
    </div>);
}

export default Content;