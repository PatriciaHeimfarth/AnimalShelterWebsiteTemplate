import React, { Component } from 'react';
import axios from 'axios';
 

const Dog = props => (
    <tr>
        <td>{props.dog.Species}</td>
        <td>{props.dog.Name}</td>
        <td><img src={props.dog.Image} height="100"></img></td>
    </tr>
)

export default class DogList extends Component {
    constructor(props) {
        super(props);
        this.state = {dogs: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/animals/')
            .then(response => {
                this.setState({ dogs: response.data });
                console.table(this.dogs);

            })
            .catch(function (error){
                console.log(error);
            })
    }

    dogsList() {
        return this.state.dogs.map(function(currentAnimal, i){
            if(currentAnimal.Species == "Dog"){
                if(currentAnimal.Image !== undefined){
                    currentAnimal.Image = (currentAnimal.Image).substring(18) ;
                    console.log(currentAnimal.Image);
                }
                return <Dog dog={currentAnimal} key={i} />;
            }
            
        })
    }

    render() {
        return (
            <div>
                <h3>Dog List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Species</th>  
                            <th>Name</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.dogsList() }
                    </tbody>
                </table>
            </div>
        )
    } 
}