import "./report.scss"
import { React, useEffect } from "react"
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { useSelector, useDispatch } from "react-redux";
import { getAdminService } from "../../../actions/serviceAction";
import { getAllOrders } from "../../../actions/orderActions";
import { getAllUsers } from "../../../actions/userAction.js";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; 
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";
import ll from "./1.png"



const ReportsCard = ({ type }) => {


  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.services);

  const { orders } = useSelector((state) => state.AllOrders);

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAdminService());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  let data;




  switch (type) {
    case "user":
      data = {
        title: "USERS REPORT",
        isMoney: false,
        counter: users && users.length,
        link: <Link onClick={() => generateReportForallUsers()} style={{
          color: "#870000"
        }}
        >Click to download</Link>,
        diff: users && users.length,
        icon: <PersonOutlineIcon className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }} />
      };
      break;
    case "orders":
      data = {
        title: "ORDERS REPORT",
        isMoney: false,
        link: <Link onClick={() => generateReportForallOrders()} style={{
          color: "#870000"
        }}
        >Click to download</Link>,
        counter: orders && orders.length,
        diff: orders && orders.length,
        icon: <AddShoppingCartIcon className="icon"
          style={{
            color: "orange",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
          }} />,
      };
      break;
    case "services":
      data = {
        title: "SERVICES REPORT",
        isMoney: false,
        counter: services && services.length,
        diff: services && services.length,
        link: <Link onClick={() => generateReportForallServices()} style={{
          color: "#870000"
        }}
        >Click to download</Link>,

        icon: <StoreMallDirectoryOutlinedIcon className="icon"
          style={{
            color: "green",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
          }} />,
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        counter: totalAmount,
        diff: totalAmount,
        link: <a href="https://dashboard.stripe.com/test/payments?status[0]=successful" style={{
          color: "#870000"
        }}
        >Click to download</a>,
        icon: <AccountBalanceWalletIcon className="icon"
          style={{
            color: "purple",
            backgroundColor: "rgba(128, 0, 128, 0.2)",
          }} />,
      };
      break;

    default:
      break;
  }

  const generateReportForallServices = () => {
    const doc = new jsPDF();


    // define the columns we want and their titles
    const tableColumn = ["Name", "Available", "Price", "Date"];
    // define an empty array of rows
    const tableRows = [];
    // for each services pass all its data into an array

    // called date-fns to format the date on the ticket


    // for each ticket pass all its data into an array
    services.forEach(item => {
      const itemData = [
        // item._id,
        item.name,
        item.Stock,
        item.price,
        // item.images[0].url,
        // called date-fns to format the date on the item
        format(new Date(item.createdAt), "yyyy-MM-dd")
      ];
      // push each tickcet's info into a row
      tableRows.push(itemData);
    });


    doc.autoTable(tableColumn, tableRows, { startY: 20, styles: { halign: 'left' }, headStyles: { fillColor: [0, 154, 23] } },);

    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    // ticket title. and margin-top + margin-left
    doc.text("Services provided by the company", 75, 15);

    var offsetY = 13.797777777777778; //var offsetY is for spacing
    var lineHeight = 7.49111111111111; //var lineHeight is for Spacing


    var img = new Image(); //this mount a variable to img
    img.src = ll //asign the src to the img variable
    doc.addImage(img, 'png', 100, doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY, 20, 20)// use the method doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY to be able to position the image of the signature below the table at a safe distance from it 
    doc.text(85, doc.autoTable.previous.finalY + lineHeight * 5 + offsetY, "Simon Mburu Njoroge") // later add the text below the signature
    doc.text(85, doc.autoTable.previous.finalY + lineHeight * 6 + offsetY, "Admin  Waste  CSM") //more text


    // we define the name of our PDF file.
    doc.save(`ServicesReport_${dateStr}.pdf`);





    //

  }

  const generateReportForallUsers = () => {
    const doc = new jsPDF();


    // define the columns we want and their titles
    const tableColumn = ["Email", "Role", "Name"];
    // define an empty array of rows
    const tableRows = [];
    // for each services pass all its data into an array

    // called date-fns to format the date on the ticket


    // for each ticket pass all its data into an array
    users.forEach(item => {
      const itemData = [
        // item._id,
        item.email,
        item.role,
        item.name,
        // called date-fns to format the date on the item
        // format(new Date(item.createdAt), "yyyy-MM-dd")
      ];
      // push each tickcet's info into a row
      tableRows.push(itemData);
    });


    doc.autoTable(tableColumn, tableRows, { startY: 20, styles: { halign: 'left' }, headStyles: { fillColor: [0, 154, 23] } },);
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    // ticket title. and margin-top + margin-left
    doc.text("Authorised users in the system", 75, 15);

    var offsetY = 13.797777777777778; //var offsetY is for spacing
    var lineHeight = 7.49111111111111; //var lineHeight is for Spacing

    var img = new Image(); //this mount a variable to img
    img.src = ll //asign the src to the img variable
    doc.addImage(img, 'png', 100, doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY, 20, 20)// use the method doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY to be able to position the image of the signature below the table at a safe distance from it 
    doc.text(85, doc.autoTable.previous.finalY + lineHeight * 5 + offsetY, "Simon Mburu Njoroge") // later add the text below the signature
    doc.text(85, doc.autoTable.previous.finalY + lineHeight * 6 + offsetY, "Admin  Waste  CSM") //more text


    // we define the name of our PDF file.
    doc.save(`UsersReport_${dateStr}.pdf`);



    //

  }

  const generateReportForallOrders = () => {
    const doc = new jsPDF();


    // define the columns we want and their titles
    const tableColumn = ["Order ID", "Status", "No of Service requested", "Price paid"];
    // define an empty array of rows
    const tableRows = [];
    // for each services pass all its data into an array

    // called date-fns to format the date on the ticket


    // for each ticket pass all its data into an array
    orders.forEach(item => {
      const itemData = [
        item._id,
        item.orderStatus,
        item.orderItems.length,
        item.totalPrice,
        // called date-fns to format the date on the item
        // format(new Date(item.createdAt), "yyyy-MM-dd")
      ];
      // push each tickcet's info into a row
      tableRows.push(itemData);
    });


    doc.autoTable(tableColumn, tableRows, { startY: 20, styles: { halign: 'center' }, headStyles: { fillColor: [0, 154, 23] } },);

    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    // ticket title. and margin-top + margin-left
    doc.text("Collection Orders by customers", 75, 15);

    var offsetY = 13.797777777777778; //var offsetY is for spacing
    var lineHeight = 7.49111111111111; //var lineHeight is for Spacing


    var img = new Image(); //this mount a variable to img
    img.src = ll //asign the src to the img variable
    doc.addImage(img, 'png', 100, doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY, 20, 20)// use the method doc.autoTable.previous.finalY + lineHeight * 1.5 + offsetY to be able to position the image of the signature below the table at a safe distance from it 
    doc.text(85, doc.autoTable.previous.finalY + lineHeight * 5 + offsetY, "Simon Mburu Njoroge") // later add the text below the signature
    doc.text(85, doc.autoTable.previous.finalY + lineHeight * 6 + offsetY, "Admin  Waste  CSM") //more text


    // we define the name of our PDF file.
    doc.save(`OrdersReport_${dateStr}.pdf`);


    //

  }


  return (
    <div className="widget1">
      <div className="left1">
        <div className="title1">{data.title}</div>
        {/* <div className="counter">{data.isMoney && ""}{data.counter} </div> */}
        <div className="link1" >{data.link}</div>


      </div>
      <div className="right1">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.diff}
        </div> */}
        {data.icon}

      </div>
    </div>
  )
}

export default ReportsCard