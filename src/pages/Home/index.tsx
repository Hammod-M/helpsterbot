import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { ChatSection } from "./components/ChatSection";
import { UpdatesSection } from "./components/UpdatesSection";
import { Chat } from "../Chat"; // Импортируйте компонент Chat

export const HomePage = () => {
   const { isAuthenticated } = useSelector((state: RootState) => state.auth);

   return (
      <main className="home-page">
         <section className="hero-section">
            <h1>Chat AI Assistant</h1>
            <h2>Мощный искусственный интеллект для ваших задач</h2>
         </section>

         {isAuthenticated ? <Chat /> : <ChatSection />}

         <UpdatesSection />
      </main>
   );
};
