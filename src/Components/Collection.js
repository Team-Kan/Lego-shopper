import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCollectionProducts } from "../api";
import Collections from "./Collections";

const Collection = (props) => {
    const { collections } = props;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const id = Number(useParams().id);

    const showCollectionProducts = async (id) => {
        const products = await fetchCollectionProducts(id);
        if (!products.error) {
            setError('');
            setProducts(products);
        } else {
            setError(products.error);
            setProducts([]);
        }
    }
    
    useEffect(() => {
        if(id) {
            showCollectionProducts(id);
        }
    }, [id])


    return (
        <div>
            <Collections collections={collections}/>
            <h2>{error}</h2>
            <ul>
                {
                    products.map(product => {
                        return (
                            <Link to={`/product/${product.id}`} key={product.id}>
                            <div  className='single_product'>
                            <img src={product.imageUrl} className='single_product_image' />
                            <li>{product.name}</li>
                            <li>Price: ${product.price}</li>
                            </div>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}


export default Collection;