import react, { useState } from "react";
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
import "./style.css";

const QuoteListCard = ({
  quoteText,
  creationTimestamp,
  userName,
  imageUrl,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container direction="column">
        <Grid item xs={12} sx={{ position: "relative", height: 300 }}>
          {" "}
          <img
            src={imageUrl}
            alt="quote"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="text-overlay">{quoteText}</div>
        </Grid>
        <Grid item container xs={12} sx={{ p: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body1">{userName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ textAlign: "right" }} variant="body1">
              {creationTimestamp}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default QuoteListCard;
