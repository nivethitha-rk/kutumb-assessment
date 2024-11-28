import React, { useState } from "react";
import {
  Grid2 as Grid,
  Divider,
  Typography,
  Avatar,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { quoteAPIInstance } from "../../api";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [otp, setOtp] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const navigate = useNavigate();

  const loginApi = async (data) => {
    try {
      const response = await quoteAPIInstance.post("login", data);
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/quote-listing");
      alert("You are successfully logged in");
    } catch {
      alert("Your login credentials are not valid");
    }
  };

  const handleSubmit = () => {
    const data = { username: userName, otp: otp };
    let isError = false;
    if (!userName) {
      setUserNameError(true);
      isError = true;
    }
    if (!otp) {
      setOtpError(true);
      isError = true;
    }
    if (!isError) {
      loginApi(data);
    }
  };

  return (
    <Grid
      sx={{ height: "90vh" }}
      container
      size={12}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid
        container
        size={{ xs: 12, sm: 5, md: 4, xl: 3 }}
        spacing={2}
        alignItems={"center"}
      >
        <Grid
          size={12}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            sx={{
              m: 1,
              width: 92,
              height: 82,
            }}
          />
        </Grid>
        <Grid size={12} textAlign={"center"}>
          <Typography
            style={{ fontSize: 20 }}
            variant="MediumFontWhite"
            fontWeight={"bolder"}
            color="#1B2559"
            marginBottom={2}
          >
            Sign In
          </Typography>
        </Grid>

        <Grid size={12}>
          <Box display="flex" width="100%" alignItems={"center"}>
            <Divider flexItem sx={{ flexGrow: 1 }}>
              {" "}
              <Typography
                style={{ color: "gray", fontSize: 15 }}
                variant="MediumFontWhite"
              >
                Enter User Name (&) OTP
              </Typography>
            </Divider>
          </Box>
        </Grid>
        <Grid size={12} justifyContent={"center"}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="User Name"
            id="userName"
            onChange={(e) => {
              setUserName(e.target.value);
              setUserNameError(false);
            }}
            autoFocus
            value={userName}
          />
          {userNameError && (
            <Typography color="error"> Please enter User name </Typography>
          )}
        </Grid>
        <Grid size={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="OTP"
            label="OTP"
            onChange={(event) => {
              setOtp(event.target.value);
              setOtpError(false);
            }}
            value={otp}
          />
          {otpError && <Typography color="error">Please enter OTP</Typography>}
        </Grid>
        <Grid size={12}>
          <Button
            variant="submitButton"
            fullWidth
            autoFocus
            onClick={() => handleSubmit()}
          >
            <Typography style={{ fontSize: 17 }} variant="MediumFontWhite">
              Sign In
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
