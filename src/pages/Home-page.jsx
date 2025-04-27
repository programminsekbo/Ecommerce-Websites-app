import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { ProductStore } from "../store/ProductStore";
import FeatureStore from "../store/FeatureStore";
import Features from "../components/features/features";
import Slider from "../components/product/slider";
import Categories from "../components/product/categories";
import Brands from "../components/product/brands";
import Products from "../components/product/products";


const Home = () => {
  const {
    BrandListRequst,
    CategoryListRequst,
    SliderListRequst,
    ListByRemarkRequst,
  } = ProductStore();

  const { FeatureListRequst } = FeatureStore();

  useEffect(() => {
    (async () => {
      await SliderListRequst();
      await FeatureListRequst();
      await CategoryListRequst();
      await ListByRemarkRequst("new");
      await BrandListRequst();
    })();
  }, []);

  return (
    <div>
      <Layout>
        <Slider />
        <Features />
        <Categories />
        <Products />
        <Brands />
      </Layout>
    </div>
  );
};

export default Home;
