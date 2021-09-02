import React from 'react'
import { useParams } from 'react-router'

export default function SearchCards() {
    const name = useParams('name')

    return (
        <div>
            <p>{name}</p>
        </div>
    )
}
