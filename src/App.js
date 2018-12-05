import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ContactList from "./components/ContactList"

import axios from "axios";

class App extends Component {

  state = {
    contacts: []
  };

  componentDidMount(){
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        //array com os dados relevantes (id, nome e email)
        const  newContacts = response.data.map(c =>{
          return{
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone
          };
        });

        /* criando um novo "State" sem modificar o antigo,
         pois é importante não modificar o state original diretamente
        */ 
        const newState = Object.assign({}, this.state, {
          contacts: newContacts
        });

        //guardando o novo objeto state no do componente
        this.setState(newState);
      })
      .catch(error => console.log(error));


  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="app-title">
            Gerenciador de Contatos
          </h2>
          <p>
            Feito com React
          </p>
        </header>

        <ContactList contacts ={this.state.contacts} />

      </div>
    );
  }
}

export default App;
