import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "./types";
import { PricingPlan } from "@/features/pricing/model/types";

interface AdminState {
   posts: BlogPost[];
   pricingPlans: PricingPlan[];
}

const initialState: AdminState = {
   posts: [],
   pricingPlans: [],
};

const adminSlice = createSlice({
   name: "admin",
   initialState,
   reducers: {
      setPosts(state, action: PayloadAction<BlogPost[]>) {
         state.posts = action.payload;
      },
      addPost(state, action: PayloadAction<BlogPost>) {
         state.posts.push(action.payload);
      },
      updatePost(state, action: PayloadAction<BlogPost>) {
         const index = state.posts.findIndex((a) => a.id === action.payload.id);
         if (index !== -1) {
            state.posts[index] = action.payload;
         }
      },
      deletePost(state, action: PayloadAction<string>) {
         state.posts = state.posts.filter((a) => a.id !== action.payload);
      },
      setPricingPlans(state, action: PayloadAction<PricingPlan[]>) {
         state.pricingPlans = action.payload;
      },
   },
});

export const { setPosts, addPost, updatePost, deletePost, setPricingPlans } =
   adminSlice.actions;
export default adminSlice.reducer;
