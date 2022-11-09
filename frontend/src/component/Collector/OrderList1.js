import React, { Fragment, useEffect, useState} from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ServiceList.css";
import "./animation.css"
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar";
import {
  getAllOrderscollector,
  clearErrors,
} from "../../actions/orderActions";

const OrderList1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navVisible, showNavbar] = useState(false);

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.AllOrders1);



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }


    dispatch(getAllOrderscollector());
  }, [dispatch, alert, error, navigate]);


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    { field: "user", headerName: "User ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Collected"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/collector/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        user: item.user,

      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
      <div className={!navVisible ? "page" : "page page-with-navbar"}> <Sidebar visible={ navVisible } show={ showNavbar }/></div>
        <div className="ServiceListContainer">
          <h1 id="ServiceListHeading">ALL ORDERS</h1>

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

export default OrderList1;