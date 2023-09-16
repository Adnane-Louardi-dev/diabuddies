import React, {useEffect, useMemo, useState} from "react";
import {Alert, Button, Grid, Input, InputAdornment, Snackbar} from "@mui/material";
import TextField from "@mui/material/TextField";
import {SettingsCard} from "../components/SettingsCard";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {Controller, useForm} from "react-hook-form";
import {SettingMedication} from "../components/SettingMedication";
import {Icon} from "@iconify/react";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import {heightUnits, insulinUnits, weightUnits} from "../utils/units";
import {AddMedicamentModal} from "../components/AddMedicamentModal";
import Image from "next/image";
import LoadingCircle from "../components/loadingCircle";
import {useGetCurrentUserDetailed} from "../customeHooks/useGetCurrentUser";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Logo} from "../components/Logo";
import Container from "@mui/material/Container";
import AvatarDialog from "../components/avatarDialog";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import QRcode from "qrcode"
const Settings = () => {
  const { register, control, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient()
  const [qrSrc, setQrSrc] = useState('')
  const { user, isLoading } = useGetCurrentUserDetailed()
  const [notificationOpen, setNotificationOpen] = useState(false);
  const {t} = useTranslation("settings")
  const {t:tc,i18n} = useTranslation("common")
  const {
    mutate: updateUser,
    isError,
    isLoading: updateUserLoading,
  } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (data) => {
      return Promise.all([
        axios.post("/api/user/", {
          userName: data.userName,
          givenName: data.givenName,
          familyName: data.familyName,
          age: data.age,
          email: data.email,
          homeAddress: data.homeAddress,
          phoneNumber: data.phoneNumber,
          photo: data.photo,
          bio: data.bio,
          darkMode: data.darkMode}),
        axios.put("/api/user/diabetecDetails", {
          gender: data.gender === "Gender" ? "none" : data.gender,
          diabetesType: data.diabetesType === "Diabetes Type" ? "other" : data.diabetesType,
          height: data.height,
          weight: data.weight,
          carbsRatio: data.carbsRatio,
          bodyFatPercentage: data.bodyFatPercentage,
          insulinSensitivity: data.insulinSensitivity,
          hb1ac: data.hb1ac,
          hyperglycemia: data.hyperglycemia,
          normalBloodGlucose: data.normalBloodGlucose,
          hypoglycemia: data.hypoglycemia,
          unit: data.unit,
          dailyCaloriesNeeds:data.dailyCaloriesNeeds
        })
      ])
    },
    onError: (e) => {
      console.error(e);
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries(["getCurrentUser"])
      queryClient.setQueryData(["getCurrentUser"],{
        user: JSON.parse(JSON.stringify({
          userName: data.userName,
          givenName: data.givenName,
          familyName: data.familyName,
          age: data.age,
          email: data.email,
          homeAddress: data.homeAddress,
          phoneNumber: data.phoneNumber,
          photo: data.photo,
          bio: data.bio,
          darkMode: data.darkMode
        }))
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["getCurrentUser"])
      await queryClient.invalidateQueries(["detailedUser"])
      setNotificationOpen(true);
    },
  });

  const handleClose = () => {
    setNotificationOpen(false);
  };
  const updateUserSettings = async (data) => {
    console.log("create user", data);
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
    await updateUser(data);
  };

  useEffect(() => {
    if(user && user.detailedUser.userName){
      const host = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';
      QRcode.toDataURL(`${host}/profile/${user.detailedUser.userName}`).then(setQrSrc)
    }
  }, [typeof window, user]);

  const UserInput = React.useCallback(({ fieldName, label, ...props }) => {
    return (
      <div className={"flex justify-between align-middle"} dir={"ltr"}>
        <TextField
          variant="outlined"
          label={label}
          className="rounded-2xl w-full font-inter"
          {...register(fieldName)}
          {...props}
          defaultValue={props.defaultValue || ""}
        />
      </div>
    );
  }, []);


  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
    <Container maxWidth={"xl"} dir={i18n.language === 'ar' ? "rtl" : "ltr"}>
      <form onSubmit={handleSubmit(updateUserSettings)}>
        <ResponsiveAppBar />
        <section className={"flex justify-end"} dir={"ltr"}>
          <Button className={"text-gray-500"}>{tc("cancel")}</Button>
          <Button type={"submit"} className={"bg-diaBlue text-white"}>
            {tc("save")}
          </Button>
        </section>
        <Snackbar open={notificationOpen} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={isError ? "warning" : "success"} sx={{ width: "100%" }}>
            {isError ? "There was an error while modifying your profile" : "Profile was modified successfully"}
          </Alert>
        </Snackbar>
        <LoadingCircle hidden={!updateUserLoading} />
        <Grid container rowSpacing={3}>
          {/* profile */}
          <Grid item xs={12}>
            <div className="grid grid-cols-1 gap-5 items-center justify-items-center">
              <Image src={user?.photo} width={100} height={100} alt={user.userName + " picture"} className="rounded-full" />
              <AvatarDialog user={user} />
            </div>

            <SettingsCard sectionTitle={t("profile")}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={12}>
                  <UserInput defaultValue={user.detailedUser.givenName} fieldName={"givenName"} label={t("givenNameInput")} />
                </Grid>
                <Grid item xs={12}>
                  <UserInput defaultValue={user.detailedUser.familyName} fieldName={"familyName"} label={t("familyNameInput")} />
                </Grid>
                <Grid item xs={12}>
                  <UserInput defaultValue={user.detailedUser.email} fieldName={"email"} label={t("emailInput")} />
                </Grid>
                <Grid item xs={12}>
                  <UserInput defaultValue={user.detailedUser.homeAddress} fieldName={"homeAddress"} label={t("homeAddressInput")} />
                </Grid>
                <Grid item xs={12}>
                  <UserInput defaultValue={user.detailedUser.userName} fieldName={"userName"} label={t("userNameInput")} />
                </Grid>
                <Grid item xs={6}>
                  <UserInput defaultValue={user.detailedUser.age} fieldName={"age"} label={tc("ageInput")} type={"number"} />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={tc("gender")}
                    control={control}
                    defaultValue={user.diabetecDetails.gender || "gender"}
                    render={({ field }) => (
                      <Select {...field} className="w-full">
                        {["gender", "male", "female"].map((gender) => (
                          <MenuItem key={"gender-" + gender} value={gender}>
                            {tc(gender)}
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
            <SettingsCard sectionTitle={t("myDetails")}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                {/* diabetes type */}
                <Grid item xs={12}>
                  <Controller
                    name={"diabetesType"}
                    control={control}
                    defaultValue={user.diabetecDetails.diabetesType || "diabetecType"}
                    render={({ field }) => (
                      <Select {...field} className="w-full">
                        {["diabetecType", "typeOne", "typeTwo", "other"].map((type) => (
                          <MenuItem key={"diabetes" + type} value={type}>
                            {tc(type)}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                {/* Height */}
                <Grid item xs={6}>
                  <UserInput
                    defaultValue={user.diabetecDetails.height?.value ? user.diabetecDetails.height.value : ""}
                    fieldName={"height.value"}
                    label={tc("height")}
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
                            defaultValue={user.diabetecDetails.height?.unit || heightUnits.default}
                            render={({ field }) => (
                              <Select {...field} className={"w-full"}>
                                {heightUnits.options.map((unit) => (
                                  <MenuItem key={"height" + unit} value={unit}>
                                    {tc(unit)}
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
                    defaultValue={user.diabetecDetails.weight?.value ? user.diabetecDetails.weight.value : ""}
                    fieldName={"weight.value"}
                    label={tc("weight")}
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
                            defaultValue={user.diabetecDetails.weight?.unit || weightUnits.default}
                            render={({ field }) => (
                              <Select {...field} className={"w-full"}>
                                {weightUnits.options.map((unit) => (
                                  <MenuItem key={"weight" + unit} value={unit}>
                                    {tc(unit)}
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
                    defaultValue={parseFloat(user.diabetecDetails.carbsRatio)}
                    fieldName={"carbsRatio"}
                    label={t("carbsRatio")}
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
                    defaultValue={parseFloat(user.diabetecDetails.bodyFatPercentage)}
                    fieldName={"bodyFatPercentage"}
                    label={t("bodyFatPercentage")}
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
                    defaultValue={parseFloat(user.diabetecDetails.insulinSensitivity?.value)}
                    fieldName={"insulinSensitivity.value"}
                    label={t("insulinSensitivity")}
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
                            defaultValue={user.diabetecDetails.insulinSensitivity?.unit || insulinUnits.default}
                            render={({ field }) => (
                              <Select {...field} className={"w-full"}>
                                {insulinUnits.options.map((unit) => (
                                  <MenuItem key={"weight" + unit} value={unit}>
                                    {tc(unit)}
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
                    defaultValue={user.diabetecDetails.hb1ac}
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
                {/* dailyCaloriesNeeds */}
                <Grid item xs={12}>
                  <UserInput
                    defaultValue={user.diabetecDetails.dailyCaloriesNeeds}
                    fieldName={"dailyCaloriesNeeds"}
                    label={t("dailyCaloriesNeeds")}
                    type={"number"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <span>Kcal</span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </SettingsCard>
          </Grid>
          <Grid item xs={12} md={12}>
            <SettingsCard sectionTitle={t("ranges")}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={12}>
                  <InputLabel>{t("hyperglycemia")}</InputLabel>
                </Grid>
                <Grid item xs={12} className={"grid grid-cols-2"}>
                  <div>
                    {tc("min")} <Input defaultValue={user.diabetecDetails.hyperglycemia?.min} type={"number"} placeholder={"181"} {...register("hyperglycemia.min")} />
                  </div>
                  <div>
                    {tc("max")} <Input defaultValue={user.diabetecDetails.hyperglycemia?.max} type={"number"} placeholder={"600"} {...register("hyperglycemia.max")} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>{t("normalBloodGlugose")}</InputLabel>
                </Grid>
                <Grid item xs={12} className={"grid grid-cols-2"}>
                  <div>
                    {tc("min")} <Input defaultValue={user.diabetecDetails.normalBloodGlucose?.min} type={"number"} placeholder={"70"} {...register("normalBloodGlucose.min")} />
                  </div>
                  <div>
                    {tc("max")}  <Input defaultValue={user.diabetecDetails.normalBloodGlucose?.max} type={"number"} placeholder={"180"} {...register("normalBloodGlucose.max")} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>{t("hypoglycemia")}</InputLabel>
                </Grid>
                <Grid item xs={12} className={"grid grid-cols-2"}>
                  <div>
                    {tc("min")} <Input defaultValue={user.diabetecDetails.hypoglycemia?.min} type={"number"} placeholder={"20"} {...register("hypoglycemia.min")} />
                  </div>
                  <div>
                    {tc("max")} <Input defaultValue={user.diabetecDetails.hypoglycemia?.max} type={"number"} placeholder={"69"} {...register("hypoglycemia.max")} />
                  </div>
                </Grid>
              </Grid>
            </SettingsCard>
          </Grid>
          <Grid item xs={12}>
            <SettingsCard
              sectionTitle={
                <div className={"flex justify-between"}>
                  <p>{t("medications")}</p>
                  <AddMedicamentModal />
                </div>
              }
            >
              {user && user.diabetecDetails.medications?.map((medication) => <SettingMedication medication={medication} control={control} />)}
            </SettingsCard>
          </Grid>
          {user.detailedUser.userName && <div className={"text-center w-full mt-5"}>
            <div dangerouslySetInnerHTML={{__html: t("qrCodeText")}} />
            <img src={qrSrc} alt={`${user.detailedUser.userName} Qr code`} className={"w-[250px] mt-5 mx-auto"}/>
          </div>}
          <Grid item xs={12} md={12}>
            <SettingsCard sectionTitle={t("general")}>
              <Grid container>
                <Grid item xs={12}>
                  <h5 className={"text-lg pb-5"}>{t("security")}</h5>
                  <div className={"pb-5"}>
                    <InputLabel className={"text-black text-xs"}>{t("currentPassword")}</InputLabel>
                    <Input placeholder={t("currentPassword")} type={"password"} {...register("currentPassword")} />
                  </div>
                  <div className={"pb-5"}>
                    <InputLabel className={"text-xs"}>{t("newPassword")}</InputLabel>
                    <Input placeholder={t("newPassword")} type={"password"} {...register("newPassword")} />
                  </div>
                  <div className={"pb-5"}>
                    <InputLabel className={"text-xs"}>{t("confirmPassword")}</InputLabel>
                    <Input placeholder={t("confirmPassword")} type={"password"} {...register("confirmPassword")} />
                  </div>
                  <Button className={"bg-diaBlue text-white w-[100%]"}>{t('changePassword')}</Button>
                </Grid>
                <Grid item xs={12} className={"text-gray-500"}>
                  <h5>{t("deleteAccount")}</h5>
                  <p className={"text-sm pt-2 pb-8"}></p>

                  <Button className={"bg-red-600 text-white w-[100%]"}>{t("deletePermanently")}</Button>
                </Grid>
              </Grid>
            </SettingsCard>
          </Grid>
          <Grid item xs={12} md={12}>
            <SettingsCard sectionTitle={t("appearance")}>
              <h5>{t("appearanceDescription")}</h5>
              <p>{t("appearanceDescriptionInfo")}</p>
              <ToggleButtonGroup value={"light"} className={"grid grid-cols-2"} dir={"ltr"}>
                <ToggleButton value={"light"} className={"theme-picker "}>
                  <Icon icon="ph:sun-bold" />
                </ToggleButton>
                <ToggleButton value={"dark"} className={"theme-picker bg-gray-700 text-white"}>
                  <Icon icon="ph:moon-bold" />
                </ToggleButton>
              </ToggleButtonGroup>
            </SettingsCard>
          </Grid>
          <div className={"flex py-5"}>
            <Button>{tc("cancel")}</Button>
            <Button type={"submit"} className={"bg-diaBlue text-white"}>
              {tc("save")}
            </Button>
          </div>
        </Grid>
      </form>
    </Container>
  );
};

export default Settings;


export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common','settings']))
  }
});
