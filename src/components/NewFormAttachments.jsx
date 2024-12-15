import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"


export default function NewFormAttachments() {

    // Define our global application state properties and mutator:
    const { form } = useSelector(state => state.forms);
    const dispatch = useDispatch()

    // Define local state to handle changes to form to be dispatched:
    const [attachments, setAttachments] = useState({
        attachment: form?.attachment || "",
        supervisorAttachment: form?.supervisorAttachment || "",
        departmentHeadAttachment: form?.departmentHeadAttachment || ""
    });

    const handleChange = (event) => {
        setAttachments({...attachments, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateForm({...form, ...attachments}));
    }

    return(
        <form onSubmit={handleSubmit}>
            <p>Form ID: {form.id}</p>
            <fieldset>
                    <legend>Optional Attachments</legend>
                    <div>
                        <label>Event Attachment</label>
                        <input 
                            type="text"
                            name="attachment"
                            value={attachments.attachment}
                            onChange={handleChange}
                            aria-label="Enter attachment related to event"
                        />
                    </div>
                    <div>
                        <label>Supervisor Preapproval</label>
                        <input 
                            type="text"
                            name="supervisorAttachment"
                            value={attachments.supervisorAttachment}
                            onChange={handleChange}
                            aria-label="Enter supervisor preapproval attachment"
                        />
                    </div>
                    <div>
                        <label>Department Head Preapproval</label>
                        <input 
                            type="text"
                            name="departmentHeadAttachment"
                            value={attachments.departmentHeadAttachment}
                            onChange={handleChange}
                            aria-label="Enter department head preapproval attachment"
                        />
                    </div>
                </fieldset>
                <button type="submit">Send Request</button>
        </form>
    )
}