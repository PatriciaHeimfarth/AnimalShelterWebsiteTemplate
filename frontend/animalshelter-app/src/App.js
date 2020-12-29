import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Components
import Main from "./components/main.component";
import DogList from "./components/doglist.component";
import CatList from "./components/catlist.component";
import AddAnimal from "./components/add-animal.component";
import AnimalDetails from "./components/animal-details.component";
import AnimalDelete from "./components/delete-animal.component";
import Login from "./components/login";
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';


//Styles
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
              <a class="navbar-brand" href="/">Animalshelter</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                  <li class="nav-item">
                    <a class="nav-link" href="/dogs">Our Dogs</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/cats">Our Cats</a>
                  </li>
                </ul>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                  <button class="btn btn-outline-success" type="submit">Suche</button>
                </form>
              </div>
            </div>
          </nav>
          <br />
          <br />
          <br />
          <Switch>       
              <div>      
                <Route path="/dogs" component={DogList} />
                <Route path="/cats" component={CatList} />
                <Route path="/" exact component={Main} />
                <PrivateRoute path="/add-animal" exact component={AddAnimal} />
                <Route path="/login" exact component={Login} />
                <Route path="/details/:id" component={AnimalDetails} />
                <Route path="/delete" component={AnimalDelete} />
              </div>
  
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;