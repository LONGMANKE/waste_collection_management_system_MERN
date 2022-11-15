import React, { Fragment, useState } from "react";
import "./Location.css";
import { useSelector, useDispatch } from "react-redux";
import { saveLocationInfo } from "../../actions/cartActions";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const { locationInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(locationInfo.address);
  const [city, setCity] = useState(locationInfo.city); 
  const [state, setState] = useState(locationInfo.state);
  const [country, setCountry] = useState(locationInfo.country);
  const [pinCode, setPinCode] = useState(locationInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(locationInfo.phoneNo);
  const [ward, setward] = useState(locationInfo.ward);
  const [plotNo, setplotNo] = useState(locationInfo.plotNo);


  const locationSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) { 
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveLocationInfo({ address, city, state, country, pinCode, phoneNo, plotNo, ward})
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="location Details" />

      <CheckoutSteps activeStep={0} />

      <div className="locationContainer">
        <div className="locationBox">
          <h2 className="locationHeading">Location Details</h2>

          <form
            className="locationForm"
            encType="multipart/form-data"
            onSubmit={locationSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Postal Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <HomeWorkIcon />
              <input
                type="text"
                placeholder="Ward"
                required
                value={ward}
                onChange={(e) => setward(e.target.value)}
              />
            </div>
            <div>
              <HolidayVillageIcon />
              <input
                type="number"
                placeholder="PlotNo"
                required
                value={plotNo}
                onChange={(e) => setplotNo(e.target.value)}
              />
            </div>

           

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="locationBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Location;