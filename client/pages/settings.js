import React, {useState} from "react";
import {Alert, Button, Grid, Input, InputAdornment, Snackbar} from "@mui/material";
import TextField from "@mui/material/TextField";
import {SettingsCard} from "../components/SettingsCard";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {Controller, useForm} from "react-hook-form";
import {SettingMedication} from "../components/SettingMedication";
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import {heightUnits, insulinUnits, weightUnits} from "../utils/units";
import {AddMedicamentModal} from "../components/AddMedicamentModal";
import Image from "next/image";
import LoadingCircle from "../components/loadingCircle";
import {useGetCurrentUser} from "../customeHooks/useGetCurrentUser";
import {useMutation} from "@tanstack/react-query";
import {Logo} from "../components/Logo";
import Container from "@mui/material/Container";

const Settings = () => {
  const {register, control, handleSubmit, reset} = useForm();
  const router = useRouter();
  const {user, isLoading} = useGetCurrentUser()
  const [notificationOpen, setNotificationOpen] = useState(false);

  const {mutate: updateUser, isError, isLoading: updateUserLoading} = useMutation({
    mutationKey: "updateUser",
    mutationFn: (data) => {
      return axios
          .post(
              "/api/user/",
              {...user, ...data},
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
          )
    },
    onError: (e) => {
      console.error(e)
    },
    onSettled: () => {
      setNotificationOpen(true)
    }
  })
  const handleClose = () => {
    setNotificationOpen(false)
  }
  const updateUserSettings = async (data) => {
    console.log("create user", data)
    if (data.newPassword) {
      if (data.confirmPassword === data.newPassword) {
        axios.post("/api/user/changePassword", {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        });
      }
      alert("passwords must match");
      return;
    }
    await updateUser(data)
  };

  const UserInput = React.useCallback(({ fieldName, label, ...props }) => {
    return (
      <div className={"flex justify-between align-middle "}>
        <TextField
          variant="outlined"
          label={label}
          className="rounded-2xl w-full font-inter"
          {...register(fieldName)}
          {...props}
          defaultValue={props.defaultValue}
        />
      </div>
    );
  }, []);

  if (isLoading) {
    return (
        <LoadingCircle/>
    );
  }
  return (
      <Container maxWidth={"xl"}>
        <form onSubmit={handleSubmit(updateUserSettings)}>
          <Logo/>
          <section className={"flex justify-between"}>
            <h3 className={"text-2xl font-inter text-diaGray"}>Profile</h3>
            <div>
              <Button className={"text-gray-500"}>Cancel</Button>
              <Button type={"submit"} className={"bg-diaBlue text-white"}>
                Save
              </Button>
            </div>
          </section>
          <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={isError ? "danger" : "success"} sx={{width: '100%'}}>
              {isError ? "There was an error while modifying your profile" : "Profile was modified successfully"}
            </Alert>
          </Snackbar>
          <LoadingCircle hidden={!updateUserLoading}/>

          <Grid container rowSpacing={3}>
            {/* profile */}
            <Grid item xs={12}>
              <div className="grid grid-cols-1 items-center justify-items-center">
                <Image src={user.photo} width={100} height={100} alt={user.userName + " picture"}
                       className="rounded-full"/>
                <Button type={"submit"}
                        className="ring-1 ring-diaGray text-diaGray m-5 bg-transparent font-semibold font-rubik">
                  Change profile picture
                </Button>
              </div>
              <SettingsCard sectionTitle={"Profile"}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                  <Grid item xs={12}>
                    <UserInput defaultValue={user.givenName} fieldName={"givenName"} label={"First name"}/>
                  </Grid>
                  <Grid item xs={12}>
                    <UserInput defaultValue={user.familyName} fieldName={"familyName"} label={"Last name"}/>
                  </Grid>
                  <Grid item xs={12}>
                    <UserInput defaultValue={user.email} fieldName={"email"} label={"Email"}/>
                  </Grid>
                  <Grid item xs={12}>
                    <UserInput defaultValue={user.userName} fieldName={"userName"} label={"userName"}/>
                  </Grid>
                  <Grid item xs={6}>
                    <UserInput defaultValue={user.age} fieldName={"age"} label={"Age"} type={"number"}/>
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                        name={"gender"}
                        control={control}
                        defaultValue={user.gender || "Gender"}
                        render={({field}) => (
                            <Select {...field} className="w-full">
                              {["Gender", "Male", "Female"].map((gender) => (
                                  <MenuItem key={"gender-" + gender} value={gender}>
                                    {gender}
                                  </MenuItem>
                              ))}
                            </Select>
                        )}
                    />
                  </Grid>
                </Grid>
              </SettingsCard>
            </Grid>
            {/* my details */}
            <Grid item xs={12} md={12}>
              <SettingsCard sectionTitle={"My details"}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                  {/* diabetes type */}
                  <Grid item xs={12}>
                    <Controller
                        name={"diabetesType"}
                        control={control}
                        defaultValue={user.diabetesType || "Diabetes Type"}
                        render={({field}) => (
                            <Select {...field} className="w-full">
                              {["Diabetes Type", "type 1", "type 2"].map((type) => (
                                  <MenuItem key={"diabetes" + type} value={type}>
                                    {type}
                                  </MenuItem>
                              ))}
                            </Select>
                        )}
                    />
                  </Grid>
                  {/* Height */}
                  <Grid item xs={6}>
                    <UserInput
                        defaultValue={user.height?.value ? user.height.value : ""}
                        fieldName={"height.value"}
                        label={"Height"}
                        type={"number"}
                        sx={{
                          "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd": {
                            padding: 0,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <Controller
                                    name={"height.unit"}
                                    control={control}
                                    defaultValue={user.height?.unit || heightUnits.default}
                                    render={({field}) => (
                                        <Select {...field} className={"w-full"}>
                                          {heightUnits.options.map((unit) => (
                                              <MenuItem key={"height" + unit} value={unit}>
                                                {unit}
                                              </MenuItem>
                                          ))}
                                        </Select>
                                    )}
                                />
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Grid>
                  {/* weight */}
                  <Grid item xs={6}>
                    <UserInput
                        defaultValue={user.weight?.value ? user.weight.value : ""}
                        fieldName={"weight.value"}
                        label={"Weight"}
                        type={"number"}
                        sx={{
                          "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd": {
                            padding: 0,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <Controller
                                    name={"weight.unit"}
                                    control={control}
                                    defaultValue={user.weight?.unit || weightUnits.default}
                                    render={({field}) => (
                                        <Select {...field} className={"w-full"}>
                                          {weightUnits.options.map((unit) => (
                                              <MenuItem key={"weight" + unit} value={unit}>
                                                {unit}
                                              </MenuItem>
                                          ))}
                                        </Select>
                                    )}
                                />
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Grid>
                  {/* carbs ratio */}
                  <Grid item xs={6}>
                    <UserInput
                        defaultValue={parseFloat(user.carbsRatio)}
                        fieldName={"carbsRatio"}
                        label={"Carbs Ratio"}
                        type={"number"}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <span>%</span>
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Grid>
                  {/* body fat */}
                  <Grid item xs={6}>
                    <UserInput
                        defaultValue={parseFloat(user.bodyFatPercentage)}
                        fieldName={"bodyFatPercentage"}
                        label={"Body Fat Percentage"}
                        type={"number"}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <span>%</span>
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Grid>
                  {/* insulin Sensitivity */}
                  <Grid item xs={6}>
                    <UserInput
                        defaultValue={parseFloat(user.insulinSensitivity?.value)}
                        fieldName={"insulinSensitivity.value"}
                        label={"Insulin Sensitivity"}
                        type={"number"}
                        sx={{
                          "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd": {
                            padding: 0,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <Controller
                                    name={"insulinSensitivity.unit"}
                                    control={control}
                                    defaultValue={user.insulinSensitivity?.unit || insulinUnits.default}
                                    render={({field}) => (
                                        <Select {...field} className={"w-full"}>
                                          {insulinUnits.options.map((unit) => (
                                              <MenuItem key={"weight" + unit} value={unit}>
                                                {unit}
                                              </MenuItem>
                                          ))}
                                        </Select>
                                    )}
                                />
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Grid>
                  {/* hb1ac */}
                  <Grid item xs={6}>
                    <UserInput
                        defaultValue={user.hb1ac}
                        fieldName={"hb1ac"}
                        label={"HB1AC"}
                        type={"number"}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <span>%</span>
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Grid>
                </Grid>
              </SettingsCard>
            </Grid>
            <Grid item xs={12} md={12}>
              <SettingsCard sectionTitle={"Ranges"}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                  <Grid item xs={12}>
                    <InputLabel>Hyperglycemia</InputLabel>
                  </Grid>
                  <Grid item xs={12} className={"grid grid-cols-2"}>
                    <div>
                      Min. <Input defaultValue={user.hyperglycemia?.min} type={"number"}
                                  placeholder={"181"} {...register("hyperglycemia.min")} />
                    </div>
                    <div>
                      Max. <Input defaultValue={user.hyperglycemia?.max} type={"number"}
                                  placeholder={"600"} {...register("hyperglycemia.max")} />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Normal blood glucose</InputLabel>
                  </Grid>
                  <Grid item xs={12} className={"grid grid-cols-2"}>
                    <div>
                      Min. <Input defaultValue={user.normalBloodGlucose?.min} type={"number"}
                                  placeholder={"70"} {...register("normalBloodGlucose.min")} />
                    </div>
                    <div>
                      Max. <Input defaultValue={user.normalBloodGlucose?.max} type={"number"}
                                  placeholder={"180"} {...register("normalBloodGlucose.max")} />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Hypoglycemia</InputLabel>
                  </Grid>
                  <Grid item xs={12} className={"grid grid-cols-2"}>
                    <div>
                      Min. <Input defaultValue={user.hypoglycemia?.min} type={"number"}
                                  placeholder={"20"} {...register("hypoglycemia.min")} />
                    </div>
                    <div>
                      Max. <Input defaultValue={user.hypoglycemia?.max} type={"number"}
                                  placeholder={"69"} {...register("hypoglycemia.max")} />
                    </div>
                  </Grid>
                </Grid>
              </SettingsCard>
            </Grid>
            <Grid item xs={12}>
              <SettingsCard
                  sectionTitle={
                    <div className={"flex justify-between"}>
                      <p>Medications</p>
                      <AddMedicamentModal/>
                    </div>
                  }
              >
                {user && user.medications?.map((medication) => <SettingMedication medication={medication}
                                                                                  control={control}/>)}
              </SettingsCard>
            </Grid>
            <Grid item xs={12} md={12}>
              <SettingsCard sectionTitle={"General"}>
                <Grid container>
                  <Grid item xs={12}>
                    <h5 className={"text-lg pb-5"}>Security</h5>
                    <div className={"pb-5"}>
                      <InputLabel className={"text-black text-xs"}>{"Current password"}</InputLabel>
                      <Input placeholder={"Current password"} type={"password"} {...register("currentPassword")} />
                    </div>
                    <div className={"pb-5"}>
                      <InputLabel className={"text-xs"}>{"New password"}</InputLabel>
                      <Input placeholder={"New password"} type={"password"} {...register("newPassword")} />
                    </div>
                    <div className={"pb-5"}>
                      <InputLabel className={"text-xs"}>{"Confirm password"}</InputLabel>
                      <Input placeholder={"Confirm password"} type={"password"} {...register("confirmPassword")} />
                    </div>
                    <Button className={"bg-diaBlue text-white w-[100%]"}>Change password</Button>
                  </Grid>
                  <Grid item xs={12} className={"text-gray-500"}>
                    <h5>Delete the Account</h5>
                    <p className={"text-sm pt-2 pb-8"}>want to delete your account permanently. Click delete
                      permanently</p>

                    <Button className={"bg-red-600 text-white w-[100%]"}>Delete account permanently</Button>
                  </Grid>
                </Grid>
              </SettingsCard>
            </Grid>
            <Grid item xs={12} md={12}>
              <SettingsCard sectionTitle={"Appearance"}>
                <h5>Change the theme of the platform</h5>
                <p>Appearance let you customize your background</p>
                <ToggleButtonGroup value={"light"} className={"grid grid-cols-2"}>
                  <ToggleButton value={"light"} className={"theme-picker "}>
                    <Icon icon="ph:sun-bold"/>
                  </ToggleButton>
                  <ToggleButton value={"dark"} className={"theme-picker bg-gray-700 text-white"}>
                    <Icon icon="ph:moon-bold"/>
                  </ToggleButton>
                </ToggleButtonGroup>
              </SettingsCard>
            </Grid>
            <div className={"flex py-5"}>
              <Button>Cancel</Button>
              <Button type={"submit"} className={"bg-diaBlue text-white"}>
                Save
              </Button>
            </div>
          </Grid>
        </form>
      </Container>
  );
};

export default Settings;
