import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { NutrationLogInput } from "../components/NutrationLogInput";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { AddMealNameModal } from "../components/addMealNameModal";
import { GetSavedMealsModal } from "../components/getSavedMealsModal";
import { nullLogBook } from "../utils/nulls";
import { useTranslation } from "next-i18next";
import SearchForFood from "../components/logBookDialog/searchForFood";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addNewLogBook, useAddFood, useAddNewLogBook } from "../customeHooks/useAddFood";
import { kcalCalculate } from "../utils/utils";
import { useRouter } from "next/router";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="${encodeURIComponent(theme.palette.getContrastText(theme.palette.primary.main))}" d="M5 18h14v-6.969C19 7.148 15.866 4 12 4s-7 3.148-7 7.031V18Zm7-16c4.97 0 9 4.043 9 9.031V20H3v-8.969C3 6.043 7.03 2 12 2ZM9.5 21h5a2.5 2.5 0 0 1-5 0Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="18" viewBox="0 0 14 14"%3E%3Cpath fill="${encodeURIComponent(theme.palette.getContrastText(theme.palette.primary.main))}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m.5 13.5l13-13M6 13.5h2M8.73.84A4.51 4.51 0 0 0 2.5 5v2.5M3 11h10.5a2 2 0 0 1-2-2V5a4.42 4.42 0 0 0-.5-2"%2F%3E%3C%2Fsvg%3E')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function NewLogDialog() {
  const router = useRouter();
  const [InsulinType, setInsulinType] = useState("bolus");
  const [dateOpen, setDateOpen] = useState(false);
  const [mealModalOpen, setMealModalOpen] = useState(false);
  //won't forget this model to use it later
  const [savedMealsModalOpen, setSavedMealsModalOpen] = useState(false);
  const [isSearchForAMealOpen, setIsSearchForAMealOpen] = useState(false);
  const { foods, clearAll, removeFood } = useAddFood();
  const [data, setData] = useState({ ...nullLogBook, time: moment()._d, food: foods });
  const queryClient = useQueryClient();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { t } = useTranslation("index");
  const { t: tc } = useTranslation("common");
  const { mutate: addNewLogBook, isLoading, isError, notification } = useAddNewLogBook();

  useEffect(() => {
    setData({ ...data, kcal: kcalCalculate(data) });
  }, [data]);

  useEffect(() => {
    setInsulinType(data.basal !== 0 ? "basal" : "bolus");
    let newMacrosBasedOnFoodChange =
      foods?.reduce(
        (accum, item) => {
          accum.carbs += (parseInt(item?.nutriments.carbohydrates_100g) * item.qty) / 100;
          accum.protein += (parseInt(item?.nutriments.proteins_100g) * item.qty) / 100;
          accum.fat += (parseInt(item?.nutriments.fat_100g) * item.qty) / 100;
          return accum;
        },
        { ...nullLogBook }
      ) ?? nullLogBook;
    newMacrosBasedOnFoodChange.kcal = kcalCalculate(newMacrosBasedOnFoodChange);
    setData({ ...data, ...newMacrosBasedOnFoodChange });
    console.log(foods);
  }, [foods]);

  const handlePOSTNewLog = async () => {
    await addNewLogBook(data);
    clearAll();
    setData({ ...nullLogBook, time: moment()._d });
    router.push("/");
  };

  const handleClose = () => {
    setNotificationOpen(false);
  };

  const handleOnChange = (event, key) => {
    if (event.target.value) {
      setData({ ...data, [key]: parseInt(event.target.value * 100) / 100 });
    } else {
      setData({ ...data, [key]: 0 });
    }
  };
  return (
    <section className="p-5">
      <AddMealNameModal mealModalOpen={mealModalOpen} setMealModalOpen={setMealModalOpen} data={data} onSave={handlePOSTNewLog} />
      <GetSavedMealsModal savedMealsModalOpen={savedMealsModalOpen} setSavedMealsModalOpen={setSavedMealsModalOpen} setData={setData} />
      {notification}
      <Box sx={{ display: "flex" }}>
        <CircularProgress hidden={!isLoading} />
      </Box>

      {/* date pickers */}
      <MobileDateTimePicker
        className="w-full my-5"
        renderInput={(props) => (
          <TextField
            {...props}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon icon="ic:round-access-time-filled" className="h-7 w-7" />
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: 10,
              backgroundColor: "#F3FAFF",
              "& fieldset": { borderRadius: 10, boxShadow: "0px 0px 20px -10px" },
              "& .MuiInputBase-input": {
                textAlign: "center",
                fontFamily: "poppins",
              },
            }}
          />
        )}
        value={data.time}
        onChange={(newValue) => {
          setData({ ...data, time: newValue._d });
        }}
        openTo="hours"
      />
      <section>
        <ToggleButtonGroup
          className="w-full overflow-scroll no-scrollbar"
          sx={{
            "& .MuiButtonBase-root-MuiToggleButton-root": {
              backgroundColor: "#F3FAFF",
            },
            "& .MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover": {
              color: "#3AB0FF",
            },
            "& .MuiButtonBase-root[aria-pressed='true']": {
              backgroundColor: "#1e293b",
              color: "white",
            },
          }}
          value={data.meal}
          exclusive
          onChange={(event, newAlignment) => {
            setData({ ...data, meal: newAlignment });
          }}
          aria-label="Platform"
        >
          <ToggleButton value="other" className="rounded-full border-none mr-3 mb-5 shadow-md">
            {t("other_meal")}
          </ToggleButton>
          <ToggleButton value="breakfast" className="rounded-full border-none mr-3 mb-5 shadow-md">
            {t("breakfast_meal")}
          </ToggleButton>
          <ToggleButton value="lunch" className="rounded-full border-none mr-3 mb-5 shadow-md">
            {t("lunch_meal")}
          </ToggleButton>
          <ToggleButton value="snack" className="rounded-full border-none mr-3 mb-5 shadow-md">
            {t("snack_meal")}
          </ToggleButton>
          <ToggleButton value="dinner" className="rounded-full border-none mr-3 mb-5 shadow-md">
            {t("dinner_meal")}
          </ToggleButton>
          <ToggleButton value="sport" className="rounded-full border-none mr-3 mb-5 shadow-md">
            {t("other_meal")}
          </ToggleButton>
        </ToggleButtonGroup>
      </section>
      <section className="grid grid-cols-2 gap-6 justify-items-center items-center my-3 py-1">
        {/* <Barecode /> */}
        <Link href={"/barecode"} passHref className="w-full">
          <button variant="outlined" className="grid col-span-1 w-full justify-items-center mx-2 py-2 px-3 rounded-lg ring-2 ring-diaDarkBlue bg-slate-300">
            <h2 className="font-rubik text-sm text-diaDarkBlue my-2">{t("scan_barcode")}</h2>
            <Icon icon="material-symbols:barcode" className="h-10 w-10 text-diaDarkBlue" />
          </button>
        </Link>
        <SearchForFood isSearchForAMealOpen={isSearchForAMealOpen} setIsSearchForAMealOpen={setIsSearchForAMealOpen} />
      </section>
      <div className="flex justify-between items-center">
        <h3 className="font-sourceCode text-diaGray text-md">{t("mealInfo")}</h3>
        <h3 className="font-sourceCode text-diaGreen text-sm">{`${data.kcal} Kcal`}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 my-3">
        <NutrationLogInput
          label={tc("glucose")}
          textColor={"text-blue-400"}
          bgColor={"bg-blue-400"}
          icon={"system-uicons:cubes"}
          inputAdornmentLabel={"mg/dL"}
          value={data.glucose}
          onChange={(event) => {
            const value = event.target.value;
            setData({ ...data, glucose: value ? parseFloat(value) : 0 });
          }}
        />
        <NutrationLogInput
          label={tc("carbs")}
          textColor={"text-gray-400"}
          bgColor={"bg-gray-400"}
          icon={"fluent:food-grains-20-regular"}
          inputAdornmentLabel={"g"}
          value={data.carbs}
          onChange={(event) => {
            handleOnChange(event, "carbs");
          }}
        />
        <div className={`p-2.5 bg-diaDarkBlue rounded-xl shadow-md col-span-2`}>
          <div className="flex justify-between items-center">
            <div className="flex">
              <Icon icon={"fluent:syringe-20-regular"} className={`bg-white text-diaDarkBlue rounded-full self-center m-1 p-1 h-7 w-7`} />
              <p className="text-white font-rubik font-sm self-center">{tc("insulin")}</p>
            </div>
            <div className="flex justify-around items-center">
              <Android12Switch defaultChecked={false} />
              <Icon icon="ri:notification-line" className="bg-diaOrange text-white rounded-full h-7 w-7 p-1" />
            </div>
          </div>
          <TextField
            id="outlined-number"
            type="number"
            variant="standard"
            placeholder="0"
            sx={{
              marginY: 2,
              marginX: 1,
              paddingX: "10px",
              textAlign: "center",
              borderRadius: "15px",
              backgroundColor: "#334155",
              width: "full",
              "& .MuiInputBase-root::after, .MuiInputBase-root::before": {
                display: "none",
              },
              "& .MuiInputBase-input": {
                fontSize: 25,
                fontStyle: "bold",
                width: "full",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    "& .MuiTypography-root": {
                      display: "flex",
                    },
                    marginRight: 3,
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  <Icon icon="ph:drop-light" className="text-white mx-1 h-5 w-5" />
                  {t("dose")}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    "& .MuiTypography-root": {
                      color: "white",
                      fontSize: 14,
                    },
                  }}
                >
                  UI
                </InputAdornment>
              ),
              style: {
                color: "white",
              },
            }}
            value={data.bolus !== 0 ? data.bolus : data.basal}
            onChange={(event) => {
              const value = event.target.value;
              if (InsulinType === "bolus") {
                setData({ ...data, basal: 0, bolus: value ? parseFloat(value) : 0 });
              } else {
                setData({ ...data, bolus: 0, basal: value ? parseFloat(value) : 0 });
              }
              console.log("data", data);
            }}
          />
          <div className="flex items-center justify-center mb-3">
            <ToggleButtonGroup
              color="primary"
              value={InsulinType}
              exclusive
              onChange={(event, newAlignment) => {
                if (newAlignment != null) {
                  setInsulinType(newAlignment);
                }
              }}
              aria-label="Platform"
              sx={{
                backgroundColor: "white",
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 3,
                width: "full",
                borderRadius: "25px",
                justifyContent: "space-between",
                "& .MuiToggleButtonGroup-root , .MuiButtonBase-root": {
                  paddingY: "5px",
                  color: "#FFB562",
                },
                "& .MuiToggleButtonGroup-grouped:not(:last-of-type),.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                  borderRadius: "25px",
                },
                "& .MuiButtonBase-root[aria-pressed='true']": {
                  backgroundColor: "#FFB562",
                  color: "white",
                },
              }}
            >
              <ToggleButton value="bolus">{t("short")}</ToggleButton>
              <ToggleButton value="basal">{t("long")}</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <NutrationLogInput
          label={tc("protein")}
          textColor={"text-amber-300"}
          bgColor={"text-amber-300"}
          icon={"fluent-emoji-high-contrast:cut-of-meat"}
          inputAdornmentLabel={"g"}
          value={data.protein}
          onChange={(event) => {
            handleOnChange(event, "protein");
          }}
        />
        <NutrationLogInput
          label={tc("fat")}
          textColor={"text-red-400"}
          bgColor={"bg-red-400"}
          icon={"circum:pizza"}
          inputAdornmentLabel={"g"}
          value={data.fat}
          onChange={(event) => {
            handleOnChange(event, "fat");
          }}
        />
      </div>
      {foods?.length > 0 ? (
        <>
          <h3 className="font-sourceCode text-diaGray text-md">Meal's Food Added</h3>
          <div className="rounded-lg my-3 bg-diaDarkBlue">
            {foods.map((food, i) => {
              return (
                <div key={i} className="flex items-center justify-between mx-2 border-t-2 border-gray-700">
                  <div className="mx-2 p-2">
                    <h1 className="text-blue-500 font-poppins">{`${food.product_name}`}</h1>
                    <p className="text-gray-500 font-poppins">{`${food.qty}${food.quantity?.match(/[a-zA-Z]+/g) || ""} (${(food.nutriments.carbohydrates_100g * food.qty) / 100}g carbs)`} </p>
                  </div>
                  <Button
                    className="self-center"
                    onClick={() => {
                      removeFood(food.id);
                    }}
                  >
                    <Icon icon="ic:outline-delete" className="text-diaGray h-7 w-7" />
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="grid items-center text-center justify-center my-3 py-5 bg-diaDarkBlue rounded-xl">
          <Image
            src={"/No-data-cuate.webp"}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
            height={300}
            width={200}
            alt="no data in blue folder"
          />
          <h2 className={"text-xl font-poppins text-gray-500 font-semibold"}>Oops!</h2>
          <p className={"font-poppins text-sm text-gray-500"}>You didn't add food yet</p>
        </div>
      )}

      <DialogActions sx={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(3, minmax(0, 1fr))", width: "full" }}>
        <Link href={"/"}>
          <Button className="w-full p-3 rounded-full shadow-md text-gray-800 font-codeSource font-xl">{tc("cancel")}</Button>
        </Link>
        <Button disabled={isLoading} onClick={handlePOSTNewLog} variant="filled" className="w-full p-3 rounded-full shadow-md bg-gray-800 text-white  font-codeSource font-xl">
          {tc("save")}
        </Button>
        <Button disabled={isLoading} onClick={() => setMealModalOpen(true)} variant="filled" className="w-full p-3 rounded-full shadow-md bg-gray-800 text-white  font-codeSource font-xl">
          {t("save_as_meal")}
        </Button>
      </DialogActions>
    </section>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "index"])),
  },
});
