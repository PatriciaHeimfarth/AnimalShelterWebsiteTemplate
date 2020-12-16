import React, { Component } from 'react';

export default class AddAnimal extends Component {

    constructor(props) {
        super(props);

        this.onChangeAnimalName = this.onChangeAnimalName.bind(this);
        this.onChangeAnimalSpecies = this.onChangeAnimalSpecies.bind(this);
        this.onChangeAnimalImage = this.onChangeAnimalImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            animal_name: '',
            animal_species: '',
            animal_image: '',
        }
    }

    onChangeAnimalName(e) {
        this.setState({
            animal_name: e.target.value
        });
    }

    onChangeAnimalSpecies(e) {
        this.setState({
            animal_species: e.target.value
        });
    }

    onChangeAnimalImage(e) {
        this.setState({
            animal_image: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`${this.state.animal_name},  
        ${this.state.animal_species},
        ${this.state.animal_image}`);


        this.setState({
            animal_name: '',
            animal_species: '',
            animal_image: '',
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
                            value={this.state.animal_name}
                            onChange={this.onChangeAnimalName}
                            required="true"
                        />
                    </div>
                    <div className="form-group">
                        <label>Species: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.animal_specie}
                            onChange={this.onChangeAnimalSpecies}
                            required="true"
                        />
                    </div>
                    <div className="form-group">
                        <input type="file"  required="true" onChange={this.onChangeAnimalImage} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add new Animal" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}