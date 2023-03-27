import React from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map((contact, index) => {
        return (
            <ContactCard contact={contact} key={index} clickHandler={deleteContactHandler} />
        );
    });

    return (
        <div>
            <h2 style={{ marginTop: '50px' }}>
                Contact List
                <Link to='/add'>
                <button className='ui button blue' style={{ marginLeft: '50px' }}>Add Contact</button>
                </Link>
            </h2>
            <div className='ui celled list'>
                {renderContactList}
            </div>
        </div>

    )
}

export default ContactList;