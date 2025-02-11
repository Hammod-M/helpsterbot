import { CreateArticle } from "@/features/admin-panel/ui/ContentEditor/CreateArticle";
import { CreatePost } from "@/features/admin-panel/ui/ContentEditor/CreatePost";
// import { ContentEditor } from "./components/ContentEditor";
// import { PricingManager } from "./components/PricingManager";

export const AdminPage = () => {
   return (
      <div className="admin-dashboard">
         <div className="admin-sections">
            {/* <ContentEditor />
            <PricingManager /> */}
            <CreatePost />
            <CreateArticle />
         </div>
      </div>
   );
};
