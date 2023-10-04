import moment from "moment";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const Glucose = ({ props, setGlucose }) => {
  const [localGlucose, setLocalGlucoseLog] = useState(undefined);
  const { t } = useTranslation();
  const calculateLocalGlucose = () => {
    props.forEach((element) => {
      if (element.glucose) {
        setLocalGlucoseLog(element);
        setGlucose(element.glucose);
      }
      return null;
    });
  };
  useEffect(() => {
    calculateLocalGlucose();
  }, []);
  let bgColor = localGlucose?.glucose >= 180 ? "#F87474" : localGlucose?.glucose <= 70 ? "#3AB0FF" : "#44D29F";
  return (
    <>
      {localGlucose ? (
        <div className="py-2 w-1/2 mx-1">
          <div className={`rounded-3xl bg-[${bgColor}] text-white p-3`} style={{ WebkitBoxShadow: `-10px 0px 30px 0px ${bgColor}`, MozBoxShadow: `-10px 0px 30px 0px ${bgColor}`, boxShadow: `-10px 0px 30px 0px ${bgColor}` }}>
            <div className="flex justify-between w-full items-center mb-3">
              <h3 className="font-inter text-md text-semibold truncate">{t("glucose")}</h3>
              <Tooltip title="Last glucose checked for today">
                <Icon icon="ph:info" />
              </Tooltip>
            </div>

            <div className="my-3">
              <div className="mx-2">
                <p className="font-inter text-bold text-4xl truncate">
                  {localGlucose.glucose} <span className="text-sm text-semibold"> mg/dl</span>
                </p>
              </div>
            </div>
            <div className={`mt-7 py-1 bg-white truncate rounded-full font-poppins text-semibold text-sm text-center text-${localGlucose.glucose >= 180 ? "diaRed" : localGlucose.glucose <= 70 ? "diaBlue" : "diaGreen"}`}>
              <span dir={"ltr"}>{moment(localGlucose.time).calendar()}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Glucose;
