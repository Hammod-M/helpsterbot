import { BlogTable } from "../ui/ContentEditor/BlogTable";
import { PricingTable } from "../ui/PricingManager/PricingTable";

export const AdminDashboard = () => {
   return (
      <div className="admin-dashboard">
         <h1>Админ-панель</h1>
         <section>
            <h2>Блог</h2>
            <BlogTable />
         </section>
         <section>
            <h2>Тарифы</h2>
            <PricingTable />
         </section>
      </div>
   );
};
