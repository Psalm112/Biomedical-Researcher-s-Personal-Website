import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";

// const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const Dashboard = lazy(() => import("./pages/Admin/dashboard/Dashboard"));
const AdminAbout = lazy(() => import("./pages/Admin/About/AdminAbout"));
const ArticleManager = lazy(() =>
  import("./pages/Admin/Article/articleManager")
);
const AdminHome = lazy(() => import("./pages/Admin/Home/adminHome"));
const AdminContact = lazy(() => import("./pages/Admin/Contact/adminContact"));
const AdminGallery = lazy(() => import("./pages/Admin/Gallery/AdminGallery"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              backgroundColor: "#f5f6fa",
              height: window.innerHeight,
              width: window.innerWidth,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Loading...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="/about" element={<AdminAbout />} />
            <Route path="/articles" element={<ArticleManager />} />
            <Route path="/home" element={<AdminHome />} />
            <Route path="/contact" element={<AdminContact />} />
            <Route path="/gallery" element={<AdminGallery />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
