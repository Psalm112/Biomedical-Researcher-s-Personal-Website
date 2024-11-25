import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
const Home = lazy(() => import("./pages/Main/Home"));
const ContactUs = lazy(() => import("./pages/Main/contactUs"));
const Gallery = lazy(() => import("./pages/Main/Gallery/Gallery"));
const About = lazy(() => import("./pages/Main/About/About"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="spinner">
              <div className="loaderInner"></div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* <Route path="/articles" element={<Article />} />
              <Route path="/articles/blog" element={<Blog />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
