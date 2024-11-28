import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

import { quoteAPIInstance } from "../../api";

const QuoteCreation = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [mediaUrl, setMediaurl] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload an image before submitting!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data) {
        setMediaurl(data.mediaUrl);
      }

      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Failed to upload the image.");
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleCreateQuote = async () => {
    const data = { text: "This is a quote", mediaUrl: mediaUrl };
    try {
      const response = await quoteAPIInstance.post("postQuote", data);

      alert("You have successfully created the quote");
    } catch {
      alert("Error while creating the quote");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
      }}
    >
      <Typography>Upload an Image</Typography>
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Choose File
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUploadImage}
        disabled={!image}
      >
        Upload the image
      </Button>

      <TextField
        id="standard-basic"
        label="Add Quote Text"
        variant="standard"
        value={text}
        onChange={handleTextChange}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateQuote}
        disabled={!image}
      >
        Create Quote
      </Button>
    </Box>
  );
};

export default QuoteCreation;
