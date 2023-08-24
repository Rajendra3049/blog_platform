import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Stack,
  Button,
} from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  dislikeBlog,
  likeBlog,
  updateBlog,
} from "../redux/blogs/blog.action";
import UpdateBlogModal from "./updateBlog";

const BlogPost = ({
  _id,
  title,
  content,
  image,
  likes,
  dislikes,
  createdAt,
  path,
}) => {
  const dispatch = useDispatch();
  const { blogs, my_blogs } = useSelector((store) => store.blogManager);
  function handleLikes() {
    dispatch(likeBlog({ _id, blogs, my_blogs }));
  }
  function handleDislikes() {
    dispatch(dislikeBlog({ _id, blogs, my_blogs }));
  }
  function handleDelete() {
    dispatch(deleteBlog({ _id, blogs, my_blogs }));
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateSubmit = (formData) => {
    dispatch(
      updateBlog({
        ...formData,
        _id,
        blogs,
        my_blogs,
      })
    );
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p="4"
      mb="4"
      maxW="800px"
      mx="auto">
      <Image src={image} alt={title} maxH="400px" mx="auto" mb="4" />

      <Text fontSize="xl" fontWeight="semibold" mb="2">
        {title}
      </Text>
      <Text mb="4">{content}</Text>

      <Flex justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            icon={<AiFillLike />}
            aria-label="Like"
            size="sm"
            colorScheme="teal"
            onClick={handleLikes}
          />
          <Text>{likes}</Text>
          <IconButton
            icon={<AiFillDislike />}
            aria-label="Dislike"
            size="sm"
            colorScheme="red"
            onClick={handleDislikes}
          />
          <Text>{dislikes}</Text>
        </Stack>
        <Flex alignItems="center">
          <Text fontSize="sm" color="gray.500" mr="2">
            {new Date(createdAt).toLocaleString()}
          </Text>
          {path && path === "my-blogs" ? (
            <>
              <Button size="sm" colorScheme="blue" onClick={handleModalOpen}>
                Edit
              </Button>
              <UpdateBlogModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleUpdateSubmit}
                title={title}
                content={content}
                image={image}
              />
              <Button size="sm" colorScheme="red" ml="2" onClick={handleDelete}>
                Delete
              </Button>
            </>
          ) : null}
        </Flex>
      </Flex>
    </Box>
  );
};

export default BlogPost;
