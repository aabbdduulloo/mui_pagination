import React, { useState } from "react";
import "./cars.css";
import UserModal from "../modal";
import { NavLink } from "react-router-dom";
import { nanoid } from "nanoid";

const Cars = () => {
  const [cars, setCars] = useState([
    {
      id: nanoid(),
      name: "cls banan",
      price: "1 000 000$",
      color: "black",
      year: "2024",
      brand: "Mercedes Benz",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [search, setSearch] = useState("");

  const handleDelete = id => {
    setCars(cars.filter(car => car.id !== id));
    alert("Car deleted successfully!");
  };

  const handleEdit = car => {
    setCurrentCar(car);
    setModal(true);
  };

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <UserModal
        open={modal}
        toggle={() => setModal(false)}
        cars={cars}
        setCars={setCars}
        currentCar={currentCar}
        setCurrentCar={setCurrentCar}
      />
      <div className="container ">
        <div className="row mt-4">
          <div className="col-md-10 offset-md-1">
            <div className="row">
              <div className="col-4">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setCurrentCar(null);
                    setModal(true);
                  }}
                >
                  Add Car
                </button>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-10 offset-md-1">
            {filteredCars.length > 0 ? (
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th>T/R</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.year}</td>
                      <td>{item.color}</td>
                      <td>{item.price}</td>
                      <td>{item.brand}</td>
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <button
                            className="btn btn-success"
                            onClick={() => handleEdit(item)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <NavLink
                            to={`/main/single-car/${item.id}`}
                            className="btn btn-primary"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-warning">
                No cars found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
