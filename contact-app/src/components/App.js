import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import api from '../api/contacts';
import { EditContact } from "./EditContact";

function App() {

  // const getLocalData = () => {
  //   let retriveContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   if (retriveContacts) {
  //     return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   } else {
  //     return [];
  //   }
  // };

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveContacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
    // setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? { ...response.data } : contact;
    }))
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== '') {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  // retrive local storage data
  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, [])

  // add data to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Header />
      <Router>
        <Routes>
          <Route path="/"
            exact
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />} />
          <Route path="/add"
            element={
              <AddContact
                addContactHandler={addContactHandler}
              />} />

          <Route path="/edit/:id"
            element={
              <EditContact
                updateContactHandler={updateContactHandler}
              />} />

          <Route path='/contact/:id' element={<ContactDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
