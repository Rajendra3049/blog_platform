import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import BlogPage from "./pages/blogs";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-blogs" element={<BlogPage />} />
    </Routes>
  );
};
