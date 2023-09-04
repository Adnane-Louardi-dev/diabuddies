import { useRouter } from 'next/router';
import Select from "@mui/material/Select";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export default function LanguageSwitcher() {
    const router = useRouter();
    const [selectedLocation, setSelectedLocation] = useState("en")
    return (
        <div>
            <Select
                sx={{width: "100%"}}
                value={selectedLocation}
                onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    console.log("---", e.target.value)
                    router.push(
                        {
                            pathname: router.pathname,
                            query: router.query,
                        },
                        null,
                        {locale: e.target.value}
                    )
                }
                }
            >
                <MenuItem value={'en'} key={'en'}>English</MenuItem>
                <MenuItem value={'ar'} key={'ar'}>Arabic</MenuItem>
            </Select>
        </div>
    );
}