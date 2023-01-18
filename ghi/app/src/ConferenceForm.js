import React, { useEffect, useState } from 'react';


function ConferenceForm() {
    const [locations, setLocations] = useState([]);

    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [maxPresentation, setMaxPresentation] = useState('');
    const [maxAttendee, setMaxAttendee] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleStartChange = (event) => {
        const value = event.target.value;
        setStart(value);
    }
    const handleEndChange = (event) => {
        const value = event.target.value;
        setEnd(value);
    }
    const handleMaxPresentationChange = (event) => {
        const value = event.target.value;
        setMaxPresentation(value);
    }
    const handleMaxAttendeeChange = (event) => {
        const value = event.target.value;
        setMaxAttendee(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.starts = start;
        data.ends = end;
        data.max_presentations = maxPresentation;
        data.max_attendees = maxAttendee;
        data.location = location;
        data.description = description;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference)

            setName('');
            setStart('');
            setEnd('');
            setMaxPresentation('');
            setMaxAttendee('');
            setLocation('');
            setDescription('');
        }

    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new conference</h1>
                <form onSubmit={handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} placeholder="Name" required type="text" name = "name" id="name" className="form-control" value={name}/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleStartChange} placeholder="Starts" required type="date" name = "starts" id="start_date" className="form-control" value={start}/>
                        <label htmlFor="start_date">Start date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEndChange} placeholder="Ends" required type="date" name = "ends" id="end_date" className="form-control" value={end}/>
                        <label htmlFor="end_date">End date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleMaxPresentationChange} placeholder="Max presentations" required type="number" name = "max_presentations" id="max_presentations" className="form-control" value={maxPresentation}/>
                        <label htmlFor="max_presentations">Max presentations</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleMaxAttendeeChange} placeholder="Max attendees" required type="number" name = "max_attendees" id="max_attendees" className="form-control" value={maxAttendee}/>
                        <label htmlFor="max_attendees">Max attendees</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleLocationChange} required id="location" name = "location" className="form-select" value={location}>
                            <option>Choose a location</option>
                            {locations.map(location => {
                                return (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea onChange={handleDescriptionChange} className="form-control" id="description" rows="3" value={description}></textarea>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    );
}
export default ConferenceForm;
