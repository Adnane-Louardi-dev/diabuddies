import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Grid, Input, InputAdornment, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { SettingsCard } from "../../components/SettingsCard";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useForm } from "react-hook-form";
import { SettingMedication } from "../../components/SettingMedication";
import { Icon } from "@iconify/react";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import { heightUnits, insulinUnits, weightUnits } from "../../utils/units";
import { AddMedicamentModal } from "../../components/AddMedicamentModal";
import Image from "next/image";
import LoadingCircle from "../../components/loadingCircle";
import { useGetCurrentUserDetailed } from "../../customeHooks/useGetCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logo } from "../../components/layout/Logo";
import Container from "@mui/material/Container";
import AvatarDialog from "../../components/layout/avatarDialog";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ResponsiveAppBar from "../../components/layout/ResponsiveAppBar";
import QRcode from "qrcode";
import { useProfile } from "../../customeHooks/useProfile";
import getURL from "../../utils/getURL";
import IconButton from "@mui/material/IconButton";
import withAuth from "../../components/layout/withAuth";
import { nullMedication } from "../../utils/nulls";
const Settings = ({ medications }) => {
  const { register, control, handleSubmit, reset } = useForm();
  const [modalMedication, setModalMedication] = useState(undefined);
  const [qrSrc, setQrSrc] = useState(undefined);
  const { user, isLoading, refetch } = useGetCurrentUserDetailed();
  const [token, setToken] = useState(undefined);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { t } = useTranslation("settings");
  const { t: tc, i18n } = useTranslation("common");
  const { mutate: updateUser, isError, isLoading: updateUserLoading } = useProfile(setNotificationOpen);

  const handleClose = () => {
    setNotificationOpen(false);
  };
  const updateUserSettings = async (data) => {
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
    await updateUser({ ...data, profileId: { token } });
  };

  const generateToken = () => {
    const token = crypto.randomUUID();
    setToken(token);
    QRcode.toDataURL(getURL(`/profile/${token}`)).then(setQrSrc);
  };
  useEffect(() => {
    if (user?.detailedUser.profileId) {
      setToken(user.detailedUser.profileId.token);
      QRcode.toDataURL(getURL(`/profile/${user.detailedUser.profileId.token}`)).then(setQrSrc);
    }
  }, [user]);

  const UserInput = React.useCallback(({ fieldName, label, ...props }) => {
    return (
      <div className={"flex justify-between align-middle"} dir={"ltr"}>
        <TextField sx={{"& fieldset":{borderRadius:"25px"}}} variant="outlined" label={label} className="w-full font-poppins font-semibold" {...register(fieldName)} {...props} defaultValue={props.defaultValue || ""} />
      </div>
    );
  }, []);

  if (isLoading) {
    return <LoadingCircle />;
  }
  return (
  <>
    <ResponsiveAppBar />
    <Container maxWidth={"xl"} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <form onSubmit={handleSubmit(updateUserSettings)}>
        <section className={"flex justify-end"} dir={"ltr"}>
          <Button className={"text-diaGray capitalize font-rubik"}>{tc("cancel")}</Button>
          <Button type={"submit"} className={"text-white rounded-full bg-diaDarkBlue p-1 capitalize font-rubik"}>
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
              <Image src={user?.detailedUser.photo} width={100} height={100} alt={user?.detailedUser.userName + " picture"} className="rounded-full" />
              <AvatarDialog user={user} />
            </div>

            <SettingsCard sectionTitle={t("profile")}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={6}>
                  <UserInput defaultValue={user.detailedUser.givenName} fieldName={"givenName"} label={t("givenNameInput")} />
                </Grid>
                <Grid item xs={6}>
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
                    defaultValue={user.diabeticDetails.gender || "gender"}
                    render={({ field }) => (
                      <Select sx={{"& fieldset":{borderRadius:"25px"}}} {...field} className="w-full">
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
                <Grid item xs={6}>
                  <Controller
                    name={"diabetesType"}
                    control={control}
                    defaultValue={user.diabeticDetails.diabetesType || "diabetecType"}
                    render={({ field }) => (
                      <Select sx={{"& fieldset":{borderRadius:"25px"}}} {...field} className="w-full">
                        {["diabetecType", "typeOne", "typeTwo", "other"].map((type) => (
                          <MenuItem key={"diabetes" + type} value={type}>
                            {tc(type)}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                {/* dailyCaloriesNeeds */}
                <Grid item xs={6}>
                  <UserInput
                      defaultValue={user.diabeticDetails.dailyCaloriesNeeds}
                      fieldName={"dailyCaloriesNeeds"}
                      label={t("dailyCaloriesNeeds")}
                      type={"number"}
                      InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                              <span className={"font-rubik font-semibold"}>Kcal</span>
                            </InputAdornment>
                        ),
                      }}
                  />
                </Grid>
                {/* Height */}
                <Grid item xs={6}>
                  <UserInput
                    defaultValue={user.diabeticDetails.height?.value ? user.diabeticDetails.height.value : ""}
                    fieldName={"height.value"}
                    label={tc("height")}
                    type={"number"}
                    sx={{
                      "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd": {
                        padding: 0,
                      },
                      "& fieldset":{borderRadius:"25px"}
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Controller
                            name={"height.unit"}
                            control={control}
                            defaultValue={user.diabeticDetails.height?.unit || heightUnits.default}
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
                    defaultValue={user.diabeticDetails.weight?.value ? user.diabeticDetails.weight.value : ""}
                    fieldName={"weight.value"}
                    label={tc("weight")}
                    type={"number"}
                    sx={{
                      "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd": {
                        padding: 0,
                      },
                      "& fieldset":{borderRadius:"25px"}
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Controller
                            name={"weight.unit"}
                            control={control}
                            defaultValue={user.diabeticDetails.weight?.unit || weightUnits.default}
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
                    defaultValue={parseFloat(user.diabeticDetails.carbsRatio)}
                    fieldName={"carbsRatio"}
                    label={t("carbsRatio")}
                    type={"number"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <span className={"font-rubik font-semibold"}>g/UI</span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* body fat */}
                <Grid item xs={6}>
                  <UserInput
                    defaultValue={parseFloat(user.diabeticDetails.bodyFatPercentage)}
                    fieldName={"bodyFatPercentage"}
                    label={t("bodyFatPercentage")}
                    type={"number"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <span className={"font-rubik font-semibold"}>%</span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* insulin Sensitivity */}
                <Grid item xs={6}>
                  <UserInput
                    defaultValue={parseFloat(user.diabeticDetails.insulinSensitivity?.value)}
                    fieldName={"insulinSensitivity.value"}
                    label={t("insulinSensitivity")}
                    type={"number"}
                    sx={{
                      "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd": {
                        padding: 0,
                      },
                      "& fieldset":{borderRadius:"25px"}
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Controller
                            name={"insulinSensitivity.unit"}
                            control={control}
                            defaultValue={user.diabeticDetails.insulinSensitivity?.unit || insulinUnits.default}
                            render={({ field }) => (
                              <Select {...field} className={"w-24"}>
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
                    defaultValue={user.diabeticDetails.hb1ac}
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
            <SettingsCard sectionTitle={t("ranges")}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={12}>
                  <InputLabel>{t("hyperglycemia")}</InputLabel>
                </Grid>
                <Grid item xs={12} className={"grid grid-cols-2"}>
                  <div>
                    {tc("min")} <Input defaultValue={user.diabeticDetails.hyperglycemia?.min} type={"number"} placeholder={"181"} {...register("hyperglycemia.min")} />
                  </div>
                  <div>
                    {tc("max")} <Input defaultValue={user.diabeticDetails.hyperglycemia?.max} type={"number"} placeholder={"600"} {...register("hyperglycemia.max")} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>{t("normalBloodGlugose")}</InputLabel>
                </Grid>
                <Grid item xs={12} className={"grid grid-cols-2"}>
                  <div>
                    {tc("min")} <Input defaultValue={user.diabeticDetails.normalBloodGlucose?.min} type={"number"} placeholder={"70"} {...register("normalBloodGlucose.min")} />
                  </div>
                  <div>
                    {tc("max")} <Input defaultValue={user.diabeticDetails.normalBloodGlucose?.max} type={"number"} placeholder={"180"} {...register("normalBloodGlucose.max")} />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>{t("hypoglycemia")}</InputLabel>
                </Grid>
                <Grid item xs={12} className={"grid grid-cols-2"}>
                  <div>
                    {tc("min")} <Input defaultValue={user.diabeticDetails.hypoglycemia?.min} type={"number"} placeholder={"20"} {...register("hypoglycemia.min")} />
                  </div>
                  <div>
                    {tc("max")} <Input defaultValue={user.diabeticDetails.hypoglycemia?.max} type={"number"} placeholder={"69"} {...register("hypoglycemia.max")} />
                  </div>
                </Grid>
              </Grid>
            </SettingsCard>
          </Grid>
          <Grid item xs={12}>
            <SettingsCard
              sectionTitle={
                <div className={"flex justify-between mb-2"}>
                  <p>{t("medications")}</p>
                  <AddMedicamentModal refetch={refetch} medications={medications} medication={modalMedication} setModalMedication={setModalMedication} />
                </div>
              }
            >
              <div className={"[&>section(:last-child)]:border-b-transparent"}>
                {user?.diabeticDetails.medications.map((medication) => (
                  <SettingMedication key={medication._id} refetch={refetch} medication={medication} setMedicament={setModalMedication} />
                ))}
              </div>
            </SettingsCard>
          </Grid>
          <div className={"text-center w-full mt-5"}>
            <div dangerouslySetInnerHTML={{ __html: t("qrCodeText") }} />
            {qrSrc && <img src={qrSrc} alt={`${user.detailedUser.userName} Qr code`} className={"w-[250px] mt-5 mx-auto"} />}
            <div className={"flex justify-center gap-2"}>
              <Button className={"bg-diaDarkBlue text-white mt-4"} onClick={generateToken}>
                {user.detailedUser.profileId ? "Regenerate Token" : "Generate Token"}
              </Button>
              <IconButton
                className={"w-12 h-12 mt-4"}
                onClick={() => {
                  navigator.clipboard.writeText(getURL(`/profile/${token}`));
                }}
              >
                <Icon icon="ph:copy-bold" />
              </IconButton>
            </div>
          </div>
          <Grid item xs={12} md={12}>
            <SettingsCard sectionTitle={t("general")}>
              <Grid container>
                <Grid item xs={12}>
                  <h5 className={"text-lg pb-5"}>{t("security")}</h5>
                  <div className={"pb-5"}>
                    <InputLabel className={"text-black text-xs"}>{t("currentPassword")}</InputLabel>
                    <Input className={"w-full mt-2"} placeholder={t("currentPassword")} type={"password"} {...register("currentPassword")} />
                  </div>
                  <div className={"pb-5"}>
                    <InputLabel className={"text-xs"}>{t("newPassword")}</InputLabel>
                    <Input className={"w-full mt-2"} placeholder={t("newPassword")} type={"password"} {...register("newPassword")} />
                  </div>
                  <div className={"pb-5"}>
                    <InputLabel className={"text-xs"}>{t("confirmPassword")}</InputLabel>
                    <Input className={"w-full mt-2"} placeholder={t("confirmPassword")} type={"password"} {...register("confirmPassword")} />
                  </div>
                  <Button className={"bg-diaBlue text-white w-[100%]"}>{t("changePassword")}</Button>
                </Grid>
                <Grid item xs={12} className={"text-gray-500 mt-5"}>
                  <h5>{t("deleteAccount")}</h5>
                  <Button className={"bg-red-600 text-white w-[100%] mt-2"}>{t("deletePermanently")}</Button>
                </Grid>
              </Grid>
            </SettingsCard>
          </Grid>
          <Grid item xs={12} md={12}>
            <SettingsCard sectionTitle={t("appearance")}>
              <h5 className={"font-rubik text-center font-semibold"}>{t("appearanceDescription")}</h5>
              <p className={"font-rubik text-sm text-center mb-5"}>{t("appearanceDescriptionInfo")}</p>
              <ToggleButtonGroup value={"light"} className={"grid gap-3 justify-items-center"} dir={"ltr"}>
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
      </>
  );
};

export default withAuth(Settings);

export const getServerSideProps = async ({ locale }) => {
  const { data: medications } = await axios.get(`${process.env.BACKEND_URL}/user/medicaments`);
  return {
    props: {
      medications,
      ...(await serverSideTranslations(locale, ["common", "settings"])),
    },
  };
};
