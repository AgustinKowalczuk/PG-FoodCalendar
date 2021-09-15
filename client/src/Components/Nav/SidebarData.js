import React from "react";

import * as AiIcons from "react-icons/ai";

import * as BsIcons from "react-icons/bs"

import * as BiIcons from "react-icons/bi"


export const SidebarData = [
    {
        title:'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Crear Receta',
        path: '/create/recipe',
        icon: <BsIcons.BsPencilSquare/>,
        cName:'nav-text'
    },
    {
        title:'Calendar',
        path: '/shop',
        icon: <AiIcons.AiOutlineCalendar/>,
        cName:'nav-text'
    },
    {
        title:'Registrar',
        path: '/acount/register',
        icon: <BsIcons.BsFillPeopleFill/>,
        cName:'nav-text'
    },
    {
        title:'Login',
        path: '/acount/login',
        icon: <AiIcons.AiOutlineLogin/>,
        cName:'nav-text'
    },
    {
        title:'Todas las Recetas',
        path: '/AllRecipe',
        icon: <BiIcons.BiBookHeart/>,
        cName:'nav-text'
    },

]