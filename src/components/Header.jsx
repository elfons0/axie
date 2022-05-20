import React, {Component} from 'react';
import logo from '../logo.svg';


export default class Header extends Component {
    render(){
        return (
            <header className="App-header">
            
            <p>
             <img src={logo} className="App-logo" alt="logo" />
              <span>Edit <code>src/App.js</code> and save to reload.</span>
            </p>
           
          </header>
        )
    }
}

