import { Box, Button } from "@chakra-ui/react";
import BlogPost from "../components/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllBlogs,
  getMyBlogs,
  resetBlogs,
} from "../redux/blogs/blog.action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../components/Loader";

const BlogPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, my_blogs, loading } = useSelector(
    (store) => store.blogManager
  );

  const { isAuth } = useSelector((store) => store.userManager);
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);
  useEffect(() => {
    if (isAuth) {
      dispatch(getMyBlogs());
    } else if (path === "my-blogs") {
      navigate("/login");
    }
  }, [path]);

  return (
    <Box p="2">
      {(blogs.length || my_blogs.length) && !loading ? (
        <Box>
          {isAuth && (
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate("/add-new-blogs");
              }}
              ml="100px"
              mt="5px">
              Add New Blog
            </Button>
          )}

          <Box maxHeight="80vh" overflowY="auto">
            {path === ""
              ? blogs.map((post, index) => <BlogPost key={index} {...post} />)
              : path === "my-blogs" &&
                my_blogs.map((post, index) => (
                  <BlogPost key={index} {...post} path={path} />
                ))}
          </Box>
        </Box>
      ) : (
        <LoadingSkeleton />
      )}
    </Box>
  );
};

export default BlogPage;
