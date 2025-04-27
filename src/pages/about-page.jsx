import React, { useEffect } from 'react';
import Layout from './../components/layout/Layout';
import LegalContents from '../components/features/legal-contents';
import FeatureStore from '../store/FeatureStore';

const AboutPage = () => {

    const {LegalDetailsRequst}=FeatureStore();

    useEffect(()=>{

   (async()=>{
  await LegalDetailsRequst('about')
   


   })()

    },[])

    return (
     <Layout>

<LegalContents/>


     </Layout>       
    
    );
};

export default AboutPage;