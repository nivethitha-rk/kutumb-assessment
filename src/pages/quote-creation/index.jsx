import React, { useState } from "react";

import { Box, Button, Typography, TextField } from "@mui/material";

import { quoteAPIInstance } from "../../api";

import "./style.css";

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
        setMediaurl(data[0].url);
      }

      alert("Image uploaded successfully!");
    } catch (error) {
      alert(
        "Failed to upload the image. Please make sure to upload the right format"
      );
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleCreateQuote = async () => {
    setText("");
    const data = { text: "This is a quote", mediaUrl: mediaUrl };
    try {
      const response = await quoteAPIInstance.post("postQuote", data);
      alert("You have successfully created the quote");
    } catch {
      alert("Error while creating the quote");
    }
  };

  return (
    <>
      <Typography className="quoteCreationHeader">Quote Creation</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 2,
          m: 10,
        }}
      >
        <Typography>
          To Upload an Image
          <Button variant="contained" component="label" sx={{ ml: 2 }}>
            Choose File
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Typography>

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
          className="createQuoteBtn"
          onClick={handleCreateQuote}
          disabled={!image}
        >
          Create Quote
        </Button>
      </Box>
    </>
  );
};

export default QuoteCreation;
