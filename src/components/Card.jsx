import React, {Component} from 'react';

export default class Card extends Component {
    render(){
       const { nature, part, name, energy, description, skillName } = this.props

       const imgpath = "https://storage.googleapis.com/axie-cdn/game/cards/base/" + nature +".png"
       return (
           <div className='Card-div'>
                {part}
                <img src={imgpath} alt={skillName} className="card"/>

                <div className='card-energy'>{energy}</div>
                <div className='card-title'>{name}</div>

                <div className='card-description'>{description}</div>

               
           </div>
       )
    }

}