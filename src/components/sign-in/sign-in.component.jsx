import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from './../../firebase/firebase.utils';

import './sign-in.styles.scss';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (e) {
            console.log(e);
        }
        this.setState({ email: '', password: '' });
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with youe email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput value={this.state.email} name="email" label="Email" type="email" handleChange={this.handleChange} required />

                    <FormInput value={this.state.password} name="password" label="Password" type="password" handleChange={this.handleChange} required />

                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>google Signin</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
