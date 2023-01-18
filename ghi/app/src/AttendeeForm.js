import React, {useEffect, useState} from 'react';


function AttendeeForm() {
    const [conferences, setConferences] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [conference, setConference] = useState('');


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}

        data.name = name;
        data.email = email;
        data.conference = conference;

        const attendeeUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            const newAttendee = await response.json();
            console.log(newAttendee);

            setName('');
            setEmail('');
            setConference('');
            let divTag = document.getElementById('success-message');
            divTag.classList.remove('d-none');
            const formTag = document.getElementById('create-attendee-form');
            formTag.classList.add('d-none');
        }

    }



    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setConferences(data.conferences);

            const divTag = document.getElementById('spinner');
            divTag.classList.add('d-none');
            const selectTag = document.getElementById('conference')
            selectTag.classList.remove('d-none');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="col col-sm-auto">
                <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
            </div>
            <div className="col">
                <div className="card shadow">
                    <div className="card-body">
                    <form onSubmit={handleSubmit} id="create-attendee-form">
                        <h1 className="card-title">It's Conference Time!</h1>
                        <p className="mb-3">
                        Please choose which conference
                        you'd like to attend.
                        </p>
                        <div className="d-flex justify-content-center mb-3" id="loading-conference-spinner" />
                            <div className="spinner-grow text-secondary" id="spinner" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleConferenceChange} name="conference" id="conference" className="form-select d-none" required value={conference}>
                                <option>Choose a conference</option>
                                {conferences.map(conference => {
                                    return (
                                        <option key={conference.id} value ={conference.href}>
                                            {conference.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <p className="mb-3">
                            Now, tell us about yourself.
                        </p>
                        <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input onChange={handleNameChange} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" value={name} />
                                    <label htmlFor="name">Your full name</label>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input onChange={handleEmailChange} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" value={email} />
                                <label htmlFor="email">Your email address</label>
                            </div>
                        </div>
                        <button className="btn btn-lg btn-primary">I'm going!</button>
                    </form>
                    <div className="alert alert-success d-none mb-0" id="success-message">
                        Congratulations! You're all signed up!
                    </div>
                    </div>
                </div>
            </div>
      </div>
    );
}
export default AttendeeForm;
