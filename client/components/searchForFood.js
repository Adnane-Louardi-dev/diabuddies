import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Icon } from "@iconify/react";
import FoodModal from "./foodModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingCircle from "../components/loadingCircle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchForFood({ addedFood, setAddedFood }) {
  const [searchQuery, setsearchQuery] = useState(undefined);
  const [ReadyToSearch, setReadyToSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    isLoading: isLoading,
    data: Data,
    refetch,
  } = useQuery({
    queryKey: ["food", searchQuery],
    queryFn: async () => {
      const result = await axios.get(`/food/api/search?categories_tags=${searchQuery}&fields=product_name,nutriments,image_url,quantity&page_size=5&json=true`, { withCredentials: true });
      return result.data;
    },
    enabled: ReadyToSearch,
    onSuccess: (data) => {
      //if we want to cache it later
      navigator.serviceWorker?.controller?.postMessage({ action: "food", data: data });
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  return (
    <div>
      <button onClick={handleClickOpen} variant="outlined" className="grid w-36  justify-items-center mx-2 py-2 px-3 rounded-lg ring-2 ring-diaDarkBlue bg-slate-300">
        <h2 className="font-rubik text-sm text-diaDarkBlue my-2">Search for a meal</h2>
        <Icon icon="tabler:search" className="h-10 w-10 text-diaDarkBlue" />
      </button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Food
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <div className="flex p-3">
          <TextField fullWidth label="Search" id="fullWidth" value={searchQuery} onChange={(newSearchQuery) => setsearchQuery(newSearchQuery.target.value)} />
          <Button
            onClick={() => {
              setReadyToSearch(true);
              refetch();
              setReadyToSearch(false);
            }}
            className="flex items-center rounded-lg bg-diaBlue p-1 ml-4"
          >
            <Icon icon="tabler:search" className="self-center text-white h-7 w-7 text-diaDarkBlue" />
          </Button>
        </div>
        {isLoading && !ReadyToSearch ? (
          <div className="grid h-screen justify-center content-center">
            <LoadingCircle />
          </div>
        ) : (
          <section className="p-3">
            {!isLoading && Data ? (
              <>
                {Data?.products.map((product) => {
                  return <FoodModal name={product.product_name} image={product.image_url} carbs={product.nutriments.carbohydrates_100g} kcal={product.nutriments["energy-kcal_100g"]} weight={product.quantity} addedFood={addedFood} setAddedFood={setAddedFood} />;
                })}
              </>
            ) : null}
          </section>
        )}

        {/* <FoodModal /> */}
      </Dialog>
    </div>
  );
}
