import { Link } from "react-router-dom";


export default function FormsDashboard() {


    return(
        <section>
            <h2>Forms Dashboard</h2>
            <ul style={{listStyle: "none"}}>
                <li><Link to="new">Create New Request</Link></li>
                <li><Link to="my-forms">My Forms</Link></li>
            </ul>
        </section>
    )
}