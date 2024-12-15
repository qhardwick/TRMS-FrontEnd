import { Outlet } from "react-router-dom";
import NewFormRequest from "../components/NewRequestForm";


export default function Forms() {


    return(
        <section>
            <h1>Forms Page</h1>
            <Outlet />
        </section>
    )
}