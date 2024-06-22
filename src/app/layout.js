import Header from "@/components/Header";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
 title: "Blink",
 description: "Scroll and Share",
};

export default function RootLayout({ children }) {
 return (
  <SessionWrapper>
   <html lang="en">
    <body className="bg-amber-50">
     <Header />
     {children}
    </body>
   </html>
  </SessionWrapper>
 );
}
