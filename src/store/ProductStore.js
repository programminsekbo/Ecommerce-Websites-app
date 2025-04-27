import axios from "axios";
import { create } from "zustand";

export const ProductStore = create(set => ({
  BrandList: null,

  BrandListRequst: async () => {
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/BrandList`
    );
    if (res.data["status"] === "success") {
      set({ BrandList: res.data["data"] });
    }
  },

  CategoryList: null,

  CategoryListRequst: async () => {
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/CategoryList`
    );
    if (res.data["status"] === "success") {
      set({ CategoryList: res.data["data"] });
    }
  },

  SliderList: null,

  SliderListRequst: async () => {
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/ProductListBySlider`
    );
    if (res.data["status"] === "success") {
      set({ SliderList: res.data["data"] });
    }
  },

  ListByRemark: null,

  ListByRemarkRequst: async Remark => {
    set({ ListByRemark: null });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/ProductListByRemark/${Remark}`
    );
    if (res.data["status"] === "success") {
      set({ ListByRemark: res.data["data"] });
    }
  },

  ListProduct: null,

  ListBrandRequst: async BrandID => {
    set({ ListProduct: null });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/ProductListByBrand/${BrandID}`
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },

  ListProduct: null,

  ListCategoryRequst: async CategoryID => {
    set({ ListProduct: null });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/ProductListByCategory/${CategoryID}`
    );

    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },

  ProductListByKeyword: async Keyword => {
    set({ ListProduct: null });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/ProductListByKeyword/${Keyword}`
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },

  ListByFilterRequest: async postBody => {
    set({ ListProduct: null });
    let res = await axios.post(
      `https://ecommerce-backend-f.vercel.app/api/ProductListByFilter`,
      postBody
    );
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },

  SearchKeyword: "",
  SetSearchKeyword: async keyword => {
    set({ SearchKeyword: keyword });
  },

  Details: null,
  DetailsRequest: async id => {
    set({ Details: null });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/ProductDetailsID/${id}`
    );
    if (res.data["status"] === "success") {
      set({ Details: res.data["data"] });
    }
  },

  ReviewList: null,
  ReviewListRequest: async id => {
    set({ ReviewList: null });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/ProductReviewListByID/${id}`
    );
    if (res.data["status"] === "success") {
      set({ ReviewList: res.data["data"] });
    }
  },
}));

export default ProductStore;
