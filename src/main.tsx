import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxProvider } from "./app/providers/ReduxProvider";
import { AppRouterProvider } from "./app/providers/AppRouterProvider";
import { MantineProvider, DEFAULT_THEME } from "@mantine/core";

import "@mantine/core/styles.css";
import "./index.css";
import { theme } from "./theme";

// const appleLikeTheme = {
//    ...DEFAULT_THEME,
//    colorScheme: "dark",
//    fontFamily:
//       "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//    headings: {
//       ...DEFAULT_THEME.headings,
//       fontFamily:
//          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//    },
//    primaryColor: "blue", // если требуется
//    defaultRadius: "sm",
//    // Дополнительные настройки можно добавить тут
// };

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ReduxProvider>
         <MantineProvider theme={theme}>
            <AppRouterProvider />
         </MantineProvider>
      </ReduxProvider>
   </React.StrictMode>
);
