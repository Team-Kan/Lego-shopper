import React from 'react';
import { Link } from 'react-router-dom';

const Collections = (props) => {
    const { collections } = props;
    return (
        <div className = "collections_brick">
            <ul>
                {
                    collections.map(collection => {
                        return (
                            <Link to={`/collections/${collection.id}`} key = {collection.id}><li>
                                {collection.name}
                            </li></Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Collections;