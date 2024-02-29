import React, { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div> {children}</div>;
};

export default Layout;
