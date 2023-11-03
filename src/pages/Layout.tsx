import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout: React.FC = () => {
  return (
    <>
      <Header className="mb-5" />
      <main>
        <Outlet />
      </main>
      {/* footer here */}
    </>
  );
};

export default Layout;
