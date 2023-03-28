import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png';

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className='item'>
      <img className='ui avatar image' src={user} alt='user' />
      <div className='content'>
        <Link to={`/contact/${id}`} state={{ name: name, email: email }}>
          <div className='header'>{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i className='trash alternate outline icon' style={{ color: 'red', marginTop: '7px' }} onClick={() => { props.clickHandler(id) }}></i>

      {/* <Link to={`/edit/${id}`} state={{ id: id, name: name, email: email }}>
        <i className='edit alternate outline icon' style={{ color: 'green' }} ></i>
      </Link> */}
    </div>
  );
};

export default ContactCard;