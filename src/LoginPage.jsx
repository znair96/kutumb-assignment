import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [otp, setOTP] = useState("");
  const handleSubmitLoginForm = async (event) => {
    event.preventDefault();
    if (username && otp) {
      if (otp === "1234") {
        const { data } = await axios.post(
          "https://assignment.stage.crafto.app/login",
          {
            username: username,
            otp: otp,
          }
        );
        localStorage.setItem("token", data.token);
        // navigate("/create-quote");
        navigate("/quotes");
      }
      // navigate("/");
    } else {
      navigate("/");
    }
  };
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",

        width: "30%",
        border: "1px solid black",
        margin: "auto",
        marginTop: "8rem",
      }}
    >
      <h2>Quote Login</h2>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        display="flex"
        flexDirection="column"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitLoginForm}
      >
        <TextField
          id="standard-basic"
          label="Enter Username"
          variant="standard"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Enter OTP"
          variant="standard"
          value={otp}
          onChange={(event) => setOTP(event.target.value)}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </section>
  );
};

export default LoginPage;
