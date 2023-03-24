import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const renderContactList = props.contacts.map((contact, index) => {
        return (
            <ContactCard contact={contact} key={index}/>
        );
    });

    return (
        <div className='ui celled list'>
            {renderContactList}
        </div>
    )
}

export default ContactList;