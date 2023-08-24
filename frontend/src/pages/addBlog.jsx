import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewBlog } from "../redux/blogs/blog.action";

const AddNewBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const isFormValid = title && content && image;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((store) => store.userManager);
  const { blogs, my_blogs } = useSelector((store) => store.blogManager);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addNewBlog({ title, content, image, blogs, my_blogs }));
    navigate("/my-blogs");
  };

  return (
    <Box p="8" maxW="600px" mx="auto">
      <Heading mb="4" fontSize="xl">
        Add New Blog
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Content</FormLabel>
          <Textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Image URL</FormLabel>
          <Input
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" isDisabled={!isFormValid}>
          Add Blog
        </Button>
      </form>
    </Box>
  );
};

export default AddNewBlogPage;
