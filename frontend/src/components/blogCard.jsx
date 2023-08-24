import React from "react";
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

const BlogPost = ({ title, content, image, likes, createdAt, path }) => {
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
          />
          <Text>{likes}</Text>
          <IconButton
            icon={<AiFillDislike />}
            aria-label="Dislike"
            size="sm"
            colorScheme="red"
          />
        </Stack>
        <Flex alignItems="center">
          <Text fontSize="sm" color="gray.500" mr="2">
            {new Date(createdAt).toLocaleString()}
          </Text>
          {path && path === "my-blogs" ? (
            <>
              <Button size="sm" colorScheme="blue" variant="outline">
                Edit
              </Button>
              <Button size="sm" colorScheme="red" ml="2">
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
