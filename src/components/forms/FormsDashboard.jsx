import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setStatus } from "../../features/forms/formSlice";


export default function FormsDashboard() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const status = useSelector(state => state.forms.status);

    // Update status when user clicks a link:
    const handleClick = (statusValue) => {
        dispatch(setStatus(statusValue));
    };


    return(
        <section>
            <h2>Forms Dashboard</h2>
            <ul style={{listStyle: "none"}}>
                <li><Link to="new">Create New Request</Link></li>
            </ul>
            <table>
                <thead >
                    <tr >
                        <th>My Forms</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Link to="table" onClick={() => handleClick(null)}>All Forms</Link></td>
                    </tr>
                    <tr>
                        <td><Link to="table" onClick={() => handleClick("CREATED")}>Drafts (Unsubmitted)</Link></td>
                    </tr>
                    {/* For the Link below we will either need to create a new api method or filter results on the front end */}
                    <tr>
                        <td><Link to="table" onClick={() => handleClick(null)}>Active</Link></td>
                    </tr>
                    <tr>
                        <td><Link to="table" onClick={() => handleClick("APPROVED")}>Approved</Link></td>
                    </tr>
                    <tr>
                        <td><Link to="table" onClick={() => handleClick("DENIED")}>Denied</Link></td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}