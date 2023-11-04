import LanguageSwitcher from "../appBar/LanguageSwitcher";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useRouter } from "next/router";

const LanguageChanger = ({ data, setData }) => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const router = useRouter();

  const handleChange = (event) => {
    setLanguage(event.target.value);
    if (event.target.value === "ar") {
      router.push(
        {
          pathname: router.pathname,
          query: router.query,
        },
        null,
        { locale: "ar" }
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: router.query,
        },
        null,
        { locale: "en" }
      );
    }
  };
  return (
    <section>
      <div className="mt-24 grid items-center justify-center text-center">
        {i18n.language !== "ar" && (
          <h1 className="font-semibold font-poppins text-xl">
            Choose the app's <span className="decoration-none font-bold text-diaBlue">Language</span>
          </h1>
        )}
        {i18n.language === "ar" && (
          <h1 className="font-tajawal font-semibold text-xl">
            اختر <span className="decoration-none font-bold text-diaBlue">لغة</span> التطبيق
          </h1>
        )}
        {i18n.language !== "ar" && (
          <p className="my-3 font-rubik text-gray-400">
            for better user experience <br />
            for you diabuddy
          </p>
        )}
        {i18n.language === "ar" && (
          <p className="my-3 font-tajawal font-semibold text-gray-400">
            لأفضل تجربة مستخدم
            <br />
            لك يا سكري
          </p>
        )}
      </div>
      <div className="flex justify-center my-10">
        <FormControl id="demo-simple-select" sx={{ width: "15rem", backgroundColor: "white", borderRadius: "20px", "& fieldset": { border: "none" }, boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.3)" }}>
          <Select labelId="demo-simple-select-label" className="font-tajawal font-semibold" value={language} label="Language" onChange={handleChange} sx={{ "& .MuiPaper-root": { borderRadius: "20px" } }}>
            <MenuItem value={"en"} sx={{ borderRadius: "20px" }}>
              English
            </MenuItem>
            <MenuItem value={"ar"}>العربية</MenuItem>
          </Select>
        </FormControl>
      </div>
    </section>
  );
};

export default LanguageChanger;
