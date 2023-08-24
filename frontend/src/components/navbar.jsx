import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Spacer, Link, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/user/user.action";
import { resetBlogs } from "../redux/blogs/blog.action";

const Navbar = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const linkColor = useColorModeValue("gray.600", "gray.300");
  const linkHoverColor = useColorModeValue("teal.600", "teal.300");
  const { isAuth } = useSelector((store) => store.userManager);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(resetBlogs());
  };

  return (
    <Box
      bg={bgColor}
      p={4}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="md">
      <Flex align="center">
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ color: linkHoverColor }}>
          My Blog App
        </Link>
        <Spacer />
        <Box>
          <Link
            as={RouterLink}
            to="/"
            mr={4}
            fontWeight="medium"
            color={linkColor}
            _hover={{ color: linkHoverColor }}>
            Blogs
          </Link>
          <Link
            as={RouterLink}
            to="/my-blogs"
            mr={4}
            fontWeight="medium"
            color={linkColor}
            _hover={{ color: linkHoverColor }}>
            My Blogs
          </Link>
          <Link
            as={RouterLink}
            to="/login"
            fontWeight="medium"
            color={linkColor}
            _hover={{ color: linkHoverColor }}
            onClick={isAuth ? handleLogout : null}>
            {isAuth ? "Logout" : "Login"}
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
