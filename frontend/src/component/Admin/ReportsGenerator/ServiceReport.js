import { useEffect } from "react";
import {
  clearErrors,
  getAdminService,
} from "../../../actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

const ServiceReport = () => {

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
  // initialize jsPDF
  const doc = new jsPDF();


  // define the columns we want and their titles
  const tableColumn = ["Service ID", "Name", "Available", "Price", "Date"];
  // define an empty array of rows
  const tableRows = [];
  // for each services pass all its data into an array
  
  // called date-fns to format the date on the ticket
 

  // for each ticket pass all its data into an array
  services.forEach(item => {
    const itemData = [
      item._id,
      item.name,
      item.Stock,
      item.price,
      // called date-fns to format the date on the item
      format(new Date(item.createdAt), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(itemData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("The services being offered", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);



  //

}

export default ServiceReport