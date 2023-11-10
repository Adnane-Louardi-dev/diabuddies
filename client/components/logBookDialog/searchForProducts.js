import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Icon} from "@iconify/react";
import * as React from "react";
import Image from "next/image";
import FoodModal from "../foodModal";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useState} from "react";


export const SearchForProducts = () => {
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
                const allProducts = JSON.parse(localStorage.getItem("all-products")) ?? {products: []};
                return allProducts;
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
        {(SearchError || Data?.products?.length === 0) && (
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
    </>
}