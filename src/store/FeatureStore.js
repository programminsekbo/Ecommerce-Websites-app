import axios from "axios";
import { create } from "zustand";

export const FeatureStore = create(set => ({
  FeatureList: null,

  FeatureListRequst: async () => {
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/FeaturesList`
    );

    if (res.data["status"] === "success") {
      set({ FeatureList: res.data["data"] });
    }
  },
  LegalDetails: null,

  LegalDetailsRequst: async type => {
    set({ LegalDetails: null });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/LegalDetails/${type}`
    );
    if (res.data["status"] === "success") {
      set({ LegalDetails: res.data["data"] });
    }
  },
}));

export default FeatureStore;
