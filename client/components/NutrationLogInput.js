import {Icon} from "@iconify/react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import * as React from "react";


export const NutrationLogInput = ({onChange,label,bgColor, textColor,icon,inputAdornmentLabel}) => {


    return <div className={`p-2.5 ${bgColor} rounded-xl shadow-md`}>
        <div className="flex">
            <Icon icon={icon} className={`bg-white ${textColor} rounded-full self-center m-1 p-1 h-7 w-7`} />
            <p className="text-white font-rubik font-sm self-center">{label}</p>
        </div>
        <TextField
            id="outlined-number"
            type="tel"
            variant="standard"
            placeholder="0"
            sx={{
                marginTop: 1,
                marginX: 1,
                textAlign: "center",
                border: "none",
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
                        {inputAdornmentLabel}
                    </InputAdornment>
                ),
                style: {
                    color: "white",
                },
            }}
            onChange={onChange}
        />
    </div>
}