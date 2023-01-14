import React from 'react';
import './components.css';

function HandleForm(){
    return (<div className="handle-card ">
        <form className="codeforces-handle" action=''>
            <div className='handle-div'>
                <input data-name="handle" className="handle-input" datatype='text' placeholder='Codeforces User Handle'/>
                <label htmlFor="handle" className='handle-label' />
                <span className="handle-error">No user found</span>
            </div>
        </form>
    </div>)
}

export default HandleForm;