import { useEffect, useState, useLayoutEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import TextField from "@mui/material/TextField";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useQueryClient } from "@tanstack/react-query";
import { NutrationLogInput } from "../../components/NutrationLogInput";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { AddMealNameModal } from "../../components/addMealNameModal";
import { GetSavedMealsModal } from "../../components/getSavedMealsModal";
import { nullLogBook } from "../../utils/nulls";
import { useTranslation } from "next-i18next";
import SearchForFood from "../../components/logBookDialog/searchForFood";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAddFood, useAddNewLogBook } from "../../customeHooks/useAddFood";
import {kcalCalculate, renderNumber} from "../../utils/utils";
import { useRouter } from "next/router";
import CalculatingBolus from "../../utils/calculateBolus";
import { useGetCurrentUserDetailed } from "../../customeHooks/useGetCurrentUser";
import Box from "@mui/material/Box";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
let mealsTime = {
  breakfast: { min: 5, max: 11 },
  lunch: { min: 11, max: 15 },
  snack: { min: 15, max: 19 },
  dinner: { min: 19, max: 23 },
};

//get propre meal for this time
function checkMealValidity(mealHour) {
  switch (true) {
    case mealHour >= mealsTime.breakfast.min && mealHour < mealsTime.breakfast.max:
      return "breakfast";
    case mealHour >= mealsTime.lunch.min && mealHour < mealsTime.lunch.max:
      return "lunch";
    case mealHour >= mealsTime.snack.min && mealHour < mealsTime.snack.max:
      return "snack";
    case mealHour >= mealsTime.dinner.min:
      return "dinner";
    default:
      return "meals";
  }
}
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
  const searchParams = useSearchParams()
  const { user } = useGetCurrentUserDetailed();
  const [InsulinType, setInsulinType] = useState("bolus");
  const [dateOpen, setDateOpen] = useState(false);
  const [mealModalOpen, setMealModalOpen] = useState(false);
  //won't forget this model to use it later
  const [savedMealsModalOpen, setSavedMealsModalOpen] = useState(false);
  const [isSearchForAMealOpen, setIsSearchForAMealOpen] = useState(false);
  const { foods, clearAll, removeFood } = useAddFood();
  const [data, setData] = useState({ ...nullLogBook, time: moment()._d, food: foods });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { t } = useTranslation("index");
  const { t: tc } = useTranslation("common");
  const { mutate: addNewLogBook, isLoading, isError, notification } = useAddNewLogBook();

  const handleClickCalculateBolus = () => {
    let bolusDose = CalculatingBolus(data.carbs, user.diabeticDetails.carbsRatio, user.diabeticDetails.insulinSensitivity.value, 0, data.glucose);
    return setData({ ...data, bolus: bolusDose.toFixed(1) });
  };

  useEffect(() => {
    let newMacrosBasedOnFoodChange =
      foods?.products.reduce(
        (accum, item) => {
          accum.carbs += renderNumber(parseInt(item?.nutriments.carbohydrates_100g) * item.qty * item.units) ;
          accum.protein += renderNumber(parseInt(item?.nutriments.proteins_100g) * item.qty * item.units) ;
          accum.fat += renderNumber(parseInt(item?.nutriments.fat_100g) * item.qty * item.units);
          return accum;
        },
        { ...nullLogBook, meal: checkMealValidity(moment().hours()) }
      ) ?? nullLogBook;
    newMacrosBasedOnFoodChange = foods?.recipes.reduce((accum, recipe)=>{
      accum.carbs += renderNumber(recipe.attributes.carbs * recipe.units)
      accum.protein += renderNumber(recipe.attributes.protein * recipe.units)
      accum.fat += renderNumber(recipe.attributes.fat * recipe.units)
      return accum
    },newMacrosBasedOnFoodChange)
    setData({ ...data, ...newMacrosBasedOnFoodChange });
    setInsulinType(data.basal !== 0 ? "basal" : "bolus");
    console.log(foods);
    return () => setData({ ...nullLogBook, time: moment()._d });
  }, [foods]);

  useLayoutEffect(() => {
    setData({ ...data, kcal: kcalCalculate(data) });
  }, [data.carbs, data.protein, data.fat]);

  useEffect(() => {
    const editLog = searchParams.get("log");
    if (editLog) {
      setData(JSON.parse(editLog));
    }
  }, [searchParams.get("log")]);

  const handlePOSTNewLog = () => {
    addNewLogBook(data);
    clearAll();
    setData({ ...nullLogBook, time: moment()._d });
    router.push("/app");
  };

  const handleOnChange = (event, key) => {
    if (event.target.value) {
      setData({ ...data, [key]: parseInt(event.target.value * 100) / 100 });
    } else {
      setData({ ...data, [key]: 0 });
    }
  };
  return (
    <section className="px-5">
      <AddMealNameModal mealModalOpen={mealModalOpen} setMealModalOpen={setMealModalOpen} data={data} onSave={handlePOSTNewLog} />
      <GetSavedMealsModal savedMealsModalOpen={savedMealsModalOpen} setSavedMealsModalOpen={setSavedMealsModalOpen} setData={setData} />
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
          setData({ ...data, time: newValue._d, meal: checkMealValidity(moment(newValue._d).hours()) });
        }}
        openTo="hours"
      />
      <ToggleButtonGroup
        className="w-full overflow-scroll no-scrollbar"
        sx={{
          paddingY: ".5rem",
          "& .MuiButtonBase-root": {
            backgroundColor: "white",
          },
          "& .MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover": {
            color: "#666666",
            backgroundColor: "white",
          },
          "& .MuiButtonBase-root[aria-pressed='true'].Mui-selected": {
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
        <ToggleButton value="other" className="flex items-center justify-center rounded-2xl border-none mr-3 h-10 shadow-md">
          {t("other_meal")}
        </ToggleButton>
        <ToggleButton value="breakfast" className="flex items-center justify-center rounded-2xl border-none mr-3 h-10 shadow-md">
          {t("breakfast_meal")}
        </ToggleButton>
        <ToggleButton value="lunch" className="flex items-center justify-center rounded-2xl border-none mr-3 h-10 shadow-md">
          {t("lunch_meal")}
        </ToggleButton>
        <ToggleButton value="snack" className="flex items-center justify-center rounded-2xl border-none mr-3 h-10 shadow-md">
          {t("snack_meal")}
        </ToggleButton>
        <ToggleButton value="dinner" className="flex items-center justify-center rounded-2xl border-none mr-3 h-10 shadow-md">
          {t("dinner_meal")}
        </ToggleButton>
        <ToggleButton value="sport" className="flex items-center justify-center rounded-2xl border-none mr-3 h-10 shadow-md">
          {t("other_meal")}
        </ToggleButton>
      </ToggleButtonGroup>
      <section className="grid grid-cols-2 gap-6 justify-items-center items-center my-4 py-1">
        {/* <Barecode /> */}
        <Link href={"/app/barecode"} passHref className="w-full">
          <button variant="outlined" className="grid col-span-1 w-full justify-items-center mx-2 py-2 px-3 rounded-lg ring-2 ring-diaDarkBlue bg-slate-300">
            <h2 className="font-rubik text-sm text-diaDarkBlue my-2">{t("scan_barcode")}</h2>
            <Icon icon="material-symbols:barcode" className="h-10 w-10 text-diaDarkBlue" />
          </button>
        </Link>
        <SearchForFood isSearchForAMealOpen={isSearchForAMealOpen} setIsSearchForAMealOpen={setIsSearchForAMealOpen} />
      </section>
      <div className="flex justify-between items-center">
        <h3 className="font-sourceCode text-diaGray text-md">{t("mealInfo")}</h3>
        <h3 className="font-sourceCode text-diaGreen text-sm">{`${data.kcal || 0} Kcal`}</h3>
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
          <div className="flex justify-between items-center">
            <TextField
              id="outlined-number"
              type="number"
              variant="standard"
              value={(data.bolus !== 0 ? data.bolus : data.basal) || ""}
              onChange={(event) => {
                const value = event.target.value;
                if (InsulinType === "bolus") {
                  return setData({ ...data, basal: 0, bolus: value ? parseFloat(value) : 0 });
                } else {
                  return setData({ ...data, bolus: 0, basal: value ? parseFloat(value) : 0 });
                }
              }}
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
            />
            <Button onClick={handleClickCalculateBolus} className="flex-none bg-[#334155] p-3 rounded-xl">
              <Icon icon="pajamas:retry" className="h-5 w-5 text-white self-center" />
            </Button>
          </div>

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
      <section className="my-5">
        <div className="flex justify-between items-center">
          <h3 className="font-sourceCode text-diaGray text-md">Meal's Food Added</h3>
          <Button disabled={isLoading} onClick={() => setMealModalOpen(true)} variant="filled" className="rounded-full shadow-md bg-diaDarkBlue text-white">
            <Icon icon="mingcute:bookmark-line" className="h-5 w-5" />
          </Button>
        </div>
        {foods?.products.length === 0 && foods?.recipes.length === 0 && <div className="grid items-center text-center justify-center my-3 py-5 bg-diaDarkBlue rounded-xl">
          <h2 className={"text-xl font-poppins text-gray-500 font-semibold"}>Oops!</h2>
          <p className={"font-poppins text-sm text-gray-500"}>You didn't add food yet</p>
        </div>}
        {foods?.products.length > 0 && (
            <div className="rounded-lg my-3 bg-diaDarkBlue">
              {foods.products.map((product) => {
                const carbsPerUnit = product.nutriments.carbohydrates_100g * product.qty / 100;
                return (
                  <div key={product.product_name} className="relative flex items-center justify-between mx-2 px-2 border-t-2 border-gray-700">
                    <div className="mx-2 p-2">
                      <h1 className="text-blue-500 font-poppins">{`${product.product_name}`}</h1>
                      <p className="text-gray-500 font-poppins">
                        {`${product.qty}${product.quantity?.match(/[a-zA-Z]+/g) || ""}
                         (${carbsPerUnit}g * ${product.units} = ${renderNumber(carbsPerUnit * product.units)}g carbs)`}
                      </p>
                    </div>
                    <Button
                      className="self-center"
                      onClick={() => {
                        removeFood({
                          primaryKey:"product_name",
                          itemType: "products",
                          primaryKeyValue: product.product_name});
                      }}
                    >
                      <Icon icon="ic:outline-delete" className="text-diaGray h-7 w-7" />
                    </Button>
                  </div>
                );
              })}
            </div>
        )}
        {foods?.recipes.length > 0 && (
            <div className="rounded-lg my-3 bg-diaDarkBlue">
              {foods.recipes.map((recipe) => {
                const {id, units} = recipe
                recipe = recipe.attributes;
                return (
                  <div key={recipe.name} className="relative flex items-center justify-between mx-2 px-2 border-t-2 border-gray-700">
                    <div className="mx-2 p-2">
                      <h1 className="text-blue-500 font-poppins">{recipe.name}</h1>
                      <p className="text-gray-500 font-poppins">
                        {recipe.carbs}g * {units} = {renderNumber(recipe.carbs * units)}g carbs
                      </p>
                    </div>
                    <Button
                      className="self-center"
                      onClick={() => {
                        removeFood({
                          primaryKey:"id",
                          itemType: "recipes",
                          primaryKeyValue: id});
                      }}
                    >
                      <Icon icon="ic:outline-delete" className="text-diaGray h-7 w-7" />
                    </Button>
                  </div>
                );
              })}
            </div>
        )}
      </section>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", width: "full" }}>
        <Link href={"/app"} passHref>
          <Button className="w-full p-3 rounded-full shadow-md bg-white text-gray-800 font-codeSource font-xl">{tc("cancel")}</Button>
        </Link>
        <Button disabled={isLoading} onClick={handlePOSTNewLog} variant="filled" className="w-full p-3 rounded-full shadow-md bg-gray-800 text-white  font-codeSource font-xl">
          {tc("save")}
        </Button>
      </Box>
    </section>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "index"])),
  },
});
