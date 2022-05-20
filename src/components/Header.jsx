import React, {Component} from 'react';
import logo from '../Axielogo.png';


export default class Header extends Component {
    render(){
        return (
            <header className="App-header">
            
            <p>
             <img src={logo} className="App-logo" alt="logo" />
            </p>
           
          </header>
        )
    }
}

