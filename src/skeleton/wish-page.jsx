import React from 'react';
import Layout from '../components/layout/Layout';
import WishList from '../components/wish/wish-list';
import Brands from '../components/product/brands';

const WishPage = () => {
    return (
        <Layout>
           <WishList/>
            <Brands/>
            
        </Layout>
    );
};

export default WishPage;