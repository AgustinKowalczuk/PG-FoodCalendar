import React from 'react'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getRecipes}from '../../actions/index'
import Cards from '../Cards/Cards';

export default function Home (){       
        return (
                <div>
                  <Cards/>
                </div>
        )
}