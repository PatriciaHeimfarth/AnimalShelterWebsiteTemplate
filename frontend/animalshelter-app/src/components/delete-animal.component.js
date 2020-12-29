import React, { Component, Link } from 'react';
import axios from 'axios';

export default class AnimalDelete extends Component {

    componentDidMount() {
       
        var querystring = require('querystring');
        axios.post('http://localhost:4000/animals/delete',
         querystring.stringify({ "id": "5fddca72e544383930c54a35" }))
            .then(response => {                
                console.log("animal deleted")
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <h2>Hello Delete</h2>
        )
    }

}