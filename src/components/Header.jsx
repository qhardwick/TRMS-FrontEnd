import { NavLink } from "react-router-dom";


export default function Header() {


    return(
        <header>
            <h2><NavLink to="/" className="header--link">Tuition Reimbursement Management System</NavLink></h2>
        </header>
    )
}