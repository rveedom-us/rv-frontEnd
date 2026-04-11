import { createSlice } from "@reduxjs/toolkit";
import { priceCalc } from "../priceCalc";

const initialState = {
  selectedSize: "",
  selectedQuality: "",
  qualityScore: "",
  startDate: "",
  endDate: "",
  totalDate: null,
  quantity: 1,

  location: null,
  guests: { people: 1, beds: 1, pets: 0, petFee: 0 },

  totalPrice: 0,
  flexPrice: 0,

  cleaningPrepFee: 150,
  tax: 6,
  taxAmount: 0,

  saving: 0,
  savingPercentage: 0,

  downPayment: 0,

  deliveryOption: null,
  deliveryPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedSize: (state, action) => {
      if (state.selectedSize === action.payload) return;
      state.selectedSize = action.payload;
      priceCalc(state);
    },

    setSelectedQuality: (state, action) => {
      if (state.selectedQuality === action.payload) return;
      state.selectedQuality = action.payload;

      switch (action.payload) {
        case "Basic":
          state.qualityScore = "70-80";
          break;
        case "Standard":
          state.qualityScore = "80-90";
          break;
        case "Premium":
          state.qualityScore = "90-100";
          break;
        default:
          state.qualityScore = "";
      }
      priceCalc(state);
    },

    setLocation: (state, action) => {
      state.location = action.payload;
    },

    setGuests: (state, action) => {
      state.guests = action.payload;
      // This triggers the price recalculation including the petFee
      priceCalc(state);
    },

    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },

    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },

    setTotalDate: (state, action) => {
      if (state.totalDate === action.payload) return;
      state.totalDate = action.payload;
      priceCalc(state);
    },

    setQuantity: (state, action) => {
      if (state.quantity === action.payload) return;
      state.quantity = action.payload;
      priceCalc(state);
    },

    setDeliveryOption: (state, action) => {
      const option = action.payload;
      if (state.deliveryOption === option) return;
      state.deliveryOption = option;
      state.deliveryPrice = option === "delivery" ? 250 : 0;
      priceCalc(state);
    },
  },
});

export const {
  setSelectedSize,
  setSelectedQuality,
  setLocation,
  setGuests,
  setStartDate,
  setEndDate,
  setTotalDate,
  setQuantity,
  setDeliveryOption,
} = cartSlice.actions;

export default cartSlice.reducer;
