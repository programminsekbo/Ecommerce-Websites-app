import React from 'react';
import Layout from './../components/layout/Layout';
import Categories from '../components/product/categories';
import CartList from '../components/Cart/cart-list';

const CartPage = () => {
    return (
        <Layout>
            
         
         <CartList/>
         <Categories/>



        </Layout>
    );
};

export default CartPage;