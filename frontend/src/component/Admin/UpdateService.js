import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateService,
  getServiceDetails,
} from "../../actions/serviceAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";
import "./animation.css"
import {UPDATE_SERVICE_RESET} from "../../constants/serviceConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateService = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {id} = useParams()
  const [navVisible, showNavbar] = useState(false);


  const { error, service } = useSelector((state) => state.serviceDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.service);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Complete",
    "Moderate",
    "Normal", 
];

  const serviceId = id;

  useEffect(() => {
    if (service && service._id !== serviceId) {
      dispatch(getServiceDetails(serviceId));
    } else {
      setName(service.name);
      setDescription(service.description);
      setPrice(service.price);
      setCategory(service.category);
      setStock(service.Stock);
      setOldImages(service.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("service Updated Successfully");
      navigate("/admin/services");
      dispatch({ type: UPDATE_SERVICE_RESET });
    }
  }, [
    dispatch,
    alert,
    navigate,
    error,
    isUpdated,
    serviceId,
    service,
    updateError,
  ]);

  const updateServiceSubmitHandler = (e) => {
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
    dispatch(updateService(serviceId, myForm));
  };

  const updateServiceImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Create Services" />
      <div className="dashboard">
      <div className={!navVisible ? "page" : "page page-with-navbar"}> <Sidebar visible={ navVisible } show={ showNavbar }/></div>

        <div className="newServiceContainer">
          <form
            className="createServiceForm"
            encType="multipart/form-data"
            onSubmit={updateServiceSubmitHandler}
          >
            <h1>Update Service</h1>

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
                value={price}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createServiceFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateServiceImagesChange}
                multiple
              />
            </div>

            <div id="createServiceFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Service Preview" />
                ))}
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

export default UpdateService;
