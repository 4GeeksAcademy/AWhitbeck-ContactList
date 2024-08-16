import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function EditContact() {
  const { store, actions } = useContext(Context);
  const params = useParams()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const contact = store.contacts.find((item) => item.id == params.theid)
    if (contact) {
        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.email);
        setAddress(contact.address);
    }
  }, [params.theid, store.contacts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        let response = await actions.editContact({
            name: name,
            phone: phone,
            address: address,
            email: email,
            id: params.theid
        })
        if(response == false) {
            alert("An error occured while editing contact.")
        } else {
            navigate("/")
        }
    } catch(error) {console.log(error)}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-3 col-4">
        <h3><strong>EDIT CONTACT</strong></h3>
        <label for="name" className="form-label">
        <strong>NAME:</strong>
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Full Name"
        />
      </div>
      <div className="m-3 col-4">
        <label for="phone" className="form-label">
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
        <label className="form-label col-auto" for="address">
        <strong>ADDRESS:</strong>
        </label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          type="address"
          className="form-control"
          id="address"
          placeholder="Street Name"
        />
      </div>
      <div className="m-3 col-4">
        <label for="email" className="form-label">
        <strong>EMAIL:</strong>
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="example@gmail.com"
        />
      </div>
      <button type="submit" className="btn btn-primary m-3 px-3">
        Submit
      </button>
      <Link className="btn btn-secondary px-3 p-1" to={"/"}>Cancel</Link>
    </form>
  );
}
