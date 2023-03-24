import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {


  const getLocalData = () => {
    let retriveContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (retriveContacts) {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    } else {
      return [];
    }
  }
  
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(getLocalData());

  const addContactHandler = (contact) => {
    setContacts([...contacts, contact]);
  };

  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  // useEffect(() => {
  //   const retriveContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   if (retriveContacts) {
  //     setContacts(JSON.parse(retriveContacts));
  //   }
  // }, []);

// add data to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);


  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;
