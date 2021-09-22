import React from "react";

import * as AiIcons from "react-icons/ai";

import * as BsIcons from "react-icons/bs"

import * as BiIcons from "react-icons/bi"

import * as IoIcons from "react-icons/io5"

import * as RiIcons from 'react-icons/ri';



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

]

export const SidebarDataUser= [
    {
        title:'Mi Perfil',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
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
        title:'Gestion',
        path: '/gestion',
        icon: <IoIcons.IoDesktopOutline/>,
        cName:'nav-text',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title:'Todos los Calendarios',
                path: '/gestion/calendar',
                icon: <IoIcons.IoDesktopOutline/>,
                cName:'nav-text'
            },
            {
                title:'Todos los usuarios',
                path: '/gestion/user',
                icon: <IoIcons.IoDesktopOutline/>,
                cName:'nav-text'
            },
          ]
    },
    
    
    

]

export const filterData = (token, user) => {
    if(!!token && user.category !== 'Admin'){  
        return SidebarDataUser;
    }
    if(!!token && user.category === 'Admin'){    
        return SidebarDataAdmin
    }
    return SidebarDataNotUser
}