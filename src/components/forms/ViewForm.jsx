import { useDispatch, useSelector } from "react-redux";


export default function ViewForm() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const form = useSelector(state => state.forms.form);

    return(
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Form Id</th>
                        <th>Status</th>
                        <th>Urgent</th>
                        <th>Reason Denied</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Event Type</th>
                        <th>Grade Format</th>
                        <th>Passing Grade</th>
                        <th>Cost</th>
                        <th className="reimbursement">Projected Reimbursement</th>
                        <th>Excess Funds Approved</th>
                        <th>Work Hours to be Missed</th>
                        <th>Justification</th>
                        <th>Event Attachment</th>
                        <th>Supervisor Preapproval</th>
                        <th>Department Head Preapproval</th>
                        <th>Proof of Completion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={form.id}>
                        <td>{form.id}</td>
                        <td>{form.status}</td>
                        <td className={form.urgent ? "urgent" : ''}>{form.urgent ? "Yes" : "No"}</td>
                        <td>{form.reasonDenied}</td>
                        <td>{form.date}</td>
                        <td>{form.time}</td>
                        <td>{form.location}</td>
                        <td>{form.description}</td>
                        <td>{form.eventType}</td>
                        <td>{form.gradeFormat}</td>
                        <td>{form.passingGrade}</td>
                        <td className="cost">{form.cost}</td>
                        <td className="reimbursement">{form.reimbursement}</td>
                        <td>{form.excessFundsApproved ? "Yes" : "No"}</td>
                        <td>{form.hoursMissed}</td>
                        <td>{form.justification}</td>
                        <td>{form.attachment}</td>
                        <td>{form.supervisorAttachment}</td>
                        <td>{form.departmentHeadAttachment}</td>
                        <td>{form.completionAttachment}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}