import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Blink",
  description: "Scroll and Share",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}</body>
    </html>
  );
}
