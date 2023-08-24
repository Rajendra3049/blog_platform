import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import BlogPage from "./pages/blogs";
import AddNewBlogPage from "./pages/addBlog";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-blogs" element={<BlogPage />} />
      <Route path="/add-new-blogs" element={<AddNewBlogPage />} />
    </Routes>
  );
};
