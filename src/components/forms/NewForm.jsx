import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createForm, setForm } from "../../features/forms/formSlice";
import Dropdown from "../Dropdown";
import { useNavigate } from "react-router-dom";


export default function NewForm() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const {loading, error, form} = useSelector(state => state.forms);

    // Configure navigation to transition to attachments page on submit:
    const navigate = useNavigate();

    // Configure local state to be populated from form data to form a payload to be dispatched:
    const [formData, setFormData] = useState({
        username: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        time: undefined,
        date: undefined,
        location: undefined,
        description: undefined,
        cost: 0,
        gradeFormat: undefined,
        passingGrade: undefined,
        eventType: undefined,
        justification: undefined,
        hoursMissed: 0,
        attachment: undefined,
        supervisorAttachment: undefined,
        departmentHeadAttachment: undefined
    });

    // Set up a boolean to see whether or not the form has been submitted. Used to prevent the useEffect from triggering if component mounts with a form already loaded in the store:
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Update local form data fields as user inputs:
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    // Fetch dropdown options:
    const fetchEventTypes = async () => {
        const response = await fetch("http://localhost:8125/forms/events");
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    };
    
    const fetchGradeFormats = async () => {
        const response = await fetch("http://localhost:8125/forms/grade-formats");
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    };

    // Dispatch data to redux store on submit:
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createForm(formData));
    }

    // If the form object is updated in the store, navigate to the attachments page:
    useEffect(() => {
        if(form) {
            navigate("/forms/attachments");
        }
    },[form, navigate]);

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <h2>Reimbursement Request Form</h2>
                <fieldset>
                    <legend>Employee Details</legend>
                    <div>
                        <label>Username</label>
                        <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            aria-label="Enter username"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <label>First name</label>
                        <input 
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            aria-label="Enter first name"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <label>Last name</label>
                        <input 
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            aria-label="Enter last name"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <label>Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-label="Enter email address"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>General Event Details</legend>
                    <div>
                        <label>Event Start Time</label>
                        <input 
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            placeholder="HH:mm"
                            aria-label="Enter event starting time"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <label>Event Start Date</label>
                        <input 
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="YYYY-MM-DD"
                            aria-label="Enter event start date"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <label>Location</label>
                        <input 
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            aria-label="Enter event location"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <label>Brief description of the event</label>
                        <input 
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            aria-label="Enter event description"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Work-related Details</legend>
                    <div>
                        <label>Cost</label>
                        <input 
                            type="number"
                            step={0.01}
                            name="cost"
                            value={formData.cost}
                            onChange={handleChange}
                            aria-label="Enter event cost"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <Dropdown
                            label="Grade Format"
                            name="gradeFormat"
                            value={formData.gradeFormat}
                            onChange={handleChange}
                            fetchOptions={fetchGradeFormats}
                            required
                            transformOption={option => option.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                        />
                    </div>
                    <div>
                        <label>Passing Grade</label>
                        <input 
                            type="text"
                            name="passingGrade"
                            value={formData.passingGrade}
                            onChange={handleChange}
                            aria-label="Select grade needed to pass"
                        />
                    </div>
                    <div>
                        <Dropdown
                            label="Event Type"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            fetchOptions={fetchEventTypes}
                            required
                            transformOption={option => option.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                        />
                    </div>
                    <div>
                        <label>Justification</label>
                        <input 
                            type="text"
                            name="justification"
                            value={formData.justification}
                            onChange={handleChange}
                            aria-label="Enter work-related justification"
                            required
                        />
                        <span style={{color: 'red'}}>*</span>
                    </div>
                    <div>
                        <label>Work Hours to be Missed</label>
                        <input 
                            type="number"
                            name="hoursMissed"
                            value={formData.hoursMissed}
                            onChange={handleChange}
                            aria-label="Enter work hours that will be missed"
                        />
                    </div>
                </fieldset>
                <button className="form--button" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Next: Attachments'}
                </button>
            </form>

            {error && <p className="error">{ error }</p>}
        </section>
    )
}