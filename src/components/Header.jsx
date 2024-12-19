import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../features/users/userSlice";


export default function Header() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const { currentUser, userList, loading, error } = useSelector(state => state.users)

    // Load users list on component mount:
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleChange = (e) => {
        const selectedUser = e.target.value;
        dispatch({ type: 'users/setUser', payload: selectedUser });
    }


    return(
        <header>
            <h2 className="header--title"><NavLink to="/" className="header--link">Tuition Reimbursement Management System</NavLink></h2>
            <ul>
                <li><NavLink to="/forms" className="header--link">User Control Panel</NavLink></li>
                <li><NavLink to="/forms" className="header--link">Forms</NavLink></li>
                <li><NavLink to="/messages" className="header--link">Messages</NavLink></li>
            </ul>
            <ol>
                <li>Current User:
                    {loading ? (
                        <p>Loading users...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : (
                        <select
                            value={currentUser || ""}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select User</option>
                            {userList.map((userItem) => (
                                <option key={userItem.username} value={userItem.username}>
                                    {userItem.username}
                                </option>
                            ))}
                        </select>
                    )}
                </li>
            </ol>
        </header>
    )
}