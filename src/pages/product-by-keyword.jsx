import React, { useEffect } from 'react';
import Productlist from '../components/product/product-list';
import { ProductStore } from '../store/ProductStore';
import { useParams } from 'react-router-dom';

const Productkeyword = () => {


    const {ProductListByKeyword}=ProductStore();
    const {Keyword}=useParams()
    
    useEffect(()=>{
    
    
    (async()=>{
    await ProductListByKeyword(Keyword)
    
    
    })()
    
    
    
 
},[Keyword])
    



    return (
        <div>
            

<Productlist/>



        </div>
    );
};

export default Productkeyword;