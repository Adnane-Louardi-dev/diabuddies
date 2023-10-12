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
import FoodModal from "../foodModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchForFood({ isSearchForAMealOpen, setIsSearchForAMealOpen }) {
  const [searchQuery, setsearchQuery] = useState(undefined);
  const [IsSearching, setIsSearching] = useState(undefined);
  const [SearchError, setSearchError] = useState(false);
  const {
    isLoading: isLoading,
    data: Data,
    refetch,
  } = useQuery({
    queryKey: ["food", searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        const result = await axios.get(`/food/api/search?categories_tags=${searchQuery}&fields=product_name,nutriments,image_url,quantity&page_size=20&json=true`, { withCredentials: true });
        console.log(result);
        let filtredData = result?.data.products.filter((value) => {
          if (value.product_name && value.nutriments.carbohydrates_100g && value.nutriments.fat_100g && value.nutriments.proteins_100g) {
            return value;
          }
        });

        return { products: filtredData };
      } else {
        const recentFood = JSON.parse(localStorage.getItem("recentFood"));
        return recentFood;
      }
    },
    enabled: IsSearching,
    onSuccess: (data) => {
      setIsSearching(false);
    },
    onError: (e) => {
      setSearchError(true);
      console.error(e);
    },
  });
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsSearching(true);
        refetch();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      refetch();
    }
  }, [searchQuery]);

  const handleClickOpen = () => {
    setIsSearchForAMealOpen("open");
  };

  const handleClose = () => {
    setIsSearchForAMealOpen("closed");
  };

  return (
    <>
      <button onClick={handleClickOpen} variant="outlined" className="grid col-span-1 w-full justify-items-center mx-2 py-2 px-3 rounded-lg ring-2 ring-diaDarkBlue bg-slate-300">
        <h2 className="font-rubik text-sm text-diaDarkBlue my-2">Search for a meal</h2>
        <Icon icon="tabler:search" className="h-10 w-10 text-diaDarkBlue" />
      </button>
      <Dialog fullScreen open={isSearchForAMealOpen === "open" ? true : false} onClose={handleClose} TransitionComponent={Transition}>
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
          <TextField fullWidth sx={{ "& fieldset": { borderRadius: "25px" }, "& input": { padding: "1rem" } }} label="Search" id="fullWidth" value={searchQuery || ""} onChange={(newSearchQuery) => setsearchQuery(newSearchQuery.target.value || "")} />
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
          <div className="grid h-screen justify-center content-center pb-32">
            <div className="flex items-start">
              <Image src={"/loading_skelton_searchForFood.png"} alt={"loading_skelton_searchForFood"} height={300} width={300} className="" />
            </div>
            <div className="text-center my-2">
              <h2 className="text-3xl font-poppins font-semibold text-diaDarkBlue">Fetching Food . . .</h2>
            </div>
          </div>
        ) : (
          <section className="p-3">
            {Data?.products.map((product, i) => {
              return <FoodModal key={i} props={product} />;
            })}
          </section>
        )}

        {/* <FoodModal /> */}
      </Dialog>
    </>
  );
}
