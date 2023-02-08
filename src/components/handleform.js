import React, {useState} from 'react';
import './components.css';

function HandleForm(props){
    const [username, setUsername] = useState("");
    function handleSubmit(event){
        event.preventDefault();
        console.log(username);
        props.callback(username);
        // setUsername("");
    }

    function handleChange(event){
        setUsername(event.target.value);
    }
    return (<div className="handle-card ">
        <form className="codeforces-handle" action='' onSubmit={handleSubmit}>
            <div className='handle-div'>
                <input data-name="handle" className="handle-input" onChange={handleChange} datatype='text' placeholder='Codeforces User Handle' value={username}/>
                <label htmlFor="handle" className='handle-label' />
                <span className="handle-error">No user found</span>
            </div>
        </form>
    </div>);
}

export default HandleForm;