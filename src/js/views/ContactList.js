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

  const chunkedContacts = (contacts, chunkSize) => {
    const result = [];
    for (let i = 0; i < contacts.length; i += chunkSize) {
      result.push(contacts.slice(i, i + chunkSize));
    }
    return result;
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-numeric characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Format the number as (xxx) xxx-xxxx
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <div className="m-3">
      <h3>CONTACT LIST</h3>
      <Link to="/create">
        <button className="btn btn-success rounded-pill ms-5 my-3 px-5 py-3">Create New Contact</button>
      </Link>
      {chunkedContacts(store.contacts, 4).map((contactRow, rowIndex) => (
        <div className="row" key={rowIndex}>
          {contactRow.map((contact, id) => (
            <div className="col-3 bg-white" key={id}>
              <div className="bg-light mt-2 p-2 rounded border border-secondary-subtle">
                <div className="bg-white rounded border border-secondary-subtle p-2">
                  <p>
                    <strong>NAME:</strong> {contact.name}
                  </p>
                  <p>
                    <strong>PHONE#:</strong> {formatPhoneNumber(contact.phone)}
                  </p>
                  <p>
                    <strong>ADDRESS:</strong> {contact.address}
                  </p>
                  <p>
                    <strong>EMAIL:</strong> {contact.email}
                  </p>
                </div>
                <div className="d-flex justify-content-end my-2">
                  <Link
                    className="btn btn-secondary px-3 py-2 me-2"
                    to={"/edit/" + contact.id}
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-primary px-2"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you would like to delete this contact?"
                        )
                      ) {
                        actions.deleteContact(contact.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
