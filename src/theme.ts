// theme.ts
import { createTheme, MantineColorsTuple } from "@mantine/core";

const appleColors = {
   blue: "#0071e3",
   gray1: "#f5f5f7",
   gray2: "#86868b",
   gray3: "#424245",
   black: "#1d1d1f",
   white: "#ffffff",
   red: "#ff3b30",
   orange: "#ff9500",
   green: "#34c759",
   teal: "#30b0c7",
};

export const theme = createTheme({
   fontFamily: "system-ui, -apple-system, sans-serif",
   colors: {
      appleBlue: Array(10).fill(appleColors.blue) as MantineColorsTuple,
      appleGray: [
         appleColors.gray1,
         appleColors.gray2,
         appleColors.gray3,
         appleColors.black,
         "#d9d9d9",
         "#bfbfbf",
         "#a6a6a6",
         "#8c8c8c",
         "#737373",
         "#595959",
      ],
   },
   primaryColor: "appleBlue",
   primaryShade: 5,
   defaultRadius: "md",
   components: {
      Button: {
         styles: {
            root: {
               transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
               "&:hover": {
                  transform: "translateY(-1px)",
               },
            },
         },
      },
      Menu: {
         styles: {
            item: {
               "&:hover": {
                  backgroundColor: "rgba(0, 113, 227, 0.1)",
               },
            },
         },
      },

      Card: {
         styles: (theme) => ({
            root: {
               backgroundColor: theme.white,
               borderColor: "var(--border-color)",
            },
         }),
      },
      Badge: {
         styles: {
            root: {
               textTransform: "none",
               fontWeight: 500,
            },
         },
      },
   },
});
