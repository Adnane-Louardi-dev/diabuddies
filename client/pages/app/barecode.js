import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import { AppBar, Toolbar, IconButton, Typography, TextField, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingCircle from "../../components/loadingCircle";
import FoodModal from "../../components/foodModal";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function Barecode() {
  const router = useRouter();
  const [barecode, setBarecode] = useState("");
  const [food, setFood] = useState(undefined);
  const {
    isLoading: isLoading,
    isError,
    data,
    refetch,
  } = useQuery({
    queryKey: ["foodBarecode", barecode],
    queryFn: async () => {
      const result = await axios.get(`/food/api/product/${barecode}&fields=product_name,nutriments,image_url,quantity`, { withCredentials: true });
      console.log(result.data);
      return result.data;
    },
    enabled: barecode !== "",
    onError: () => {
      console.log("no data found");
    },
  });
  const { ref } = useZxing({
    onDecodeResult(result) {
      setBarecode(result.getText());
      refetch();
    },
  });
  const handleClose = () => {
    router.push("/app/add");
  };

  return (
    <div className="bg-diaDarkBlue p-3 min-h-[100vh]">
      <AppBar sx={{ position: "relative", borderRadius: "10px" }} className="bg-white my-3 text-diaDarkBlue">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <Icon icon="mingcute:left-line" className="h-7 w-7" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" className="font-poppins">
            Scan Barecode
          </Typography>
        </Toolbar>
      </AppBar>

      <section className="flex flex-col justify-center my-10">
        <div className="text-center mb-20">
          <h1 className="font-sourceCode font-semibold text-white text-lg">Place the barecode inside area</h1>
          <p className="font-sourceCode text-xs my-2 text-white">scanning will starts automatically</p>
        </div>
        <div className="self-center relative">
          <video ref={ref} style={{ borderRadius: "25px" }} />
        </div>
      </section>
      <section className="bg-white rounded-lg mb-5">
        <Paper component="form" sx={{ p: "4px 4px", display: "flex", alignItems: "center", width: "full" }}>
          <InputBase
            onChange={(event) => {
              setBarecode(event.target.value);
            }}
            value={barecode}
            type="number"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search By Barecode Number"
            inputProps={{ "aria-label": "search google maps" }}
            disabled={barecode === ""}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            disabled={barecode === ""}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => {
              refetch();
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <section className="grid items-center gap-3">
          {barecode !== "" ? (
            isLoading ? (
              <LoadingCircle />
            ) : !isError ? (
              <FoodModal props={data.product} />
            ) : (
              <div className="p-5">
                <div className="flex p-3 items-center justify-center rounded-lg bg-diaRed">
                  <h1 className="font-rubik text-lg text-white">No food found by this barecode</h1>
                </div>
              </div>
            )
          ) : null}
        </section>
      </section>

      <Button onClick={handleClose} className="w-full p-3 my-3 shadow-md bg-blue-600 text-white font-poppins font-xl">
        Accept
      </Button>
      {/* <p>
          <span>Last result:</span>
          <span>{result}</span>
        </p> */}
    </div>
  );
}
