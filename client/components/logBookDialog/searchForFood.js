import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {Tab, Tabs} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import {SearchForProducts} from "./searchForProducts";
import {SearchForRecipe} from "./searchForRecipe";
import {SearchForNutritions} from "./searchForNutritions";
import {SearchSavedMeals} from "./searchSavedMeals";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box>
              {children}
            </Box>
        )}
      </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function SearchForFood({ isSearchForAMealOpen, setIsSearchForAMealOpen }) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Dialog fullScreen open={isSearchForAMealOpen === "open"} onClose={handleClose} TransitionComponent={Transition}>
        <div className="p-2">
          <AppBar sx={{ position: "relative", borderRadius: "10px" }} className="bg-diaDarkBlue">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Icon icon="mingcute:left-line" className="h-7 w-7" />
              </IconButton>
              <div className={"flex align-middle overflow-x-hidden"}>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" alignSelf={"center"} marginX={"5px"} component="div" className="font-poppins">
                  Add
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Tabs value={value} variant={"scrollable"} onChange={handleChange} aria-label="product tabs" className={"my-3"}>
          <Tab className={"text-diaDarkBlue font-rubik font-semibold text-xl capitalize"} label="Fruits & Vegetables" {...a11yProps(2)} />
          <Tab className={"text-diaDarkBlue font-rubik font-semibold text-xl capitalize"} label="Products" {...a11yProps(0)} />
          <Tab className={"text-diaDarkBlue font-rubik font-semibold text-xl capitalize"} label="Recipes" {...a11yProps(1)} />
          <Tab className={"text-diaDarkBlue font-rubik font-semibold text-xl capitalize"} label="Saved Meals" {...a11yProps(3)} />
        </Tabs>
        <Box sx={{ width: '100%' }}>
          <CustomTabPanel value={value} index={0} className={""}>
            <SearchForProducts />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SearchForRecipe />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <SearchForNutritions />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <SearchSavedMeals handleClose={handleClose}/>
          </CustomTabPanel>
        </Box>
      </Dialog>
    </>
  );
}
