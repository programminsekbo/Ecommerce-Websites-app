import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import FeatureStore from '../store/FeatureStore';
import LegalContents from '../components/features/legal-contents';

const RefundPage = () => {
    const {LegalDetailsRequst}=FeatureStore();

    useEffect(()=>{

        (async()=>{
       await LegalDetailsRequst('refund')
        
     
     
        })()
     
         },[])


    return (
     <Layout>

<LegalContents/>


     </Layout>       
    
    );
};

export default  RefundPage;