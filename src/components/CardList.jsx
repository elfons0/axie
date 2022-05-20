import React, {Component} from 'react';
import Select from 'react-select'
import Card from './Card';

import cards from "../data/cards.json"

const allitems={ value: 'all',  label: '(all)'  };

const bodyOptions = [
    allitems,
    { value: 'aqua',  label: 'aqua'  },
    { value: 'beast',  label: 'beast' },
    { value: 'bird', label: 'bird' },
    { value: 'bug', label: 'bug' },
    { value: 'plant',  label: 'plant'  },
    { value: 'reptile', label: 'reptile' }
  ];

  const partsOptions = [
    allitems,
    { value: 'back',  label: 'back'  },
    { value: 'horn',  label: 'horn' },
    { value: 'mouth', label: 'mouth' },
    { value: 'tail', label: 'tail' }
  ];

const energyOptions = [
    allitems,
    { value: '0',  label: '0'  },
    { value: '1',  label: '1' },
    { value: '2', label: '2' }
  ];

export default class CardList extends Component {

    state = { cardlist : [], selectedBody : allitems, selectedEnergy : allitems, selectedPart : allitems };
   
    handleChangeBody = (selectedBody) => {
        const {selectedEnergy, selectedPart} =  this.state
        this.setState({ selectedBody } );
        this.filter(selectedBody, selectedEnergy, selectedPart);
      };

      handleChangeEnergy = (selectedEnergy) => {
        const {selectedBody, selectedPart} =  this.state
        this.setState({ selectedEnergy } );
        this.filter(selectedBody, selectedEnergy, selectedPart);
      };

      handleChangePart = (selectedPart) => {
        const {selectedBody, selectedEnergy} =  this.state
        this.setState({ selectedPart } );
        this.filter(selectedBody, selectedEnergy, selectedPart);
      };   

    reset = () => {
      this.setState({cardlist: cards, selectedBody : allitems, selectedEnergy: allitems, selectedPart: allitems});  
    }

    filter = (selectedBody, selectedEnergy, selectedPart) => {

      let filteredList = cards

      if(selectedBody.value !== 'all'){
        filteredList = filteredList.filter((card) => card.id.includes(selectedBody.value));
      }
      if(selectedEnergy.value !== 'all'){
        filteredList = filteredList.filter((card) => Number(card.defaultEnergy) === Number(selectedEnergy.value));
      }
      if(selectedPart.value !== 'all'){
        filteredList = filteredList.filter((card) => card.id.includes(selectedPart.value));
      }

      this.setState({cardlist: filteredList});
    }

    componentDidMount() {
       this.reset()
    }

    render(){
      
        const { cardlist, selectedBody, selectedEnergy, selectedPart } = this.state;         

        return (
        <div>
            
            <h1> Card List </h1> 
            <div className='filter'>
              <div className='filterItem'>
                <label htmlFor='body'>Type</label>
                <Select
                    id='body'
                    className='select'
                    value={selectedBody}
                    onChange={this.handleChangeBody}
                    options={bodyOptions}
                />
              </div>
              <div className='filterItem'>
                <label htmlFor='energy'>Energy</label>
                <Select
                    id='energy'
                    className='select'
                    value={selectedEnergy}
                    onChange={this.handleChangeEnergy}
                    options={energyOptions}
                />
              </div>
              <div className='filterItem'>
                <label htmlFor='part'>Part</label>
                <Select
                    id='part'
                    className='select'
                    value={selectedPart}
                    onChange={this.handleChangePart}
                    options={partsOptions}
                />
              </div>
                <button className='button' onClick={this.reset}>reset</button>

            </div>
            <div>
            {
                cardlist.map(({id, partName, skillName, defaultEnergy, description}) => ( 
                  
                  <Card
                    key={id}
                    nature={id}
                    part={partName}
                    name={skillName}
                    energy={defaultEnergy}
                    description={description}
                  />  
                ))
            }
            </div>
        </div>
        
        );
      
    }

}