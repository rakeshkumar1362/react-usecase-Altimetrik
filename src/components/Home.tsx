import React, { useEffect, useState } from "react";
import "./home.css";
import CartInfo from "../components/CarInfo";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../app/store";
import { createCar, showCar } from "../slices/vehicleSlice";
import { vehicles, VehicleModel } from "../data/vehicle-list";
import { ThunkDispatch } from "@reduxjs/toolkit";

function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [formDisplayStatus, setFormDisplayStatus] = useState("");
  const [jsonDisplayStatus, setJsonDisplayStatus] = useState("jsonHidden");
  const [open, setOpen] = useState(false);
  const [carInfo, setCarInfo] = useState({});

  const getCarInfoFromForm = (e: any) => {
    setCarInfo({
      ...carInfo,
      model: selectedVehicle,
      [e.target.name]: e.target.value,
    });
    console.log(carInfo);
  };

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const allVehicle = useSelector<any>((state) => state.app.vehiclesData);

  const handleClose = (): void => {
    setOpen(false);
    setCarInfo({});
    setFormDisplayStatus("");
    setJsonDisplayStatus("jsonHidden");
  };

  const handleOpen = (vehicle: any): void => {
    setSelectedVehicle(vehicle.name);
    setOpen(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormDisplayStatus("formHide");
    setJsonDisplayStatus("jsonShow");
    console.log("updated info", carInfo);
    dispatch(createCar(carInfo));
  };

  useEffect(() => {
    dispatch(showCar());
  }, []);

  return (
    <div className="home-container">
      <div className="vehicle-box-container">
        {vehicles.map((vehicle: VehicleModel) => (
          <div
            className="vehicle-display-card"
            onClick={() => handleOpen(vehicle)}
          >
            <div className="card-content">
              <div className="logo-box">
                <img
                  src={`./img/${vehicle.id}.png`}
                  className="vehicle-img"
                ></img>
              </div>
              <div className="vehicle-name">{vehicle.name}</div>
            </div>
          </div>
        ))}

        <div className="vehicle-display-card see-more-tile">More</div>
      </div>

      <CartInfo isOpen={open} onClose={handleClose}>
        <div className={`form-input ${formDisplayStatus}`}>
          <h3 className="form-title">
            VEHICLE INFORMATION FORM: <span>{selectedVehicle}</span>
          </h3>
          <form className="vehicle-form" onSubmit={handleSubmit}>
            <input
              className="model-field"
              type="text"
              placeholder="Model"
              name="model"
              value={selectedVehicle + "-2024"}
              readOnly
            ></input>
            <input
              type="text"
              placeholder="Color"
              name="color"
              onChange={getCarInfoFromForm}
            ></input>
            <input
              type="text"
              placeholder="Year of Manufacture"
              name="yearOfManufacture"
              onChange={getCarInfoFromForm}
            ></input>
            <input
              type="text"
              placeholder="Insurance valid upto"
              name="insuranceValidity"
              onChange={getCarInfoFromForm}
            ></input>
            <input
              type="text"
              placeholder="Kms"
              name="kms"
              onChange={getCarInfoFromForm}
            ></input>
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={getCarInfoFromForm}
            ></input>
            <input
              type="text"
              placeholder="No. of Owners"
              name="noOfOwners"
              onChange={getCarInfoFromForm}
            ></input>
            <input
              type="text"
              placeholder="Transmission"
              name="transmission"
              onChange={getCarInfoFromForm}
            ></input>
            <input
              type="text"
              placeholder="External Fitments"
              name="externalFitments"
              onChange={getCarInfoFromForm}
            ></input>
            <input type="file"></input>
            <button type="submit" className="submit-btn">
              SUBMIT
            </button>
          </form>
        </div>
        <div className={`${jsonDisplayStatus}`}>
          {JSON.stringify(allVehicle, null, 2)}
        </div>
      </CartInfo>
    </div>
  );
}

export default Home;
