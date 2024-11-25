import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
// import { HelmetProvider } from "react-helmet-async";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, logInAnonymously } from "./firebase";
// import { ToastContainer, toast } from "react-toastify";
const Blog = lazy(() => import("./pages/Article/Articlepost/ArticlePost"));
const Article = lazy(() => import("./pages/Article/Article"));

function App() {
  // const [user, loading, error] = useAuthState(auth);
  // useEffect(() => {
  //   if (!user) {
  //     try {
  //       logInAnonymously();
  //     } catch (err) {
  //       toast.error("error while loading page, please reload!", {
  //         autoClose: 2000,
  //       });
  //     }
  //   }
  // }, [user, loading]);
  // console.log(
  //   "render mode:",
  //   !!(
  //     typeof window !== "undefined" &&
  //     window.document &&
  //     window.document.createElement
  //   )
  //     ? "SPA"
  //     : "SSR"
  // );
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
            <Route index element={<Article />} />
            <Route exact path="/posts/:title" element={<Blog />} />;
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
