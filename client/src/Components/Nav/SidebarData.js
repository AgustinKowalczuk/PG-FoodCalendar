import React from "react";

import * as AiIcons from "react-icons/ai";

import * as BsIcons from "react-icons/bs"

import * as BiIcons from "react-icons/bi"

import * as IoIcons from "react-icons/io5"

import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';


export const SidebarDataNotUser = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Todas las Recetas',
        path: '/AllRecipe',
        icon: <BiIcons.BiBookHeart />,
        cName: 'nav-text'
    },
    {
        title: 'Crea tu calendario',
        path: '/shop',
        icon: <IoIcons.IoCreateOutline />,
        cName: 'nav-text'
    },

]

export const SidebarDataUser = [

    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Todas las Recetas',
        path: '/AllRecipe',
        icon: <BiIcons.BiBookHeart />,
        cName: 'nav-text'
    },
    {
        title: 'Crear Receta',
        path: '/create/recipe',
        icon: <BsIcons.BsPencilSquare />,
        cName: 'nav-text'
    },
    {
        title: 'Crea tu calendario',
        path: '/shop',
        icon: <BiIcons.BiCalendarHeart />,
        cName: 'nav-text'
    }
]

export const SidebarDataAdmin = [


    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Todas las Recetas',
        path: '/AllRecipe',
        icon: <BiIcons.BiBookHeart />,
        cName: 'nav-text'
    },

    {
        title: 'Gestion Calendario',
        icon: <AiIcons.AiFillSetting />,
        path: '#',
        cName: 'nav-text',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Crear Receta',
                path: '/create/recipe',
                icon: <BsIcons.BsPencilSquare />,
                cName: 'nav-text'
            },
            {
                title: 'Crea tu calendario',
                path: '/shop',
                icon: <BiIcons.BiCalendarHeart />,
                cName: 'nav-text'
            }
        ]
    },


    {
        title: 'Gestion',
        icon: <AiIcons.AiFillSetting />,
        path: '#',
        cName: 'nav-text',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Todos los Calendarios',
                path: '/calendar',
                icon: <FaIcons.FaRegCalendarAlt />,
                cName: 'nav-text'
            },
            {
                title: 'Todos los usuarios',
                path: '/user',
                icon: <IoIcons.IoListCircleOutline />,
                cName: 'nav-text'
            },
            {
                title: 'Recetas deshabilitadas',
                path: '/availability',
                icon: <IoIcons.IoListCircleOutline />,
                cName: 'nav-text'
            },
        ]
    },




]

export const filterData = (token, user) => {
    if (!!token && user.category !== 'Admin') {
        return SidebarDataUser;
    }
    if (!!token && user.category === 'Admin') {
        return SidebarDataAdmin
    }
    return SidebarDataNotUser
}