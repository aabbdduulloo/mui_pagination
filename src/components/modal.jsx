import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { nanoid } from "nanoid";

const UserModal = ({
  open,
  toggle,
  cars,
  setCars,
  currentCar,
  setCurrentCar,
}) => {
  const [form, setForm] = useState({
    id: nanoid(),
    name: "",
    year: "",
    color: "",
    price: "",
    brand: "",
  });

  useEffect(() => {
    if (currentCar) {
      setForm(currentCar);
    } else {
      setForm({
        id: nanoid(),
        name: "",
        year: "",
        color: "",
        price: "",
        brand: "",
      });
    }
  }, [currentCar]);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (currentCar) {
      setCars(cars.map(car => (car.id === form.id ? form : car)));
    } else {
      setCars([...cars, form]);
    }
    toggle();
    setCurrentCar(null);
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h1 className="text-center">{currentCar ? "Edit Car" : "Add Car"}</h1>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} id="submit">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="form-control my-2"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            className="form-control my-2"
            value={form.year}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Color"
            name="color"
            className="form-control my-2"
            value={form.color}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            className="form-control my-2"
            value={form.price}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Brand"
            name="brand"
            className="form-control my-2"
            value={form.brand}
            onChange={handleChange}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={toggle}>
          Cancel
        </button>
        <button className="btn btn-success" type="submit" form="submit">
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
