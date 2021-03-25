import Header from "components/next-auth/header";
import Footer from "components/next-auth/footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
