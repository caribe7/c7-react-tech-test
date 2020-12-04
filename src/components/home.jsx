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
            setRunners(object.runners);
            setData(object);
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
    const [runners, setRunners] = useState([]);
    const [data, setData] = useState([]);

    
    const displayRunners = runners.map ((item)=>
        <li key={item.runner_id}>
            <p>Runner: {item.name}</p>
            <p>Score: {item.score}</p>
        </li>
    );

return(
    <div className="container"> 
        <div className="left">
            <div><p className="bold">Event Id: </p> {eventId}</div>
            <div> <p className="bold">Event Description:</p>{eventDescription}</div>
            {data?.status ?  
                data.status==='CLOSED' ? 
                    data?.event_datetime ? <div><p className="bold">Event Start Time:</p> {data.event_datetime}</div> : null 
                : <div><p className="bold">Countdown:</p> <Countdown date={Date.parse(data.event_datetime)+14400}/></div>
            : <p>loading...</p> }
            {resultclass?.class_id ? <div><p className="bold">Class id:</p>{resultclass.class_id}</div> : <p>loading...</p>}
            {resultclass?.description ? <div><p className="bold">Class description:</p>{resultclass.description}</div> : <p>loading...</p>}
        </div>
        <div className="right">
            <div><p className="bold">Number of runners:</p>{runners.length}</div>
            <ul>{displayRunners}</ul>
        </div>
        
    </div>

)
}
export default Home;

