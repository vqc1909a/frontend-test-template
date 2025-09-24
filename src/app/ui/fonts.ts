import { Archivo, Inter } from "next/font/google";
import localFont from 'next/font/local'


export const inter = Inter({subsets: ["latin"]});

export const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const areaNormal = localFont({
  src: [
    {
      path: "../../../public/fonts//Area_Normal_Thin.otf",
      weight: "100",
      style: "normal"
    },
    {
      path: "../../../public/fonts//Area_Normal_Regular.otf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../../public/fonts//Area_Normal_Bold.otf",
      weight: "700",
      style: "normal"
    },
    {
      path: "../../../public/fonts//Area_Normal_Black.otf",
      weight: "900",
      style: "normal"
    }
  ]
})