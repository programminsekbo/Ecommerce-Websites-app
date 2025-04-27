import React, { useEffect } from 'react';
import { ProductStore } from '../store/ProductStore';
import { useParams } from 'react-router-dom';
import Layout from './../components/layout/Layout';
import Productlist from '../components/product/product-list';


const  Productbybrand = () => {

const {ListBrandRequst}=ProductStore();
const {id}=useParams()


useEffect(()=>{

(async()=>{
await ListBrandRequst(id)



})()




},[id])



    return (
        <div>

<Layout>
<Productlist/>



</Layout>




            
        </div>
    );
};

export default Productbybrand;