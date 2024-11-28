import React, { useState, useEffect } from "react";
import {
  Grid2 as Grid,
  Divider,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { quoteAPIInstance } from "../../api";
import QuoteListCard from "../../components/quote-list-card";
import "./style.css";

export default function QuoteListing() {
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    quoteAPIInstance
      .get(`getQuotes?limit=20&offset=${offset}`)
      .then((response) => setResults([...results, ...response.data.data]))
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

  const handleCreationBtn = () => {
    navigate("/quote-creation");
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + 20);
  };

  //console.log(results);

  /*
          createdAt : "2024-06-24T09:32:30.000Z"
          id : 1
          mediaUrl : "https://media.crafto.app/home/900x900/4653c87a-83f8-4326-afa0-1a06086550ef?dimension=900x900"
          text : "testing"
          updatedAt : "2024-06-24T09:32:30.000Z"
          username : "sandy"

          pass as props --> createdAt, mediaUrl, text, username
        */

  return (
    <>
      <Grid container spacing={2}>
        <Grid container size={12} justifyContent="center" alignItems="center">
          <Grid size={6}>
            <Typography variant="h4">Quote Lists</Typography>
          </Grid>
          <Grid size={6}>
            <Button
              variant="contained"
              id="createQuoteBtn"
              onClick={handleCreationBtn}
            >
              Create Quote
            </Button>
          </Grid>
        </Grid>

        {results.map((quote) => (
          <Grid size={3} key={quote.id}>
            <QuoteListCard
              quoteText={quote.text}
              creationTimestamp={quote.createdAt}
              userName={quote.username}
              imageUrl={quote.mediaUrl}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleLoadMore} id="loadMoreBtn">
        Load More
      </Button>
    </>
  );
}
