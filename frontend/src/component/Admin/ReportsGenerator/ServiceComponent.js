import { useEffect } from "react";
import {
  clearErrors,
  getAdminService,
} from "../../../actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const ServiceComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();
  
  
    const { error, services } = useSelector((state) => state.services);
  
  
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
  
      dispatch(getAdminService());
    }, [dispatch, navigate, error, alert]);

    const assignColorToTicketStatus = item => {
        if (item.status === "completed") {
          return "p-3 mb-2 bg-success text-white";
        } else if (item.status === "in_progress") {
          return "p-3 mb-2 bg-warning text-dark";
        } else if (item.status === "opened") {
          return "p-3 mb-2 bg-light text-dark";
        }
      };
  return (
    <div className="container">
    {tickets.length === 0 ? (
      "You currently have no tickets created"
    ) : (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Issue</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.request}</td>
              <td className={assignColorToTicketStatus(ticket)}>
                {ticket.status}
              </td>
              <td>
                <Link to={`/ticket/${ticket.id}`}>See comments</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  )
}

export default ServiceComponent