import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);
    const inputEl = useRef('');

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.contacts.map((contact, index) => {
        return (
            <ContactCard contact={contact} key={index} clickHandler={deleteContactHandler} />
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);

    };

    return (
        <div>
            <h2 style={{ marginTop: '50px' }}>
                Contact List
                <Link to='/add'>
                    <button className='ui button blue' style={{ marginLeft: '50px' }}>Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input type="text"
                        ref={inputEl}
                        placeholder="Search Contacts"
                        className='prompt'
                        value={props.vaule}
                        onChange={getSearchTerm} />
                    <i className='search icon'></i>
                </div>
            </div>
            <div className='ui celled list'>
                {renderContactList.length > 0 ? renderContactList : "No contacts available"}
            </div>
        </div>

    )
}

export default ContactList;