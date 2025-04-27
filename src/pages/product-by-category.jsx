import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Productlist from '../components/product/product-list';
import Categories from '../components/product/categories';
import ProductStore from '../store/ProductStore';

const Productcategory = () => {
const {ListCategoryRequst}=ProductStore();
const {CategoryID}=useParams()

useEffect(()=>{


(async()=>{
await ListCategoryRequst(CategoryID)


})()



},[CategoryID])



    return (
        <div>
            <Layout>
           <Categories/>
          <Productlist/>

            </Layout>




        </div>
    );
};

export default Productcategory;