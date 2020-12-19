import React, { Component } from 'react';
const axios = require("axios");

class loginComponent extends Component {


    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeName(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", this.state.username)
        formData.append("password", this.state.password)


        axios.post('http://localhost:4000/login', formData)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" onChange={this.onChangeName} required="true" value={this.state.username} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" onChange={this.onChangePassword} required="true" value={this.state.password} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Log In" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default loginComponent;