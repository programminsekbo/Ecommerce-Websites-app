import axios from "axios";
import { create } from "zustand";
import { unauthorized } from "../utility/utility";
import Cookies from "js-cookie";

const CartStore = create(set => ({
  isCartSubmit: false,

  CartForm: { productID: "", color: "", size: "" },

  CartFormChange: (name, value) => {
    set(state => ({
      CartForm: {
        ...state.CartForm,
        [name]: value,
      },
    }));
  },

  CartSaveRequest: async (PostBody, productID, quantity) => {
    try {
      set({ isCartSubmit: true });
      PostBody.productID = productID;
      PostBody.qty = quantity;

      let res = await axios.post(
        `https://ecommerce-backend-f.vercel.app/api/CreateCart`,
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
      set({ isCartSubmit: false });
    }
  },

  CartList: null,
  CartCount: 0,
  CartTotal: 0,
  CartVatTotal: 0,
  CartPayableTotal: 0,

  CartListRequest: async () => {
    try {
      let res = await axios.get(
        `https://ecommerce-backend-f.vercel.app/api/ReadCartList`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      set({ CartList: res.data["data"] });
      set({ CartCount: res.data["data"].length });
      let total = 0;
      let vat = 0;
      let payable = 0;

      res.data["data"].forEach((item, i) => {
        if (item["product"][0]["discount"] === true) {
          total =
            total +
            parseInt(item["qty"]) *
              parseInt(item["product"][0]["discountPrice"]);
        } else {
          total =
            total +
            parseInt(item["qty"]) * parseInt(item["product"][0]["price"]);
        }
      });

      vat = total * 0.05;
      payable = vat + total;
      set({ CartTotal: total });
      set({ CartVatTotal: vat });
      set({ CartPayableTotal: payable });
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  RemoveCartListRequest: async cartID => {
    try {
      set({ CartList: null });
      await axios.post(
        `https://ecommerce-backend-f.vercel.app/api/RemoveCart`,
        { _id: cartID },
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

  CreateInvoiceRequest: async () => {
    try {
      set({ isCartSubmit: true });
      let res = await axios.get(
        `https://ecommerce-backend-f.vercel.app/api/CreateInvoice`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      window.location.href = res.data["data"]["GatewayPageURL"];
    } catch (e) {
      unauthorized(e.response.status);
    } finally {
      set({ isCartSubmit: false });
    }
  },

  InvoiceList: null,
  InvoiceListRequest: async () => {
    try {
      let res = await axios.get(
        `https://ecommerce-backend-f.vercel.app/api/InvoiceList`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      set({ InvoiceList: res.data["data"] });
    } catch (e) {
      unauthorized(e.response.status);
    } finally {
    }
  },

  InvoiceDetails: null,
  InvoiceDetailsRequest: async id => {
    try {
      let res = await axios.get(
        `https://ecommerce-backend-f.vercel.app/api/InvoiceProductList/${id}`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      set({ InvoiceDetails: res.data["data"] });
    } catch (e) {
      unauthorized(e.response.status);
    } finally {
    }
  },
}));

export default CartStore;
