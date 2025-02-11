import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export const BurgerMenu = () => {
   const [isOpen, setIsOpen] = useState(false);
   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
   const { isAdmin } = useSelector((state: RootState) => state.auth);

   // Блокировка скролла при открытом меню
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }
   }, [isOpen]);

   return (
      <>
         <button className="burger-icon" onClick={() => setIsOpen(!isOpen)}>
            ☰
         </button>

         <div className={`burger-menu ${isOpen ? "open" : ""}`}>
            <nav className="menu-nav">
               <Link to="/" onClick={() => setIsOpen(false)}>
                  Главная
               </Link>
               <Link to="/pricing" onClick={() => setIsOpen(false)}>
                  Тарифы
               </Link>
               <Link to="/blog" onClick={() => setIsOpen(false)}>
                  Блог
               </Link>

               {isAuthenticated && (
                  <>
                     <Link to="/profile" onClick={() => setIsOpen(false)}>
                        Профиль
                     </Link>
                     {isAdmin && <Link to="/admin">Админка</Link>}
                  </>
               )}
            </nav>
         </div>
      </>
   );
};
