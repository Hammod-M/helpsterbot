import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/shared/ui/components/Footer";
import { Header } from "@/shared/ui/components/Header";

export const MainLayout = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <div className="main-layout">
         <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

         <main className="content">
            <div className="container">
               <Outlet />
            </div>
         </main>
         <Footer />
      </div>
   );
};
