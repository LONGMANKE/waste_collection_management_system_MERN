import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
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
import SideBar from "./Sidebar";
import { DELETE_SERVICE_RESET } from "../../constants/serviceConstants";

const ServiceList = () => {
  const dispatch = useDispatch();
const navigate =useNavigate()
  const alert = useAlert();

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
      headerName: "Stock",
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

  return (
    <Fragment>
      <MetaData title={`ALL SERVICES - Admin`} />

      <div className="dashboard">
      <div className="Sidebar"> <SideBar/></div> 
        <div className="ServiceListContainer">
          <h1 id="ServiceListHeading">ALL SERVICES</h1>

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