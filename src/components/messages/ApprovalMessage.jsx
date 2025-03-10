import { useDispatch, useSelector } from "react-redux";
import ReadOnlyForm from "../forms/ReadOnlyForm";
import { denyRequest, supervisorApproval } from "../../features/forms/formSlice";
import { useNavigate } from "react-router-dom";
import { getApprovalRequestsByUsername } from "../../features/messages/messageSlice";
import { useEffect, useRef, useState } from "react";


export default function ApprovalMessage() {

    // State handlers:
    const dispatch = useDispatch();
    const { form, loading, error } = useSelector(state => state.forms);
    const username = useSelector(state => state.users.currentUser);
    const [showDenialForm, setShowDenialForm] = useState(false);
    const [reason, setReason] = useState("");
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    // If the currentUser is not a BENCO or Department Head, they can grant approval as a Supervisor:
    const handleSupervisorApprove = async () => {
        let id = form.id;
        await dispatch(supervisorApproval({id, username})).unwrap();
        if(!error) {
            await dispatch(getApprovalRequestsByUsername(username)).unwrap();
        }
        navigate("/messages/approval-requests");
    }

    // Toggle the denial reason text area:
    const handleShowDenialForm = (event) => {
        event.preventDefault();
        setShowDenialForm(prevShowForm => !prevShowForm);
    }

    // If the textarea has been rendered, smoothly scroll into view:
    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [showDenialForm])

    // Assign form values to local state variables as user types:
    const handleChange = (event) => {
        setReason(event.target.value);
    }

    // Deny the user's request:
    const handleDenyRequest = async (event) => {
        event.preventDefault();
        const id = form.id;
        await dispatch(denyRequest({ id, approver: username, reason })).unwrap();
        if(!error) {
            await dispatch(getApprovalRequestsByUsername(username)).unwrap();
        }
        navigate("/messages/approval-requests");
    };

    // Request additional information about the request:
    const handleRequestMoreInfo = () => {};

    return(
        <section>
            <ReadOnlyForm />
            
            
            {showDenialForm ? 
                <form onSubmit={handleDenyRequest} ref={scrollRef}>
                    <label htmlFor="reasonDenied">Reason For Denying Request</label>
                    <textarea
                        name="reasonDenied"
                        value={reason}
                        onChange={handleChange}
                        aria-label="Enter reason you are denying request"
                        required
                    />
                    <div className="form--buttons--container">
                        <button className="form--button" type="submit">{loading ? 'Loading...' : 'Deny Request'}</button>
                        <button className="form--button" onClick={handleShowDenialForm}>{loading ? 'Loading...' : 'Cancel'}</button>
                    </div>
                </form>
                :
                <div className="form--fields--container">
                    <button className="form--button" onClick={handleSupervisorApprove} disabled={loading}>
                        {loading ? 'Loading...' : 'Approve Request'}
                    </button>
                    <button className="form--button" onClick={handleShowDenialForm} disabled={loading}>
                        {loading ? 'Loading...' : 'Request Clarification'}
                    </button>
                    <button className="form--button" onClick={handleShowDenialForm} disabled={loading}>
                        {loading ? 'Loading...' : 'Deny Request'}
                    </button>
                </div>
            }

            {error && <p className="error">{ error }</p>}
        </section>
    );
}