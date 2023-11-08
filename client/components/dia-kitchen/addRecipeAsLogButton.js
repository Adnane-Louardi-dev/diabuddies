import {Button} from "@mui/material";
import {addRecipeAsLog} from "../../customeHooks/useAddFood";
import {Icon} from "@iconify/react";
import React from "react";
import {useRouter} from "next/router";


export const AddRecipeAsLogButton = ({log}) => {
    const router = useRouter()
    return (
        <Button onClick={async ()=>{
            await router.push("/app/add")
            await router.push({query: {
                    log: JSON.stringify(log)
                }})
        }}>
            <p>Add as log</p>
            <Icon icon={"tabler:plus"} className="mx-1"/>
        </Button>
    )
}