import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Brands from "../components/product/brands";
import { ProductStore } from "../store/ProductStore";
import { useParams } from "react-router-dom";
import Details from "../components/product/details";



const ProductDetails = () => {
  const { BrandList,DetailsRequest,ReviewListRequest,BrandListRequst}=ProductStore();

  const {id} = useParams();

  useEffect(() => {
    (async () => {
      await DetailsRequest(id);
      await ReviewListRequest(id);
      BrandList === null? await BrandListRequst():null;
    })();
  },[id]);

  return (
    <div>
      <Layout>
        <Details/>
        <Brands/>
      </Layout>
    </div>
  );
};

export default ProductDetails;
