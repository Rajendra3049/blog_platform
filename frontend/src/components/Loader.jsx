import React from "react";
import { Box, Skeleton } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p="4"
        mb="4"
        maxW="800px"
        mx="auto">
        <Skeleton height="20px" mb="2" />
        <Skeleton height="200px" mb="4" />
        <Skeleton height="16px" width="50%" mb="2" />
        <Skeleton height="16px" width="80%" mb="2" />
        <Skeleton height="16px" width="70%" mb="2" />
      </Box>{" "}
      <Box
        borderWidth="1px"
        borderRadius="md"
        p="4"
        mb="4"
        maxW="800px"
        mx="auto">
        <Skeleton height="20px" mb="2" />
        <Skeleton height="200px" mb="4" />
        <Skeleton height="16px" width="50%" mb="2" />
        <Skeleton height="16px" width="80%" mb="2" />
        <Skeleton height="16px" width="70%" mb="2" />
      </Box>
    </>
  );
};

export default LoadingSkeleton;
