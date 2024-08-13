import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export function CreateContact() {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
const navigate = useNavigate()

const handleSubmit = async() => {
    if (name.trim() == "" || phone.trim() == "" || email.trim() == "" || address.trim() == "") {
        alert("Please fill out all fields before submitting.")
    } else {
        let contactData = {
            name: name,
            phone: phone,
            email: email,
            address: address
        }
        let success = await actions.createContact(contactData)
        if(success) {
            alert("Contact successfully created!")
            navigate("/")
        } else {
            alert("An error occured.  Please try again later.")
        }
    }
}

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label for="name" className="form-label">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label for="phone" className="form-label">
          Phone#
        </label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          type="tel"
          className="form-control"
          id="phone"
        />
      </div>
      <div className="mb-3">
        <label className="form-label" for="address">
          Address
        </label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          type="address"
          className="form-control"
          id="address"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
