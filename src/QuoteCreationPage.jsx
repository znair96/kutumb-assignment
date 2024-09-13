import { Box, Button, styled, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const QuoteCreationPage = () => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post(
      "https://crafto.app/crafto/v1.0/media/assignment/upload",
      formData,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    setMediaUrl(data[0].url);
  };
  const handleFormSubmit = async () => {
    const { data } = await axios.post(
      "https://assignment.stage.crafto.app/postQuote",
      {
        text: text,
        mediaUrl: mediaUrl,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    navigate("/quotes");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="25%"
      gap="12px"
      margin="auto"
      marginTop="6rem"
    >
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        Upload files
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      <TextField
        id="standard-basic"
        label="Enter your quote"
        variant="standard"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Button variant="contained" onClick={handleFormSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default QuoteCreationPage;
