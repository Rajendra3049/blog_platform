import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userSignup } from "../redux/user/user.action";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, loading } = useSelector((store) => store.userManager);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    if (isLogin) {
      dispatch(userLogin({ email, password }));
      navigate("/");
    } else {
      dispatch(userSignup({ name, email, password }));
      navigate("/login");
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center">
      <Heading mb={4}>{isLogin ? "Login" : "Sign Up"}</Heading>
      <Box width="300px">
        <Stack spacing={3}>
          {!isLogin && (
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            onClick={handleLogin}
            isLoading={loading}
            isDisabled={
              isLogin
                ? email === "" || password === ""
                : email === "" || password === "" || name === ""
            }>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <Text textAlign="center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={toggleForm}
              isDisabled={isAuth}
              ml={1}>
              {isLogin ? "Sign up" : "Login"}
            </Button>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
