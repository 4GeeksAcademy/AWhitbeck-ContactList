import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function CreateContact() {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    if (name.trim() === "" || phone.trim() === "" || email.trim() === "" || address.trim() === "") {
      alert("Please fill out all fields before submitting.");
    } else {
      let contactData = {
        name: name,
        phone: phone,
        email: email,
        address: address,
      };
      let success = await actions.createContact(contactData);
      if (success) {
        alert("Contact successfully created!");
        navigate("/"); // Redirect to the home page
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-3 col-4">
        <h3><strong>Create Contact</strong></h3>
        <label htmlFor="name" className="form-label">
          <strong>NAME:</strong>
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
          id="name"
          placeholder="Full Name"
        />
      </div>
      <div className="m-3 col-4">
        <label htmlFor="phone" className="form-label">
          <strong>PHONE#:</strong>
        </label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          type="tel"
          className="form-control"
          id="phone"
          placeholder="(xxx)xxx-xxxx"
        />
      </div>
      <div className="m-3 col-4">
        <label className="form-label" htmlFor="address">
          <strong>ADDRESS:</strong>
        </label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          type="text"
          className="form-control"
          id="address"
          placeholder="Street Address"
        />
      </div>
      <div className="m-3 col-4">
        <label htmlFor="email" className="form-label">
          <strong>EMAIL:</strong>
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
          id="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div className="justify-content-end d-flex col-4">
      <button type="submit" className="btn btn-primary px-3 p-1 ms-3">Confirm</button>
      <Link className="btn btn-secondary px-3 p-1 ms-3" to={"/"}>Cancel</Link>
      </div>
    </form>
  );
}