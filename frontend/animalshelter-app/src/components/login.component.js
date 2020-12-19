import React, { Component } from 'react';

class loginComponent extends Component {
    render() {
        return (
            <div>
                <form  action="/login" method="post">
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" name="username" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Log In" className="form-control" />
                    </div>
                </form>
            </div>
        );
    }
}

export default loginComponent;