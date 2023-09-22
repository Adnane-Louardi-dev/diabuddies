import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";


export const useProfile = (setNotificationOpen) => {
    const queryClient = useQueryClient();
    return useMutation({
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
                    profileId: data.profileId,
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
}

