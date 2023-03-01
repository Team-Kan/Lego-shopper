import React from 'react';
import { Link } from 'react-router-dom';

const Collections = (props) => {
    const { collections } = props;
    return (
        <>
        <h1>Collections</h1>
        {
            collections.map(collection => {
                return (
                    <>
                        <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
                    </>
                )
            })
        }
        </>
    )
}

export default Collections;