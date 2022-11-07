import { React, useEffect } from "react"
import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAdminService } from "../../../actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";




const List = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(getAdminService());
  }, [dispatch]);


   

      const rows = [];
  services &&
  services.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        img: item.images[0].url,
        price: item.price,
        name: item.name,
        method: "Cash on Delivery",
        status: "Active",
        rating: item.rating,

      });
    });

  return (
    <TableContainer component={Paper} className="table">
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
      <TableCell className="tableCell">Service ID</TableCell>
            <TableCell className="tableCell">Service Preview</TableCell>
            {/* <TableCell className="tableCell">Service Name</TableCell> */}
            <TableCell className="tableCell">Charges</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Available Services</TableCell>
            <TableCell className="tableCell">Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell className="tableCell"> {row.id}</TableCell>
          <TableCell className="tableCell">
          <div className="cellWrapper">
            <img src= {row.img} alt="" className="image" />
            {row.name}
  </div>
          </TableCell>
          {/* <TableCell className="tableCell">{row.name}</TableCell> */}
          <TableCell className="tableCell">{row.price}</TableCell>
          <TableCell className="tableCell">{row.method}</TableCell>
          <TableCell className="tableCell">{row.stock}</TableCell>
          <TableCell className="tableCell">
            <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  )

      }
export default List