import React from "react";

import * as AiIcons from "react-icons/ai";

import * as BsIcons from "react-icons/bs"

import * as BiIcons from "react-icons/bi"

import * as IoIcons from "react-icons/io5"




export const SidebarDataNotUser = [
    {
        title:'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Todas las Recetas',
        path: '/AllRecipe',
        icon: <BiIcons.BiBookHeart/>,
        cName:'nav-text'
    },
    {
        title:'Crea tu calendario',
        path: '/shop',
        icon: <IoIcons.IoCreateOutline/>,
        cName:'nav-text'
    },
    {
        title:'Registrate',
        path: '/acount/register',
        icon: <BsIcons.BsFillPeopleFill/>,
        cName:'nav-text'
    },
    
    

]

export const SidebarDataUser= [
    {
        title:'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Todas las Recetas',
        path: '/AllRecipe',
        icon: <BiIcons.BiBookHeart/>,
        cName:'nav-text'
    },
    {
        title:'Inventario',
        path: '/inventary',
        icon:<IoIcons.IoAlbumsOutline/>,
        cName:'nav-text'
    },
    {
        title:'Mis Calendarios',
        path: '/calendar/user',
        icon: <AiIcons.AiOutlineCalendar/>,
        cName:'nav-text'
    },
    {
        title:'Crea tu calendario',
        path: '/shop',
        icon: <IoIcons.IoCreateOutline/>,
        cName:'nav-text'
    },

]

export const SidebarDataAdmin = [
    {
        title:'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Todas las Recetas',
        path: '/AllRecipe',
        icon: <BiIcons.BiBookHeart/>,
        cName:'nav-text'
    },
    {
        title:'Crear Receta',
        path: '/create/recipe',
        icon: <BsIcons.BsPencilSquare/>,
        cName:'nav-text'
    },
    {
        title:'Inventario',
        path: '/inventary',
        icon:<IoIcons.IoAlbumsOutline/>,
        cName:'nav-text'
    },
    {
        title:'Todos los Calendarios',
        path: '/calendar',
        icon: <IoIcons.IoDesktopOutline/>,
        cName:'nav-text'
    },
    {
        title:'Todos los usuarios',
        path: '/user',
        icon: <IoIcons.IoDesktopOutline/>,
        cName:'nav-text'
    }

]

export const filterData = (token, user) => {

    if(!token){  
        return SidebarDataNotUser;
    }
    else if(!!token){
        if(user.category === 'Admin'){
            return SidebarDataAdmin
        }
        return SidebarDataUser
    }
}