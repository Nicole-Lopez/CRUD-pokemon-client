import React from 'react'
import pokeballClose from "../assets/static/pokeballClose.png"
import '../assets/styles/components/RandomPokemon.scss'
import {useDispatch, useSelector} from 'react-redux'
import Card from './Card.jsx'

import {useState} from 'react';
import {randomPokemon,cleanRandom} from "../redux/actions/index"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import explosionEffect from "../assets/static/explosionEffect.gif"

export default function RandomPokemon({open,onClose}) {

 	const dispatch = useDispatch()
	const random = useSelector((state) => state.randomPokemon)
	const [lis,setLis] = useState(false);
	const [ball,setBall] = useState(true);
	const [rufus,setRufus] = useState(false);


    function handleRandom(){
        dispatch(randomPokemon())
        setBall(false)
        setRufus(true)
        

        setTimeout(() => {
        	setRufus(false)
        	
        }, 780)

        setTimeout(() => {
        	setLis(true)
        }, 500)
        
    }

    function close() {
    	onClose()
    	dispatch(cleanRandom())
    	setBall(true)
    	setLis(false)
    	setRufus(false)
    }

	if (!open) return null
	return (
		<div className='overlay'>
			<div className='popup_container'>
				<button className='close_btn' onClick={()=>close()}><FontAwesomeIcon icon={faSquareXmark} /></button>
				{ball?<button onClick={()=>handleRandom()} className='random_popup'><img src={pokeballClose} alt="pok"/></button>:null}

				{rufus?<img className='random_effect' src={explosionEffect} alt="lalala"/>:null}

				{lis?
					random.map(poke=>{
					return(
						<div className='random_result'>
					      <Card key={poke.id} name={poke.name} types={poke.types} image={poke.img} exp={poke.experience}/>
						</div>
					)
					}):null			
							
				}
			</div>
		</div>
	)
}