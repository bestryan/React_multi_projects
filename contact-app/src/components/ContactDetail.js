import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import user from '../images/user.jpg';

const ContactDetail = (props) => {
    const location = useLocation();
    // console.log(props, " props");
    // console.log(location, " useLocation Hook");
    const {name, email} = location.state;
    return (
        <div className='main' style={{ marginTop: '80px' }}>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt='user' />
                </div>
                <div className='content'>
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to='/'>
                <button className='ui center button blue'>Back to Contact List</button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;