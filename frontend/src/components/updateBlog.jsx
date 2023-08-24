import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const UpdateBlogModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  content,
  image,
}) => {
  const [updateTitle, setTitle] = useState(title);
  const [updateContent, setContent] = useState(content);
  const [updateImage, setImage] = useState(image);

  const isFormValid = title && content && image;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ updateTitle, updateContent, updateImage });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Blog</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter title"
              value={updateTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Content</FormLabel>
            <Textarea
              placeholder="Enter content"
              value={updateContent}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Image URL</FormLabel>
            <Input
              placeholder="Enter image URL"
              value={updateImage}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={!isFormValid}>
            Update Blog
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateBlogModal;
