import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import {Modal, Pagination} from "@mui/material";
import Button from "@mui/material/Button";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import LoadingCircle from "./loadingCircle";
import {Breakfast, Dinner, Glucose, Lunch, Snack} from "./mealIcons";
import {Icon} from "@iconify/react";
import moment from "moment/moment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export const GetSavedMealsModal = ({savedMealsModalOpen,setSavedMealsModalOpen,setData}) => {
    const {data:savedMeals, isLoading} = useQuery(["savedMeals"], ()=>{
        return axios.get("/api/logbook/meals")
            .then(res => res.data)
            .catch(()=>([]))
    })
    const [currentPage, setCurrentPage] = useState(1)

    const getMealIcon = React.useCallback((mealTime) =>{
        const mealTimes = {
            "breakfast": <Breakfast/>,
            "lunch": <Lunch/>,
            "dinner": <Dinner/>,
            "snack": <Snack/>,
        }
        if(mealTime) {
            return mealTimes[mealTime] ?? <Glucose />
        }
        return <Glucose />
    },[])
    if(isLoading){
        return <LoadingCircle />
    }
    return <Modal
        open={savedMealsModalOpen}
        onClose={() => setSavedMealsModalOpen(false)}
        aria-labelledby="meal-modal"
        aria-describedby="meal-modal-creation"
    >
        <Box sx={style}>
            <div className={"h-[450px]"}>
                {savedMeals.slice(5*(currentPage-1),5*currentPage).map(({whenEated,mealName,kcal,carbs,protein,fat,basal,bolus},i) => (
                    <div onClick={()=>{
                        setData({
                            time: moment()._d,
                            meal:whenEated,
                            kcal,
                            carbs,
                            protein,
                            fat,
                            basal,
                            bolus})
                        setSavedMealsModalOpen(false)
                    }}
                         key={i}
                        className="grid grid-cols-6 gap-5 p-3 mb-2 rounded-lg shadow-lg border-r-4 border-diaDarkBlue bg-white cursor-pointer">
                        <div className="self-start col-span-1 flex items-center p-1 bg-diaDarkBlue h-12 w-12 rounded-full shadow-md">
                            {getMealIcon(whenEated)}
                        </div>
                        <div className="grid gap-2 col-span-5">
                            <div className="flex justify-between items-center">
                                <h4 className="font-sourceCode font-bold text-diaDarkBlue text-lg">{mealName}</h4>
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center p-1 text-white rounded-lg bg-diaDarkBlue">
                                        <Icon icon="fluent:food-grains-20-regular" className="mx-1" />
                                        <span className="font-sourceCode text-xs">Carbs</span>
                                        <span className="font-sourceCode font-bold mx-2">{`${carbs} g`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination count={Math.ceil(savedMeals.length/5)}
                        onChange={(e,page)=>{
                            setCurrentPage(page)
                        }}
                        variant="outlined"
                        shape={"rounded"}/>
            <Box sx={{width: "full" }}>
                <Button onClick={() => setSavedMealsModalOpen(false)}
                    className="w-full p-3 mt-3 rounded-full text-gray-800 font-codeSource font-xl">
                    Cancel
                </Button>
            </Box>
        </Box>
    </Modal>
}