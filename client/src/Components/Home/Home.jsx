import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getRecipes}from '../../actions/index'

export default function Home (){
        const dispatch = useDispatch()
        const allRecipes = useSelector((state)=>state.recipes)

        useEffect(()=>{
                dispatch(getRecipes());
        },[])

        return (
                <div>
               Soy Home         
                </div>
        )
}