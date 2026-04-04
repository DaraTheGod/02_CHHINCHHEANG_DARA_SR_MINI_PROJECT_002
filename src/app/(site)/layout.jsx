import FooterComponent from "../../components/FooterComponent";
import NavbarComponent from "../../components/NavbarComponent";
import { SessionProvider } from "next-auth/react";

export default function SiteLayout({ children }) {
  return (
    <>
      <SessionProvider>
        <NavbarComponent />
        <main className="flex-1">{children}</main>
        <FooterComponent />
      </SessionProvider>
    </>
  );
}
