import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const ContactList = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getContacts();
  }, []);

  return (
    <div>
      <p>Contact List</p>
      <Link to = "/create"> 
        <button>Create new contact</button>
      </Link>
      {store.contacts.map((contact) => (
        <div>
          <p>Name: {contact.name}</p>
          <p>Phone: {contact.phone}</p>
          <p>Email: {contact.email}</p>
          <p>Address: {contact.address}</p>
        </div>
      ))}
    </div>
  );
};
