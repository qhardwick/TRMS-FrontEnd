import { useDispatch, useSelector } from "react-redux";
import { AttachmentTypes } from "../../constants/AttachmentTypes";
import { setLoading } from "../../features/forms/formSlice";
import { getPresignedUrl } from "../../utils/getPresignedUrl";
import { useState } from "react";


export default function ReadOnlyForm() {

    // State handlers:
    const dispatch = useDispatch();
    const form = useSelector(state => state.forms.form);
    const [error, setError] = useState(null);

    // Open an attachment:
    const handleDownloadAttachment = async (event, attachmentType) => {
        event.preventDefault();
        const id = form.id;
        dispatch(setLoading(true));
        try {
            const url = await getPresignedUrl({id, attachmentType});
            window.open(url, '_blank');
            dispatch(setLoading(false));
        }
        catch (err) {
            dispatch(setLoading(false))
            setError(err);
        }
    }

    return(
        <form>
            <h2>Request: {form.id}</h2>
            <fieldset>
                <legend>Request Status Details</legend>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={form.status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="Urgent">Urgent</label>
                        <input
                            type="text"
                            name="urgent"
                            value={form.urgent ? "Yes" : "No"}
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                {form.status === "DENIED" ? 
                        <div className="form--fields--container">
                            <div className="form--field">
                                <label htmlFor="reasonDenied">Reason Denied</label>
                                <textarea 
                                    name="description"
                                    value={form.reasonDenied}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                    : null}
            </fieldset>
            <fieldset>
                <legend>Employee Details</legend>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text"
                            name="username"
                            value={form.username}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={form.email}
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="firstName">First name</label>
                        <input 
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="lastName">Last name</label>
                        <input 
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            disabled
                            readOnly
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>General Event Details</legend>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="time">Event Start Time</label>
                        <input 
                            className="time--date--field"
                            type="time"
                            name="time"
                            value={form.time}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="date">Event Start Date</label>
                        <input 
                            className="time--date--field"
                            type="date"
                            name="date"
                            value={form.date}
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div className="form--field">
                    <label htmlFor="location">Location</label>
                    <input 
                        type="text"
                        name="location"
                        value={form.location}
                        disabled
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="description">Brief description of the event</label>
                    <textarea
                        name="description"
                        value={form.description}
                        disabled
                        readOnly
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Work-related Details</legend>
                <div className="form--field">
                    <label htmlFor="eventType">Event Type</label>
                    <input
                        name="eventType"
                        value={form.eventType.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                        disabled
                        readOnly
                    />
                </div>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="gradeFormat">Grade Format</label>
                        <input
                            name="gradeFormat"
                            value={form.gradeFormat.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="passingGrade">Passing Grade</label>
                        <input 
                            type="text"
                            name="passingGrade"
                            value={form.passingGrade.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="cost">Cost</label>
                        <input 
                            type="number"
                            name="cost"
                            value={form.cost}
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="hoursMissed">Work Hours to be Missed</label>
                        <input 
                            type="number"
                            name="hoursMissed"
                            value={form.hoursMissed}
                            disabled
                            readOnly
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="justification">Justification</label>
                    <textarea 
                        name="justification"
                        value={form.justification}
                        disabled
                        readOnly
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Attachments</legend>
                <div>
                    <label htmlFor="attachment">Event Attachment</label>
                    <button onClick={() => handleDownloadAttachment(event, AttachmentTypes.EVENT)} className={`form--input--button ${form.attachment ? "active" : ""}`} name="attachment">
                        {form.attachment}
                    </button>
                </div>
                <div>
                    <label htmlFor="supervisorAttachment">Supervisor Pre-approval</label>
                    <button onClick={() => handleDownloadAttachment(event, AttachmentTypes.SUPERVISOR_APPROVAL)} className={`form--input--button ${form.supervisorAttachment ? "active" : ""}`} name="supervisorAttachment">
                        {form.supervisorAttachment}
                    </button>
                </div>
                <div>
                    <label htmlFor="departmentHeadAttachment">Department Head Pre-approval</label>
                    <button 
                        onClick={() => handleDownloadAttachment(event, AttachmentTypes.DEPARTMENT_HEAD_APPROVAL)} 
                        className={`form--input--button ${form.departmentHeadAttachment ? "active" : ""}`} 
                        name="departmentHeadAttachment">
                            {form.departmentHeadAttachment}
                    </button>
                </div>
                <div>
                    <label htmlFor="completionAttachment">Proof of Completion</label>
                    <input 
                        type="text"
                        name="completionAttachment"
                        value={form.completionAttachment}
                        disabled
                        readOnly
                    />
                </div>
            </fieldset>
        </form>
    )
}