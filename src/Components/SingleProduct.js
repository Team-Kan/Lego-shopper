import React from 'react'
import { useLocation } from 'react-router-dom';

const SingleProduct = () => {
  
  const [product, setProduct] = useState("");
  const location = useLocation();
  const pathName = location.pathname;
  const pathArray = pathName.split("/");
  const id = pathArray[pathArray.length - 1];

  const getProduct = async () => {
    
  }

  useEffect(() => {
    getProduct()
  }, [id]);

  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct;