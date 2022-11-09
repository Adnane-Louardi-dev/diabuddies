import React, { useEffect, useState } from "react";
import "./App.css";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import top100Films from "./films";

function App() {
  return (
    <div className="flex text-center justify-center content-center align-center">
      <Autocomplete
        disablePortal
        options={top100Films}
        getOptionLabel={(option) => option.title}
        sx={{ width: 300 }}
        renderInput={(param) => <TextField {...param} label="Movie" />}
      />
    </div>
  );
}

export default App;
