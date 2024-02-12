import React, { useEffect, useState } from "react";
import "./view.css";
import { useDispatch, useSelector } from "react-redux";
import { showCar } from "../slices/vehicleSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

function View() {
  const [filter, setfilter] = useState({});
  const [filteredResult, setFilteredResult] = useState(0);
  const [cars, setCars] = useState<String[]>([]);

  const filterResult = (e: any) => {
    setfilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    console.log(filter);
  };

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const vehiclesInStore = useSelector<any>((state) => state.app.vehiclesData);

  useEffect(() => {
    dispatch(showCar());
  }, []);

  const handleFilters = (e: any) => {
    e.preventDefault();
    console.log(vehiclesInStore);
  };

  const getCarFilter = (e: any) => {
    if (!cars.includes(e.target.value) && e.target.checked) {
      setCars((cars) => [...cars, e.target.value]);
    } else if (!e.target.checked) {
      const index = cars.indexOf(e.target.value);
      if (index > -1) {
        cars.splice(index, 1);
      }
    }
    console.log(cars);
    setfilter({
      ...filter,
      [e.target.name]: cars,
    });
    console.log("updated filter", filter);
  };

  return (
    <div>
      <div className="view-container">
        <div className="filter-section">
          <div className="filter-box">
            <h3>Filters</h3>
            <form className="filter-form" onSubmit={handleFilters}>
              <h4>Location</h4>
              <br />
              <select name="location" id="cars" onChange={filterResult}>
                <option value={"hyderabad"}>Hyderbad</option>
                <option value={"banglore"}>Banglore</option>
                <option value={"Goa"}>Goa</option>
                <option value={"Chennai"}>Chennai</option>
              </select>
              <br />
              <h4>Body Type</h4>
              <br />
              <input
                type="text"
                name="bodyType"
                id="bodyType"
                className="body-type"
                placeholder="Search.."
              ></input>
              <ul className="body-types" onChange={filterResult}>
                <li>
                  <a href="#" onChange={filterResult}>
                    Hatchpack
                  </a>
                </li>
                <li>
                  <a href="#" onChange={filterResult}>
                    Sedan
                  </a>
                </li>

                <li>
                  <a href="#" onChange={filterResult}>
                    SUV
                  </a>
                </li>
              </ul>
              <br />
              <h4>Brand</h4>
              <input
                type="checkbox"
                id="vehicle1"
                name="cars"
                value="Wagon R"
                onChange={getCarFilter}
              />
              <label> Wagon R</label>
              <br />
              <input
                type="checkbox"
                id="vehicle2"
                name="cars"
                value="Celerio"
                onChange={getCarFilter}
              />
              <label> Celerio</label>
              <br />
              <input
                type="checkbox"
                id="vehicle3"
                name="cars"
                value="Swift"
                onChange={getCarFilter}
              />
              <label> Swift</label>
              <br />
              <input
                type="checkbox"
                id="vehicle4"
                name="cars"
                value="Swift Dzire"
                onChange={getCarFilter}
              />
              <label> Swift Dzire</label>
              <br />
              <br />
              <h4>Owners</h4>
              <input
                type="radio"
                id="firstOwner"
                name="owner"
                value={1}
                onChange={filterResult}
              />
              <label>1st Owner</label>
              <br />
              <input
                type="radio"
                id="secondOwner"
                name="owner"
                value={2}
                onChange={filterResult}
              />
              <label>2nd Owner</label>
              <br />
              <input
                type="radio"
                id="thirdOwner"
                name="owner"
                value={3}
                onChange={filterResult}
              />
              <label>Third Owner</label>
              <br />
              <br />
              <h4>Budgets</h4>
              <div className="budget-container">
                <div
                  className="budget-value"
                  onClick={() =>
                    setfilter({
                      ...filter,
                      budget: "Less than 2L",
                    })
                  }
                >
                  Less than 2L
                </div>
                <div
                  className="budget-value"
                  onClick={() =>
                    setfilter({
                      ...filter,
                      budget: "2L-4L",
                    })
                  }
                >
                  2L - 4L
                </div>
                <div
                  className="budget-value"
                  onClick={() =>
                    setfilter({
                      ...filter,
                      budget: "4L-6L",
                    })
                  }
                >
                  4L - 6L
                </div>
                <div
                  className="budget-value"
                  onClick={() =>
                    setfilter({
                      ...filter,
                      budget: "More than 6L",
                    })
                  }
                >
                  More than 6L
                </div>
              </div>
              <br />
              <br />
              <h4>Fuel Types</h4>
              <input
                type="radio"
                id="petrol"
                name="fuel"
                value="petrol"
                onChange={filterResult}
              />
              <label>Petrol</label>
              <br />
              <input
                type="radio"
                id="diesel"
                name="fuel"
                value="diesel"
                onChange={filterResult}
              />
              <label>Diesel</label>
              <br />
              <input
                type="radio"
                id="cng"
                name="fuel"
                value="cng"
                onChange={filterResult}
              />
              <label>CNG</label>
              <br />
              <br />

              <h4>Transmission</h4>
              <input
                type="radio"
                id="automatic"
                name="transmission"
                value="automatic"
                onChange={filterResult}
              />
              <label>Automatic</label>
              <br />
              <input
                type="radio"
                id="manual"
                name="transmission"
                value="manual"
                onChange={filterResult}
              />
              <label>Manual</label>
              <br />
              <br />
              <button type="submit" className="filter-submit-btn">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
        <div className="filter-instruction">
          Find your vehicle based on your requirements. Use filter and get your
          personalised result. result will be shown after filteration of vehicle
          availabe in our store.
          <br />
          <br />
          <h4 className="filter-json-title">JSON (Filter Conditions)</h4>
          <br />
          <div className="filter-json">{JSON.stringify(filter, null, 2)}</div>
        </div>
        <div className="preview-section">
          <h3>Filtered result</h3>
        </div>
      </div>
    </div>
  );
}

export default View;
