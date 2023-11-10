import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import * as React from "react";
import Image from "next/image";
import FoodModal from "../foodModal";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useState} from "react";
import NutritionModal from "../nutritionModal";


export const SearchForNutritions = () => {
    const [searchQuery, setsearchQuery] = useState(undefined);
    const [IsSearching, setIsSearching] = useState(false);
    const [SearchError, setSearchError] = useState(false);
    const {
        isLoading: isLoading,
        data: nutritions,
        refetch,
    } = useQuery({
        queryKey: ["nutritions", searchQuery],
        queryFn: async () => {
            if (searchQuery) {
                const {data} = await axios.get(`/api/food-api/${searchQuery}`)
                return data
            } else {
                return JSON.parse(localStorage.getItem("recent-nutritions")) ?? [];
            }
        },
        retry: 1,
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

    return <>
        <div className="flex px-5 py-3">
            <TextField fullWidth sx={{ "& fieldset": { borderRadius: "10px" }, "& input": { padding: "1rem" } }} label="Search" id="fullWidth" value={searchQuery || ""} onChange={(newSearchQuery) => setsearchQuery(newSearchQuery.target.value || "")} />
            <Button
                onClick={() => {
                    setIsSearching(true);
                    refetch();
                }}
                className="flex items-center rounded-lg bg-diaDarkBlue ml-4"
            >
                <Icon icon="tabler:search" className="self-center text-white h-7 w-7" />
            </Button>
        </div>
        {(SearchError || nutritions?.length === 0) && (
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
                {nutritions?.map((nutrition, i) => {
                    return <NutritionModal key={i}  nutrition={nutrition} />;
                })}
            </section>
        )}
    </>
}