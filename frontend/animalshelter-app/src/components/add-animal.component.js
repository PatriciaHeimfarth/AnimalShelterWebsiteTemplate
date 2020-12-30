import React, { Component } from 'react';
import { Link } from "react-router-dom";

const axios = require("axios");
const Animal = props => (
    <tr>
        <td>{props.animal.Species}</td>
        <td>{props.animal.Name}</td>
        <td><img src={props.animal.Image} height="100"></img></td>
        <td>{props.animal.Description}</td>
        <td>{props.animal.Birthdate}</td>
        <td>{props.animal.IsEmergencyCase.toString()}</td>
        <td><Link to={"/details/" + props.animal._id}>Details</Link></td>
        <td><Link to={`/delete/${props.animal._id}` }>Löschen</Link></td>
    </tr>
)

export default class AddAnimal extends Component {

    constructor(props) {
        super(props);

        this.onChangeAnimalName = this.onChangeAnimalName.bind(this);
        this.onChangeAnimalSpecies = this.onChangeAnimalSpecies.bind(this);
        this.onChangeAnimalImage = this.onChangeAnimalImage.bind(this);
        this.onChangeAnimalDescription = this.onChangeAnimalDescription.bind(this);
        this.onChangeAnimalBirthdate = this.onChangeAnimalBirthdate.bind(this);
        this.onChangeAnimalIsEmergencyCase = this.onChangeAnimalIsEmergencyCase.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Species: 'Dog',
            Image: '',
            Description: '',
            Birthdate: '',
            IsEmergencyCase: true,
            animals: []
        }
    }

    
    componentDidMount() {
        axios.get('http://localhost:4000/animals/')
            .then(response => {
                this.setState({ animals: response.data });
                console.table(this.animals);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    animalsList() {
        return this.state.animals.map(function (currentAnimal, i) {

                if (currentAnimal.Image !== undefined) {
                    currentAnimal.Image = (currentAnimal.Image).substring(18);
                    console.log(currentAnimal.Image);
                }
                return <Animal animal={currentAnimal} key={i} />;


        })
    }


    onChangeAnimalName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onChangeAnimalSpecies(e) {
        this.setState({
            Species: e.target.value
        });
    }

    onChangeAnimalImage(e) {
        this.setState({
            Image: e.target.files[0]
        });
    }

    onChangeAnimalDescription(e) {
        this.setState({
            Description: e.target.value
        });
    }

    onChangeAnimalBirthdate(e) {
        this.setState({
            Birthdate: e.target.value
        });
    }

    onChangeAnimalIsEmergencyCase(e) {
        const target = e.target;
        const value = target.checked;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Name", this.state.Name)
        formData.append("Species", this.state.Species)
        formData.append("Description", this.state.Description)
        formData.append("Image", this.state.Image)
        formData.append("Birthdate", this.state.Birthdate)
        formData.append("IsEmergencyCase", this.state.IsEmergencyCase)

        axios.post('http://localhost:4000/animals/add', formData)
            .then(res => console.log(res.data));

        this.setState({
            Name: '',
            Species: '',
            Image: '',
            Description: '',
            Birthdate: '',        
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add new Animal</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Name}
                            onChange={this.onChangeAnimalName}
                            required="true"
                        />
                    </div>
                    <div className="form-group">
                        <label>Species: </label>
                        <select className="form-control" required="true" value={this.state.Species}
                            onChange={this.onChangeAnimalSpecies}>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Description}
                            onChange={this.onChangeAnimalDescription}
                            required="true"
                        />
                    </div>
                    <div className="form-group">
                        <label>Birthdate: </label>
                        <input type="date"
                            className="form-control"
                            value={this.state.Birthdate}
                            onChange={this.onChangeAnimalBirthdate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Is Emergency Case: </label>
                        <br></br>
                        <input type="checkbox"
                            name="IsEmergencyCase" 
                            checked={this.state.IsEmergencyCase }
                            onChange={this.onChangeAnimalIsEmergencyCase}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <br></br>
                        <input type="file" name="Image" required="true" onChange={this.onChangeAnimalImage} />
                    </div>
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Add new Animal" className="btn btn-primary" />
                    </div>
                </form>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <hr></hr>
               
                <h3>Animal List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Species</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Birthdate</th>
                            <th>Emergency?</th>
                            <th>Details</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.animalsList()}
                    </tbody>
                </table>

            </div>
        )
    }
}