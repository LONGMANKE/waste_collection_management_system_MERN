import React, { Fragment, useEffect, useState } from "react";
import "./animation.css"
import "./newService.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createService } from "../../actions/serviceAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";
import { NEW_SERVICE_RESET } from "../../constants/serviceConstants";
import { useNavigate } from "react-router-dom";

const NewService = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const [navVisible, showNavbar] = useState(false);


  const { loading, error, success } = useSelector((state) => state.newService);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Complete",
    "Moderate",
    "Normal", 
];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Service Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_SERVICE_RESET });
    }
  }, [dispatch, alert,navigate, error, success]);

  const createServiceSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createService(myForm));
  };

  const createServiceImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Service" />
      <div className="dashboard">
      <div className={!navVisible ? "page" : "page page-with-navbar"}> <Sidebar visible={ navVisible } show={ showNavbar }/></div>


        <div className="newServiceContainer">
          <form
            className="createServiceForm"
            encType="multipart/form-data"
            onSubmit={createServiceSubmitHandler}
          >
            <h1>Create Service</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Service Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Service Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Slots"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createServiceFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createServiceImagesChange}
                multiple
              />
            </div>

            <div id="createServiceFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Service Preview" />
              ))}
            </div>

            <Button
              id="createServiceBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewService;