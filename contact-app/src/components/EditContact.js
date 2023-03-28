import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Nav(props) {
    const navigation = useNavigate();
    const location = useLocation();
    return <EditContact {...props} navigation={navigation} location={location} />;
}

export class EditContact extends React.Component {
    constructor(props) {
        super(props)
        const { location } = this.props;
        console.log(location, " useLocation Hook");
        const { id, name, email } = props;
        console.log(props)
        this.state = {
            id,
            name,
            email
        }
    }

    update = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert('All this fields are mandatory!');
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({ name: '', email: '' });
    }

    render() {
        const { navigation } = this.props;
        const { location } = this.props;
        return (
            <div className='ui main'>
                <h2 style={{ marginTop: '60px' }}>Add Contact</h2>
                <form className='ui form' onSubmit={this.update}>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Name' onChange={(e) => this.setState({ name: e.target.value })} value={location}/>
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text' name='email' placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} value={location} />
                    </div>
                    <button className='ui button blue' onClick={() => { navigation(-1) }}>Add</button>
                </form>
            </div>
        )
    }
}