import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
  const [IsSearching, setIsSearching] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [SearchError, setSearchError] = useState(false);
  const {
    isLoading: isLoading,
    data: Data,
    refetch,
  } = useQuery({
    queryKey: ["food", searchQuery],
    queryFn: async () => {
      const result = await axios.get(`/food/api/search?categories_tags=${searchQuery}&fields=product_name,nutriments,image_url,quantity&page_size=5&json=true`, { withCredentials: true });
      console.log(result);
      return result.data;
    },
    enabled: IsSearching,
    onSuccess: (data) => {
      //if we want to cache it later
      navigator.serviceWorker?.controller?.postMessage({ action: "food", data: data });
      setIsSearching(false);
    },
    onError: (e) => {
      setSearchError(true);
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
    console.log(IsSearching);
  }, [Data, IsSearching]);

  return (
    <>
      <button onClick={handleClickOpen} variant="outlined" className="grid col-span-1 w-full justify-items-center mx-2 py-2 px-3 rounded-lg ring-2 ring-diaDarkBlue bg-slate-300">
        <h2 className="font-rubik text-sm text-diaDarkBlue my-2">Search for a meal</h2>
        <Icon icon="tabler:search" className="h-10 w-10 text-diaDarkBlue" />
      </button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className="p-2">
          <AppBar sx={{ position: "relative", borderRadius: "10px" }} className="bg-diaDarkBlue">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Icon icon="mingcute:left-line" className="h-7 w-7" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" className="font-poppins">
                Add Food
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <div className="flex px-5 py-3">
          <TextField fullWidth sx={{ "& fieldset": { borderRadius: "25px" }, "& input": { padding: "10px" }, "& label": { marginY: "-5px" } }} label="Search" id="fullWidth" value={searchQuery} onChange={(newSearchQuery) => setsearchQuery(newSearchQuery.target.value)} />
          <Button
            onClick={() => {
              setIsSearching(true);
              refetch();
            }}
            className="flex items-center rounded-full bg-diaDarkBlue ml-4"
          >
            <Icon icon="tabler:search" className="self-center text-white h-7 w-7" />
          </Button>
        </div>
        {(SearchError || Data?.products.length === 0) && (
          <div className="p-5">
            <div className="flex p-3 items-center justify-center rounded-lg bg-diaRed">
              <h1 className="font-rubik text-lg text-white">No Food found</h1>
            </div>
          </div>
        )}
        {IsSearching ? (
          <div className="grid h-screen justify-center content-center">
            <LoadingCircle />
          </div>
        ) : (
          <section className="p-3">
            {Data?.products.map((product, i) => {
              return <FoodModal key={i} name={product.product_name} image={product.image_url} protein={product.nutriments.proteins_100g} fat={product.nutriments.fat_100g} carbs={product.nutriments.carbohydrates_100g} kcal={product.nutriments["energy-kcal_100g"]} weight={product.quantity} addedFood={addedFood} setAddedFood={setAddedFood} />;
            })}
          </section>
        )}

        {/* <FoodModal /> */}
      </Dialog>
    </>
  );
}
