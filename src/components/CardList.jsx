import React, {Component} from 'react';
import Select from 'react-select'
import Card from './Card';

import cards from "../data/origincards.json"

const allitems={ value: 'all',  label: '(all)'  };
const noSort = { value: "none", label : "(none)"};

const bodyOptions = [
    allitems,
    { value: 'aqua',  label: 'Aqua'  },
    { value: 'beast',  label: 'Beast' },
    { value: 'bird', label: 'Bird' },
    { value: 'bug', label: 'Bug' },
    { value: 'plant',  label: 'Plant'  },
    { value: 'reptile', label: 'Reptile' }
  ];

  const partsOptions = [
    allitems,
    { value: 'back',  label: 'Back'  },
    { value: 'horn',  label: 'Horn' },
    { value: 'mouth', label: 'Mouth' },
    { value: 'tail', label: 'Tail' },
    { value: 'ears', label: 'Ears' },
    { value: 'eyes', label: 'Eyes' }
  ];

const energyOptions = [
    allitems,
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' }
  ];

  const attackOptions = [
    allitems,
    { value: 'Melee', label: 'Melee' },
    { value: 'Ranged', label: 'Ranged' }
  ];

  const sortOptions = [
    noSort,
    { value: 'attack', label: 'By Attack' },
    { value: 'defense', label: 'By Defense' },
    { value: 'healing', label: 'By Healing' }
  ];


export default class CardList extends Component {

    state = { cardlist : [], 
      selectedBody : allitems, 
      selectedEnergy : allitems, 
      selectedPart : allitems,
      selectedAttack : allitems,
      selectedSort: noSort };
   
    handleChangeBody = (selectedBody) => {
        const {selectedEnergy, selectedPart, selectedAttack, selectedSort} =  this.state
        this.setState({ selectedBody } );
        this.filter(selectedBody, selectedEnergy, selectedPart, selectedAttack, selectedSort);
      };

      handleChangeEnergy = (selectedEnergy) => {
        const {selectedBody, selectedPart, selectedAttack, selectedSort} =  this.state
        this.setState({ selectedEnergy } );
        this.filter(selectedBody, selectedEnergy, selectedPart, selectedAttack, selectedSort);
      };

      handleChangePart = (selectedPart) => {
        const {selectedBody, selectedEnergy, selectedAttack, selectedSort} =  this.state
        this.setState({ selectedPart } );
        this.filter(selectedBody, selectedEnergy, selectedPart, selectedAttack, selectedSort);
      };   

      handleChangeAttack = (selectedAttack) => {
        const {selectedBody, selectedEnergy, selectedPart, selectedSort} =  this.state
        this.setState({ selectedAttack } );
        this.filter(selectedBody, selectedEnergy, selectedPart, selectedAttack, selectedSort);
      }; 

      handleChangeSort = (selectedSort) => {
        const {selectedBody, selectedEnergy, selectedPart, selectedAttack} =  this.state
        this.setState({ selectedSort } );
        this.filter(selectedBody, selectedEnergy, selectedPart, selectedAttack, selectedSort);
      }; 

    reset = () => {
      this.setState({cardlist: cards, 
        selectedBody : allitems, 
        selectedEnergy: allitems,
        selectedPart: allitems,
        selectedAttack : allitems,
        selectedSort: noSort
      });  
    }

    filter = (selectedBody, selectedEnergy, selectedPart, selectedAttack, selectedSort) => {

      let filteredList = cards

      if(selectedBody.value !== 'all'){
        filteredList = filteredList.filter((card) => card.cardId.includes(selectedBody.value));
      }
      if(selectedEnergy.value !== 'all'){
        filteredList = filteredList.filter((card) => Number(card.defaultEnergy) === Number(selectedEnergy.value));
      }
      if(selectedPart.value !== 'all'){
        filteredList = filteredList.filter((card) => card.type === selectedPart.value);
      }
      if(selectedAttack.value !== 'all'){
        filteredList = filteredList.filter((card) => card.abilityType.includes(selectedAttack.value));
      }

      switch (selectedSort.value) {
        case "attack":
          filteredList = filteredList.sort((a, b) => a.defaultAttack < b.defaultAttack ? 1:-1);
          break;
         case "defense":          
          filteredList = filteredList.sort((a, b) => a.defaultDefense < b.defaultDefense ? 1:-1);
          break;
        case "healing":          
          filteredList = filteredList.sort((a, b) => a.healing < b.healing ? 1:-1);
          break;
        default:
          break;
      }

      
      this.setState({cardlist: filteredList});
    }

    componentDidMount() {
       this.reset()
    }

    render(){
      
        const { cardlist, selectedBody, selectedEnergy, selectedPart, selectedAttack, selectedSort } = this.state;         

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
                <label htmlFor='part'>Part</label>
                <Select
                    id='part'
                    className='select'
                    value={selectedPart}
                    onChange={this.handleChangePart}
                    options={partsOptions}
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
                <label htmlFor='attack'>Attack</label>
                <Select
                    id='attack'
                    className='select'
                    value={selectedAttack}
                    onChange={this.handleChangeAttack}
                    options={attackOptions}
                />
              </div>
              <div className='filterItem'>
                <label htmlFor='sort'>Sort</label>
                <Select
                    id='sort'
                    className='select'
                    value={selectedSort}
                    onChange={this.handleChangeSort}
                    options={sortOptions}
                />
              </div>
                <button className='button' onClick={this.reset}>reset</button>

            </div>
            <div>
            {
                cardlist.map(({cardId, name, description, cardImage}) => ( 
                  
                  <Card
                    key={cardId}
                    name={name}
                    description={description}
                    cardImage={cardImage}
                  />  
                ))
            }
            </div>
        </div>
        
        );
      
    }

}