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
import moment from "moment";

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
        <Grid size={12} sx={{ position: "relative", height: 300 }}>
          {" "}
          <img
            src={imageUrl}
            alt="quote"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="text-overlay">{quoteText}</div>
        </Grid>
        <Grid container xs={12} sx={{ p: 2 }}>
          <Grid size={6}>
            <Typography variant="body1">{userName}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography sx={{ textAlign: "center" }} variant="body1">
              {moment(creationTimestamp).format("L")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default QuoteListCard;
