import React, {useEffect, useState} from 'react';


function PresentationForm() {
    const [conferences, setConferences] = useState([]);


    const [presenterName, setPresenterName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');


    const handlePresenterNameChange = (event) => {
        const value = event.target.value;
        setPresenterName(value);
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const handleCompanyNameChange = (event) => {
        const value = event.target.value;
        setCompanyName(value);
    }
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }
    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.presenter_name = presenterName;
        data.presenter_email = email;
        data.company_name = companyName;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;
        console.log(data);

        const selectTag = document.getElementById('conference');
        const conferenceId = selectTag.options[selectTag.selectedIndex].value
        console.log(conferenceId);
        const presentationUrl = `http://localhost:8000/${conferenceId}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation);

            setPresenterName('');
            setEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');
            setConference('');

        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);

        const selectTag = document.getElementById('conference');
        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={handlePresenterNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" value={presenterName} />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" value={email} />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCompanyNameChange} placeholder="Company name" required type="text" name="company_name" id="company_name" className="form-control" value={companyName}/>
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTitleChange} placeholder="Title" required type="text" name = "title" id="title" className="form-control" value={title} />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={handleSynopsisChange} className="form-control" id="synopsis" rows="3" value={synopsis} ></textarea>
              </div>
              <div className="mb-3">
                <select onChange={handleConferenceChange} required id="conference" name = "conference" className="form-select" value={conference} >
                    <option>Choose a conference</option>
                    {conferences.map(conference => {
                        return (
                            <option key={conference.id} value={conference.href}>
                                {conference.name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default PresentationForm;
