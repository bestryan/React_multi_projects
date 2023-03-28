import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav(props) {
    const navigation = useNavigate();
    return <AddContact {...props} navigation={navigation} />;
}

export class AddContact extends React.Component {
    state = {
        name: '',
        email: '',
    }

    add = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert('All this fields are mandatory!');
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({ name: '', email: '' });
    }

    render() {
        const { navigation } = this.props;
        return (
            <div className='ui main'>
                <h2 style={{ marginTop: '60px' }}>Add Contact</h2>
                <form className='ui form' onSubmit={this.add}>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Name' onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name} />
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text' name='email' placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                    </div>
                    <button className='ui button blue' onClick={()=>{navigation(-1)}}>Add</button>
                </form>
            </div>
        )
    }
}