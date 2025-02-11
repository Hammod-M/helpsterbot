import { Article } from "@/features/admin-panel/model/types";
import { PricingPlan } from "@/features/pricing/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
      addArticle(state, action: PayloadAction<Article>) {
         state.articles.push(action.payload);
      },
      updateArticle(state, action: PayloadAction<Article>) {
         const index = state.articles.findIndex(
            (a) => a.id === action.payload.id
         );
         if (index !== -1) {
            state.articles[index] = action.payload;
         }
      },
      deleteArticle(state, action: PayloadAction<string>) {
         state.articles = state.articles.filter((a) => a.id !== action.payload);
      },
      setPricingPlans(state, action: PayloadAction<PricingPlan[]>) {
         state.pricingPlans = action.payload;
      },
   },
});

export const {
   setArticles,
   addArticle,
   updateArticle,
   deleteArticle,
   setPricingPlans,
} = adminSlice.actions;
export default adminSlice.reducer;
