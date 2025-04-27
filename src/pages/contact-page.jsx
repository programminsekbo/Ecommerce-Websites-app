import React, { useEffect } from "react";
import FeatureStore from "../store/FeatureStore";
import Layout from "../components/layout/Layout";
import LegalContents from "../components/features/legal-contents";

const ContactPage = () => {

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
}
export default ContactPage;
