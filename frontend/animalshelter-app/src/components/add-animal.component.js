import React, { Component } from 'react';
const axios = require("axios");


export default class AddAnimal extends Component {

    constructor(props) {
        super(props);

        this.onChangeAnimalName = this.onChangeAnimalName.bind(this);
        this.onChangeAnimalSpecies = this.onChangeAnimalSpecies.bind(this);
        this.onChangeAnimalImage = this.onChangeAnimalImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Species: '',
            Image: '',
        }
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

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Name", this.state.Name)
        formData.append("Species", this.state.Species)
        
        formData.append("Image", this.state.Image)
  
        axios.post('http://localhost:4000/animals/add', formData )
            .then(res => console.log(res.data));

        this.setState({
            Name: '',
            Species: '',
            Image: '',
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
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.Species}
                            onChange={this.onChangeAnimalSpecies}
                            required="true"
                        />
                    </div>
                    <div className="form-group">
                        <input type="file" name="Image"  required="true" onChange={this.onChangeAnimalImage} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add new Animal" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}