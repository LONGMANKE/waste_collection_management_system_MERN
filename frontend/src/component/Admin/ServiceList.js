import React, { Fragment, useEffect, useState} from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./animation.css"
import "./ServiceList.css"; 
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminService,
  deleteService,
} from "../../actions/serviceAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import "./animation.css"
import { DELETE_SERVICE_RESET } from "../../constants/serviceConstants";
// import ServiceReport from "./ReportsGenerator/ServiceReport";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// // Date Fns is used to format the dates we receive
// // from our API call
// import { format } from "date-fns";

const ServiceList = () => {
  const dispatch = useDispatch();
const navigate =useNavigate()
  const alert = useAlert();
  const [navVisible, showNavbar] = useState(false);
  // const a = ServiceReport()

  // const handleClick = (e) => {
  //   e.preventDefault( a);
   
  // }

  const { error, services } = useSelector((state) => state.services);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.service
  );

  const deleteServiceHandler = (id) => {
    dispatch(deleteService(id));
  };
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Service Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_SERVICE_RESET });
    }
   
  
    dispatch(getAdminService());
  }, [dispatch, navigate , error,alert, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Service ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Available",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number", 
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/service/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteServiceHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  
  services &&
  services.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });


   

// const generateReportForallUsers = () =>{
//   const doc = new jsPDF();


//   // define the columns we want and their titles
//   const tableColumn = ["Service ID", "Name", "Available", "Price", "Date"];
//   // define an empty array of rows
//   const tableRows = []; 
//   // for each services pass all its data into an array
  
//   // called date-fns to format the date on the ticket
 

//   // for each ticket pass all its data into an array
//   services.forEach(item => {
//     const itemData = [
//       item._id,
//       item.name,
//       item.Stock,
//       item.price,
//       // called date-fns to format the date on the item
//       format(new Date(item.createdAt), "yyyy-MM-dd")
//     ];
//     // push each tickcet's info into a row
//     tableRows.push(itemData);
//   });
 

//   doc.autoTable(tableColumn, tableRows, { startY: 20 });
//   const date = Date().split(" ");
//   // we use a date string to generate our filename.
//   const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
//   // ticket title. and margin-top + margin-left
//   doc.text("The services being offered", 14, 15);
//   // we define the name of our PDF file.
//   doc.save(`report_${dateStr}.pdf`);



//   //

// }

// const filterprice = services.filter(item =>  item.price === "200");  

    // const filterprice = services.filter(item => item.price === 200);


  return (
    <Fragment>
      <MetaData title={`ALL SERVICES - Admin`} />
    

      <div className="dashboard">
      <div className={!navVisible ? "page" : "page page-with-navbar"}> <Sidebar visible={ navVisible } show={ showNavbar }/></div>
        <div className="ServiceListContainer">
          <h1 id="ServiceListHeading">ALL SERVICES</h1>
          {/* <button
              className="btn1"
              onClick={() =>generateReportForallUsers()}
            >
              Get Report for <br/>Services Available.
            </button> */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="ServiceListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ServiceList;