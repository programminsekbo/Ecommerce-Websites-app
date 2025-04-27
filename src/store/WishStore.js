import { create } from "zustand";
import { unauthorized } from "../utility/utility";
import axios from "axios";
import Cookies from "js-cookie";

const WishStore = create(set => ({
  isWishSubmit: false,
  WishSaveRequest: async productID => {
    try {
      set({ isWishSubmit: true });
      let res = await axios.post(
        `https://ecommerce-backend-f.vercel.app/api/CreateWish`,
        { productID: productID },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      return res.data["status"] === "success";
    } catch (e) {
      unauthorized(e.response.status);
    } finally {
      set({ isWishSubmit: false });
    }
  },

  WishList: null,
  WishCount: 0,
  WishListRequest: async () => {
    try {
      let res = await axios.get(
        `https://ecommerce-backend-f.vercel.app/api/ReadWishList`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      set({ WishList: res.data["data"] });
      set({ WishCount: res.data["data"].length });
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  RemoveWishListRequest: async productID => {
    try {
      set({ WishList: null });
      await axios.post(
        `https://ecommerce-backend-f.vercel.app/api/RemoveWish`,
        { productID: productID },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
    } catch (e) {
      unauthorized(e.response.status);
    }
  },
}));

export default WishStore;
