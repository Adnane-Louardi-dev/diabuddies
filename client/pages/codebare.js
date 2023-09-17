import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import { AppBar, Toolbar, IconButton, Typography, TextField, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export default function Codebare() {
  const router = useRouter();
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      localStorage.setItem("codeBare", result.getText());
    },
  });
  useEffect(() => {
    if (result) {
      localStorage.setItem("codeBare", result);
    }
  }, [result]);

  const handleClose = () => {
    router.push("/searchForFood");
  };

  return (
    <div className="bg-diaDarkBlue px-3 h-[100vh]">
      <AppBar sx={{ position: "relative", borderRadius: "10px" }} className="bg-white my-3 text-diaDarkBlue">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <Icon icon="mingcute:left-line" className="h-7 w-7" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" className="font-poppins">
            Scan Codebare
          </Typography>
        </Toolbar>
      </AppBar>
      <section className="flex flex-col justify-center my-24">
        <div className="text-center mb-20">
          <h1 className="font-sourceCode font-semibold text-white text-lg">Place the codebare inside area</h1>
          <p className="font-sourceCode text-xs my-2 text-white">scanning will starts automatically</p>
        </div>
        <div className="self-center">
          <video ref={ref} style={{ borderRadius: "25px" }} />
        </div>
      </section>
      <section className="bg-white rounded-lg">
        <TextField
          id="outlined-controlled"
          label="Barecode"
          value={result}
          onChange={(event) => {
            setResult(event.target.value);
          }}
          className="w-full"
        />
      </section>

      <Button onClick={handleClose} className="w-full p-3 rounded-lg my-3 shadow-md bg-blue-600 text-white font-poppins font-xl">
        Accept
      </Button>
      {/* <p>
          <span>Last result:</span>
          <span>{result}</span>
        </p> */}
    </div>
  );
}
