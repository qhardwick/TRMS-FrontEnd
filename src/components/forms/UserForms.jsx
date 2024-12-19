import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { userForms } from "../../features/forms/formSlice";
import { current } from "@reduxjs/toolkit";


export default function UserForms() {

    // Define Redux global state handlers:
    const dispatch = useDispatch();
    const formsList = useSelector(state => state.forms.userForms);
    const username = useSelector(state => state.users.currentUser);

    const status = null;

    // Fetch all forms associated with a given user:
    useEffect(() => {
        if(username) {
            console.log("Current User:" + username);
            dispatch(userForms({username, "status": status}));
        }
        
    }, [dispatch, username, status]);

    return(
        <section>
            <h2>My Forms</h2>
            <ol>
                {
                    formsList.length === 0 ? <p>No forms avaialable.</p> :
                    formsList.map(form => <li key={form.id}>{form.id}</li>)
                }
            </ol>
        </section>
    )
}