import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, PricingPlan } from "./types";

interface AdminState {
   articles: Article[];
   pricingPlans: PricingPlan[];
}

const initialState: AdminState = {
   articles: [],
   pricingPlans: [],
};

const adminSlice = createSlice({
   name: "admin",
   initialState,
   reducers: {
      setArticles(state, action: PayloadAction<Article[]>) {
         state.articles = action.payload;
      },
      setPricingPlans(state, action: PayloadAction<PricingPlan[]>) {
         state.pricingPlans = action.payload;
      },
   },
});

export const { setArticles, setPricingPlans } = adminSlice.actions;
export default adminSlice.reducer;
