import { create } from "zustand";
import { unauthorized } from "../utility/utility";
import Cookies from "js-cookie";
import axios from "axios";

const ReviewStore = create(set => ({
  isReviewSubmit: false,
  ReviewFormData: { des: "", rating: "5", productID: "" },
  ReviewFormOnChange: (name, value) => {
    set(state => ({
      ReviewFormData: {
        ...state.ReviewFormData,
        [name]: value,
      },
    }));
  },

  ReviewSaveRequest: async PostBody => {
    try {
      set({ isReviewSubmit: true });
      let res = await axios.post(
        `https://ecommerce-backend-f.vercel.app/api/CreateUserReview`,
        PostBody,
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
      set({ isReviewSubmit: false });
    }
  },
}));

export default ReviewStore;
