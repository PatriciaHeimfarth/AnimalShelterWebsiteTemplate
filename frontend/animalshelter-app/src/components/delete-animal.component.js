import React, { Component, Link } from 'react';
import axios from 'axios';

export default class AnimalDelete extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const id = this.props.match.params.id

        var querystring = require('querystring');
        axios.post('http://localhost:4000/animals/delete',
         querystring.stringify({ "id": id }))
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