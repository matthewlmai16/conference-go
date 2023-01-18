import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='attendees' element={<AttendeesList attendees={props.attendees} />} />
          <Route path='locations/new' element={<LocationForm />} />
          <Route path='conferences/new' element={<ConferenceForm />} />
          <Route path='attendees/new' element={<AttendeeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
