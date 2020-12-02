import React, {useEffect, useState} from 'react';
import Countdown from 'react-countdown';
import './styles.scss'

const Home = () =>{

    useEffect(() => {
        function getAlerts() {
          fetch('https://api.caribe7.com/events/random')
        .then(response => response.json()) 
        .then(
            (object) => {
                console.log(object); 
            setResultclass(object.class);
            setEventId(object.event_id);
            setEventDescription(object.description);
            setEventStart(object.event_datetime);
            setRunners(object.runners);
            setStatus(object.status)
            console.log('this is the status'+status);
            console.log(eventStart);
        })
        .catch((error)=>console.log('error',error));
    };
        getAlerts()
        const interval = setInterval(() => getAlerts(), 60000)
        return () => {
          clearInterval(interval);
        }
    }, []);
    const [resultclass, setResultclass]=useState(null);
    const [eventId, setEventId]=useState('');
    const [eventDescription, setEventDescription]=useState('');
    const [eventStart, setEventStart]=useState('');
    const [runners, setRunners] = useState([]);
    const [status, setStatus] = useState('');
    
    const displayRunners = runners.map ((item)=>
        <li key={item.runner_id}>
            <p>Runner: {item.name}</p>
            <p>Score: {item.score}</p>
        </li>
    );

return(
    <div className="container">
        <div className="left">
            <p className="bold">Event Id:</p><p> {eventId}</p>
            <p className="bold">Event Description: </p><p> {eventDescription}</p>
            {status==='CLOSED' ? <p><p className="bold">Event Start Time:</p> {eventStart}</p> : <Countdown date={Date.parse(eventStart)+14400}/>}
            {resultclass?.class_id ? <p><p className="bold">Class id:</p> {resultclass.class_id}</p> : <p>loading...</p>}
            {resultclass?.description ? <p><p className="bold">Class description: </p>{resultclass.description}</p> : <p>loading...</p>}
        </div>
        <div className="right">
            <p className="bold">Number of runners: </p><p> {runners.length}</p>
            <ul>{displayRunners}</ul>
        </div>
        
    </div>
    
)
}
export default Home;