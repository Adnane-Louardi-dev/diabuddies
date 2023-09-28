import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, IconButton, Typography, InputAdornment, Select, MenuItem, TextField, Button } from "@mui/material";
import LoadingCircle from "../components/loadingCircle";
import Image from "next/image";
import {useAddFood} from "../customeHooks/useAddFood";
const Food = () => {
  const router = useRouter();
  const [Barecode, setBarecode] = useState(localStorage.getItem("barecode"));
  const [IsSearching, setIsSearching] = useState(true);
  const [SearchError, setSearchError] = useState(false);
  const {foods,addFood,removeFood} = useAddFood()
  const {
    isLoading: isLoading,
    data: Data,
    refetch,
  } = useQuery({
    queryKey: ["foodBarecode", Barecode],
    queryFn: async () => {
      const result = await axios.get(`/food/api/product/${Barecode}&fields=product_name,nutriments,image_url,quantity`, { withCredentials: true });
      console.log(result.data);
      return result.data;
    },
    enabled: IsSearching,
    onSuccess: (data) => {
      setIsSearching(false);
    },
    onError: (e) => {
      console.error(e);
      setSearchError(true);
    },
  });
  const handleClose = () => {
    //to be modified
    router.push("/");
  };
  const addFoodToLocalStorage = async () => {
    try {
      let old_data = JSON.parse(localStorage.getItem("addedFood")) || [];
      console.log(old_data);
      old_data.push(Data.product);
      localStorage.setItem("addedFood", JSON.stringify(old_data));
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(isLoading);
  }, [Data, IsSearching]);
  return (
    <>
      <div className="p-2">
        <AppBar sx={{ position: "relative", borderRadius: "10px" }} className="bg-diaDarkBlue">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Icon icon="mingcute:left-line" className="h-7 w-7" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" className="font-poppins">
              Product
            </Typography>
          </Toolbar>
        </AppBar>

        {IsSearching && isLoading ? (
          <div className="grid h-screen justify-center content-center">
            <LoadingCircle />
          </div>
        ) : (
          <>
            {SearchError || Data?.status_verbose === "product not found" ? (
              <div className="p-5">
                <div className="flex p-3 items-center justify-center rounded-lg bg-diaRed">
                  <h1 className="font-rubik text-lg text-white">No food found by this barecode</h1>
                </div>
              </div>
            ) : (
              <>
                <section className="grid grid-cols-6 justify-items-center">
                  <div className="relative col-span-2 rounded-2xl m-3 shadow-md">
                    <Image src={Data?.product.image_url} alt={Data?.product.product_name} height={150} width={100} className="" />
                  </div>
                  <div className="grid gap-4 items-center col-span-4">
                    <div className="text-2xl font-poppins text-diaDarkBlue">{Data?.product.product_name}</div>
                    <div className={"flex justify-between align-middle"}>
                      <TextField
                        variant="filled"
                        label={"quantity"}
                        className="rounded-2xl w-full font-inter"
                        defaultValue={0}
                        type={"number"}
                        sx={{
                          "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd": {
                            padding: 0,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Select defaultValue={"g"} className={"w-full"}>
                                {["g", "kg"].map((unit) => (
                                  <MenuItem key={"height" + unit} value={unit}>
                                    {unit}
                                  </MenuItem>
                                ))}
                              </Select>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                </section>
                <section>
                  <div className="px-5">
                    <Button onClick={addFoodToLocalStorage} className="w-full p-3 rounded-full shadow-md bg-gray-800 text-white font-poppins font-xl">
                      Add food
                    </Button>
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Food;
