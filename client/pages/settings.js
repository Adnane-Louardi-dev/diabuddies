import React, {useEffect, useState} from "react"
import {Button, Grid, Input} from "@mui/material";
import {SettingsCard} from "../components/SettingsCard";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {Controller, useForm} from "react-hook-form";
import {SettingMedication} from "../components/SettingMedication"
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import {heightUnits, insulinUnits, weightUnits} from "../utils/units";
import {AddMedicamentModal} from "../components/AddMedicamentModal";
import Image from "next/image";

const Settings = () => {
    const {register,control, handleSubmit,reset} = useForm();
    const [user, setUser] = useState(undefined)
    const router = useRouter();
    const queryDate = router.query.date;
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        if (router.isReady) {
            //get date from url query or from the date component
            axios.get(`/api/users/me`, { withCredentials: true }).then((res) => {
                setUser(res.data)
                setLoading(false)
            });
        }
    }, [router.isReady, queryDate]);
    const updateUserSettings = (data) => {
        if(data.newPassword){
            if(data.confirmPassword === data.newPassword){
                axios.post("/api/settings/changePassword",{
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword
                })
            }
            alert("passwords must match")
            return;
        }
        console.log("user",user, "user to post", {...user,...data})
        axios.post("/api/settings/", {...user,...data}, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((res)=>{
            console.log("user updated successfuly", res.data)
            setUser(res.data)
        }).catch((err) => {
            alert("cannot Update user, some error occured")
            console.log(err)
        })
    }

    const UserInput = React.useCallback(({fieldName,label, ...props})=>{
        return <div className={"flex justify-between align-middle"}>
            {/*<InputLabel className={"text-black"}>{props.defaultValue}</InputLabel>*/}
            <Input  placeholder={label} {...register(fieldName)} {...props}  defaultValue={props.defaultValue} />
        </div>
    },[])

    if(loading || !user){
        return <h1>loading....</h1>
    }
    return <form onSubmit={handleSubmit(updateUserSettings)}>
        <section className={"p-5 flex justify-between"}>
            <h3 className={"text-2xl"}>Settings</h3>
            <div>
                <Button className={"text-gray-500"}>
                    Cancel
                </Button>
                <Button type={"submit"} className={"bg-diaBlue text-white"}>
                    Save All
                </Button>
            </div>
        </section>
        <Grid container className={"px-5"} columnSpacing={2}>
            <Grid item xs={12} md={9}>
                <SettingsCard sectionTitle={"Profile"}>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={6}>
                            <UserInput defaultValue={user.givenName} fieldName={"givenName"} label={"First name"} />
                        </Grid>
                        <Grid item xs={6}>
                            <UserInput defaultValue={user.familyName} fieldName={"familyName"} label={"Last name"} />
                        </Grid>
                        <Grid item xs={6}>
                            <UserInput defaultValue={user.email} fieldName={"email"} label={"Email"} />
                        </Grid>
                        <Grid item xs={6}>
                            <UserInput defaultValue={user.userName} fieldName={"userName"} label={"userName"} />
                        </Grid>
                        <Grid item xs={4}>
                            <UserInput defaultValue={user.age} fieldName={"age"} label={"Age"} type={"number"}  />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name={"gender"}
                                control={control}
                                defaultValue={user.gender || "Gender"}
                                render={({field})=> (
                                    <Select {...field}>
                                        {["Gender","Male","Female"].map((gender) => <MenuItem key={"gender-"+gender} value={gender}>{gender}</MenuItem> )}
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name={"diabetesType"}
                                control={control}
                                defaultValue={user.diabetesType || "Diabetes Type"}
                                render={({field})=> (
                                    <Select {...field}>
                                        {["Diabetes Type","type 1","type 2"].map((type) => <MenuItem key={"diabetes"+type} value={type}>{type}</MenuItem> )}
                                    </Select>
                                )}
                            />
                        </Grid>
                    </Grid>
                </SettingsCard>
            </Grid>
            <Grid item xs={12} md={3}>
                {/*<ProfileAvatar />*/}
                <Image src={user.photo} width={200} height={200} alt={user.userName + " picture"} />
            </Grid>
            <Grid item xs={12} md={6}>
                <SettingsCard sectionTitle={"My details"}>

                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={6}>
                            <UserInput defaultValue={user.height?.value ? user.height.value : ""} fieldName={"height.value"} label={"Height"} type={"number"}  renderSuffix={()=>{
                                return <Controller
                                    name={"height.unit"}
                                    control={control}
                                    defaultValue={user.height?.unit || heightUnits.default}
                                    render={({field})=> (
                                        <Select {...field}
                                                className={"min-w-[100px]"}
                                        >
                                            {heightUnits.options.map((unit) => <MenuItem key={"height"+unit} value={unit}>{unit}</MenuItem> )}
                                        </Select>
                                    )}
                                />
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <UserInput defaultValue={user.weight?.value ? user.weight.value : ""} fieldName={"weight.value"} label={"Weight"} type={"number"} renderSuffix={()=>{
                                return <Controller
                                    name={"weight.unit"}
                                    control={control}
                                    defaultValue={user.weight?.unit || weightUnits.default}
                                    render={({field})=> (
                                        <Select {...field}
                                                className={"min-w-[100px]"}
                                        >
                                            {weightUnits.options.map((unit) => <MenuItem key={"weight"+unit} value={unit}>{unit}</MenuItem> )}
                                        </Select>
                                    )}
                                />
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <UserInput defaultValue={parseFloat(user.carbsRatio)} fieldName={"carbsRatio"} label={"Carbs Ratio"} type={"number"} renderSuffix={()=> <span>%</span>} />
                        </Grid>
                        <Grid item xs={6}>
                            <UserInput defaultValue={parseFloat(user.bodyFatPercentage)} fieldName={"bodyFatPercentage"} label={"Body Fat Percentage"} type={"number"} renderSuffix={()=> <span>%</span>} />
                        </Grid>
                        <Grid item xs={6}>
                            <input type={"number"} {...register("someInput")}/>
                            <UserInput defaultValue={parseFloat(user.insulinSensitivity?.value)} fieldName={"insulinSensitivity.value"} label={"Insulin Sensitivity"} type={"number"} renderSuffix={()=>{
                                return <Controller
                                    name={"insulinSensitivity.unit"}
                                    control={control}
                                    defaultValue={user.insulinSensitivity?.unit || insulinUnits.default}
                                    render={({field})=> (
                                        <Select {...field}
                                                className={"min-w-[100px]"}
                                        >
                                            {insulinUnits.options.map((unit) => <MenuItem key={"weight"+unit} value={unit}>{unit}</MenuItem> )}
                                        </Select>
                                    )}
                                />
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <UserInput defaultValue={user.hb1ac} fieldName={"hb1ac"} label={"HB1AC"} type={"number"} renderSuffix={()=> <span className={"px-2"}>%</span>} />
                        </Grid>
                    </Grid>
                </SettingsCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <SettingsCard sectionTitle={"Ranges"}>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                        <Grid item xs={6}>
                            <InputLabel>Hyperglycemia</InputLabel>
                        </Grid>
                        <Grid item xs={6} className={"grid grid-cols-2"}>
                            <div>
                                Min. <Input defaultValue={user.hyperglycemia?.min} type={"number"} placeholder={"181"} {...register("hyperglycemia.min")} />
                            </div>
                            <div>
                                Max. <Input defaultValue={user.hyperglycemia?.max} type={"number"} placeholder={"600"} {...register("hyperglycemia.max")} />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel>Normal blood glucose</InputLabel>
                        </Grid>
                        <Grid item xs={6} className={"grid grid-cols-2"}>
                            <div>
                                Min. <Input defaultValue={user.normalBloodGlucose?.min} type={"number"} placeholder={"70"} {...register("normalBloodGlucose.min")} />
                            </div>
                            <div>
                                Max. <Input defaultValue={user.normalBloodGlucose?.max} type={"number"} placeholder={"180"} {...register("normalBloodGlucose.max")} />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel>Hypoglycemia</InputLabel>
                        </Grid>
                        <Grid item xs={6} className={"grid grid-cols-2"}>
                            <div>
                                Min. <Input defaultValue={user.hypoglycemia?.min} type={"number"} placeholder={"20"} {...register("hypoglycemia.min")} />
                            </div>
                            <div>
                                Max. <Input defaultValue={user.hypoglycemia?.max} type={"number"} placeholder={"69"} {...register("hypoglycemia.max")} />
                            </div>
                        </Grid>
                    </Grid>
                </SettingsCard>
            </Grid>
            <Grid item xs={12}>
                <SettingsCard sectionTitle={<div className={"flex justify-between"}>
                    <p>Medications</p>
                    <AddMedicamentModal />
                </div>}>
                    {user && user.medications?.map(medication => (
                        <SettingMedication medication={medication} control={control}/>
                    ))}
                </SettingsCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <SettingsCard sectionTitle={"General"}>
                    <Grid container>
                        <Grid item xs={6}>
                            <h5 className={"text-lg pb-5"}>Security</h5>
                            <div className={"pb-5"}>
                                <InputLabel className={"text-black text-xs"}>{"Current password"}</InputLabel>
                                <Input placeholder={"Current password"} type={"password"}  {...register("currentPassword")} />
                            </div>
                            <div className={"pb-5"}>
                                <InputLabel className={"text-xs"}>{"New password"}</InputLabel>
                                <Input placeholder={"New password"} type={"password"}  {...register("newPassword")} />
                            </div>
                            <div className={"pb-5"}>
                                <InputLabel className={"text-xs"}>{"Confirm password"}</InputLabel>
                                <Input placeholder={"Confirm password"} type={"password"}  {...register("confirmPassword")} />
                            </div>
                            <Button className={"bg-diaBlue text-white w-[100%]"}>
                                Change password
                            </Button>
                        </Grid>
                        <Grid item xs={6} className={"text-gray-500"}>
                            <h5>Delete the Account</h5>
                            <p className={"text-sm pt-2 pb-8"}>
                                want to delete your account permanently.
                                Click delete permanently
                            </p>

                            <Button className={"bg-red-600 text-white w-[100%]"}>
                                Delete account permanently
                            </Button>
                        </Grid>
                    </Grid>
                </SettingsCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <SettingsCard sectionTitle={"Appearance"}>
                    <h5>Change the theme of the platform</h5>
                    <p>Appearance let you customize your  background</p>
                    <ToggleButtonGroup value={"light"} className={"grid grid-cols-2"}>
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
                <Button>
                    Cancel
                </Button>
                <Button type={"submit"} className={"bg-diaBlue text-white"}>
                    Save all changes
                </Button>
            </div>
        </Grid>
    </form>
}


export default Settings