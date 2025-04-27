import axios from "axios";
import { create } from "zustand";
import { getEmail, setEmail, unauthorized } from "../utility/utility";
import Cookies from "js-cookie";

const UserStor = create(set => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },

  LoginFormData: { email: "" },

  LoginFormOnChange: (name, value) => {
    set(state => ({
      LoginFormData: {
        ...state.LoginFormData,
        [name]: value,
      },
    }));
  },

  UserOTPRequest: async email => {
    set({ isFormSubmit: true });
    let res = await axios.post(
      `https://ecommerce-backend-f.vercel.app/api/Login`,
      {
        email: email,
      }
    );
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set(state => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value,
      },
    }));
  },

  VerifyLoginRequest: async otp => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.post(
      `https://ecommerce-backend-f.vercel.app/api/VerifyLogin`,
      {
        email: email,
        otp: otp,
      }
    );
    Cookies.set("token", res.data.token);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  UserLogoutRequest: async () => {
    set({ isFormSubmit: true });
    let res = await axios.get(
      `https://ecommerce-backend-f.vercel.app/api/UserLogout`,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );

    if (res.data["status"] === "success") {
      Cookies.remove("token");
    }
    set({ isFormSubmit: false });

    return res.data["status"] === "success";
  },

  isFormSubmit: false,

  ProfileForm: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postcode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country: "",
    ship_name: "",
    ship_phone: "",
    ship_postcode: "",
    ship_state: "",
  },
  ProfileFormChange: (name, value) => {
    set(state => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },

  // ProfileDetails: null,
  // ProfileDetailsRequest: async () => {
  //   try {
  //     let res = await axios.get(`https://ecommerce-backend-f.vercel.app/api/ReadUserProfile`,{headers: {
  //       token: Cookies.get('token')
  //   }});
  //     if (res.data["data"].length > 0) {
  //       set({ ProfileDetails: res.data["data"][0] });
  //       set({ ProfileForm: res.data["data"][0] });
  //     } else {
  //       set({ ProfileDetails: [] });
  //     }
  //   } catch (e) {
  //     // unauthorized(e.response.status);
  //     if (e.response) {
  //       unauthorized(e.response.status);
  //     } else if (e.request) {
  //       console.error("Request made but no response received");
  //     } else {
  //       console.error("Error setting up request", e.message);
  //     }
  //   }
  // },

  ProfileDetailsRequest: async () => {
    try {
      let res = await axios.get(
        `https://ecommerce-backend-f.vercel.app/api/ReadUserProfile`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      const userData = res.data?.data;

      if (Array.isArray(userData) && userData.length > 0) {
        set({ ProfileDetails: userData[0] });
        set({ ProfileForm: userData[0] });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      if (e.response) {
        unauthorized(e.response.status);
      } else {
        console.error("Network error or Error setting up request", e.message);
      }
    }
  },

  ProfileSaveRequest: async PostBody => {
    try {
      set({ ProfileDetails: null });
      let res = await axios.post(
        `https://ecommerce-backend-f.vercel.app/api/UpdateUserProfile`,
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
    }
  },
}));

export default UserStor;
