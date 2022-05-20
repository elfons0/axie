import React, {Component} from 'react';
import Select from 'react-select'


import cards from "../data/cards.json"

const allitems={ value: 'all',  label: '(all)'  };

const options = [
    allitems,
    { value: 'aqua',  label: 'aqua'  },
    { value: 'beast',  label: 'beast' },
    { value: 'bird', label: 'bird' },
    { value: 'bug', label: 'bug' },
    { value: 'plant',  label: 'plant'  },
    { value: 'reptile', label: 'reptile' }
  ];

export default class FilterBar extends Component {

  state = {selectedBody : allitems };

  
  componentDidMount() {
    this.props.cardlist = cards
    this.setState({selectedBody : allitems});     
}


handleChange = (selectedBody) => {
  this.setState({ selectedBody } );
  this.filter(selectedBody);
};

filter = (selectedBody) => {
  if(selectedBody.value==='all'){
    this.reset();       
  }else{
    const filteredList = cards.filter((card) => card.id.includes(selectedBody.value));
    this.props.cardlist = filteredList
  }
}

render(){
      
  const { selectedBody } = this.state;         

  return (
    <div className='App'>
      <Select
          id='body'
          className='select'
          value={selectedBody}
          onChange={this.handleChange}
          options={options}
      />

      
  </div>   
  );

}

}