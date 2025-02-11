import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/shared/ui/layout/MainLayout";
import { AdminLayout } from "@/shared/ui/layout/AdminLayout";
import { RequireAuth } from "@/features/auth/ui/RequireAuth";
import { HomePage } from "@/pages/Home";
import { PricingPage } from "@/pages/Pricing";
import { ProfilePage } from "@/pages/Profile";
import { BlogPage } from "@/pages/Blog";
import { BlogPostPage } from "@/pages/Blog/BlogPostPage";
import { LoginPage } from "@/pages/Login";
import { RegisterPage } from "@/pages/Registration";
import { AdminPage } from "@/pages/Admin";
import { PricingManager } from "@/pages/Admin/components/PricingManager";
import { SignUp } from "@/pages/Auth/SignUp";
import { SignIn } from "@/pages/Auth/SignIn";
import { AdminSignIn } from "@/pages/Auth/AdminSignIn";
import { AdminRequireAuth } from "@/features/auth/ui/AdminRequireAuth";
import { CreateArticle } from "@/features/admin-panel/ui/ContentEditor/CreateArticle";
import { CreatePost } from "@/features/admin-panel/ui/ContentEditor/CreatePost";
import { Chat } from "@/pages/Chat";
import Images from "@/pages/Images";
import { VideoPage } from "@/pages/Video";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { index: true, element: <HomePage /> },
         { path: "pricing", element: <PricingPage /> },
         {
            path: "blog",
            children: [
               { index: true, element: <BlogPage /> },
               { path: ":postId", element: <BlogPostPage /> },
            ],
         },
         { path: "images", element: <Images /> },
         { path: "video", element: <VideoPage /> },
         { path: "login", element: <AdminSignIn /> },
         {
            path: "auth",
            children: [
               { path: "signup", element: <SignUp /> },
               { path: "signin", element: <SignIn /> },
            ],
         },
         {
            path: "chat",
            element: (
               <RequireAuth roles={["user"]}>
                  <Chat />
               </RequireAuth>
            ),
         },
         {
            path: "profile",
            element: (
               <RequireAuth roles={["user"]}>
                  <ProfilePage />
               </RequireAuth>
            ),
         },
      ],
   },
   {
      path: "/admin",
      element: (
         <AdminRequireAuth roles={["admin"]}>
            <AdminLayout />
         </AdminRequireAuth>
      ),
      children: [
         { index: true, element: <AdminPage /> },
         { path: "blog", element: <CreatePost /> },
         { path: "articles", element: <CreateArticle /> },
         { path: "pricing", element: <PricingManager /> },
      ],
   },
]);
