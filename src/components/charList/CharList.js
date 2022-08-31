import React, { Component } from 'react';
import { Fragment } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import MarverlError from '../error/MarvelError'

import './charList.scss';

class CharList extends Component{
    constructor(props){
        super(props);
        this.state ={
            item:[],
            loading: true,
        }
    }
   
    getNewState = (item) => {
        this.setState({
            item,
            loading: false,
            error: false,
        })
    }
    
    catchError = (error) => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    marvelService = new MarvelService()
    componentDidMount = () => {
        this.marvelService.getAllCharacters()
            .then(this.getNewState)
            .catch(this.catchError)
    }



    getAllCards = (item) => {
        const all = item.map(e =>{
           return(
                <li className="char__item"  key={e.id} onClick={() => this.props.stateLift(e.id)}>
                    <img src={e.img} alt="abyss"/>
                    <div className="char__name">{e.name}</div>
                </li>
           )
        })

        return (
            <>
                {all}
            </>
        )
    }

    render (){
        const {item, loading, error} = this.state
        const allItems = this.getAllCards(item)
        const load = loading? <Spinner /> : null
        const errors = error? <MarverlError/>: null
        return (
            <div className="char__list">
                <ul className="char__grid" >
                    {load}
                    {errors}
                    {allItems}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner" >load more</div>
                </button>
            </div>
        )
    }
 
}

export default CharList;