import React, { Component } from 'react';
import {  Link } from "react-router-dom";
import axios from 'axios';
 

const Cat = props => (
    <tr>
        <td>{props.cat.Species}</td>
        <td>{props.cat.Name}</td>
        <td><img src={props.cat.Image} height="100"></img></td>
        <td>{props.cat.Description}</td>
        <td>{props.cat.Birthdate}</td>
        <td>{props.cat.IsEmergencyCase.toString() }</td>
        <td><Link to={"/details/"+props.cat._id}>Details</Link></td>
    </tr>
)

export default class CatList extends Component {
    constructor(props) {
        super(props);
        this.state = {cats: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/animals/')
            .then(response => {
                this.setState({ cats: response.data });
                console.table(this.cats);

            })
            .catch(function (error){
                console.log(error);
            })
    }

    catsList() {
        return this.state.cats.map(function(currentAnimal, i){
            if(currentAnimal.Species == "Cat"){
                if(currentAnimal.Image !== undefined){
                    currentAnimal.Image = (currentAnimal.Image).substring(18) ;
                    console.log(currentAnimal.Image);
                }
                return <Cat cat={currentAnimal} key={i} />;
            }
            
        })
    }

    render() {
        return (
            <div>
                <h3>Cat List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Species</th>  
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Birthdate</th>
                            <th>Emergency?</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.catsList() }
                    </tbody>
                </table>
            </div>
        )
    } 
}