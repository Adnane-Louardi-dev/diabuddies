import moment from "moment";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Tooltip } from "@mui/material";

const ActiveInsulin = ({ props, setActiveInsulin, activeInsulin, lastInjectionTime, setlastInjectionTime }) => {
  const [Data] = useState(props);
  const { t } = useTranslation("index");
  const userInsulinDurationInSystem = 3 * 60 * 60 * 1000;
  const [LocalActiveInsulin, setLocalActiveInsulin] = useState(activeInsulin);
  useEffect(() => {
    [...props].reverse().forEach((element) => {
      if (element.bolus) {
        setlastInjectionTime(moment(element.time));
      }
    });
    let calculateActiveInsulin = Data.reduce((accumulator, currentElement) => {
      const timeBetweenNowAndInsulinShot = moment().diff(moment(currentElement.time));
      //if there's injected insulin && the insulin injected still in blood stream && the injection has been injected
      if (currentElement.bolus && timeBetweenNowAndInsulinShot < userInsulinDurationInSystem && timeBetweenNowAndInsulinShot > 0) {
        accumulator += currentElement.bolus - (currentElement.bolus / userInsulinDurationInSystem) * moment().diff(moment(currentElement.time));
      }
      return accumulator;
    }, 0);
    setActiveInsulin(calculateActiveInsulin);
    setLocalActiveInsulin(calculateActiveInsulin);
  }, [props]);
  return (
    <>
      {props ? (
        <div className="py-2 w-1/2 mx-1">
          <div className="rounded-3xl bg-diaOrange text-white p-3" style={{ WebkitBoxShadow: "10px 0px 30px 0px rgba(255,181,98,1)", MozBoxShadow: "10px 0px 30px 0px rgba(255,181,98,1)", boxShadow: "10px 0px 30px 0px rgba(255,181,98,1)" }}>
            <div className="flex justify-between w-full items-center mb-3">
              <h3 className="font-inter text-md text-semibold truncate">{t("active_insuling")} </h3>
              <Tooltip title="Active insulin in your blood stream">
                <Icon icon="ph:info" />
              </Tooltip>
            </div>

            <div className="my-3">
              <div className="mx-2">
                <p className="font-inter text-bold text-4xl truncate">
                  {parseFloat(LocalActiveInsulin).toFixed(2)} <span className="text-sm text-semibold">UI</span>
                </p>
              </div>
            </div>
            <div className="mt-7 py-1 bg-white truncate rounded-full font-poppins text-semibold text-sm text-center text-diaOrange">
              <span dir={"ltr"}>{moment(lastInjectionTime).fromNow() || t("no_active_insulin")}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-2 w-1/2 mx-1">
          <div className="rounded-3xl shadow-md bg-orange-200 text-white p-3">
            <div className="flex justify-between w-full items-center mb-3">
              <h3 className="font-inter text-md text-semibold truncate">{t("active_insuling")} </h3> <Icon icon="ph:info" />
            </div>

            <div className="my-2">
              <div className="mx-2">
                <p className="font-inter text-bold text-4xl truncate">
                  00.00 <span className="text-sm text-semibold">UI</span>
                </p>
              </div>
            </div>
            <div className="py-1 bg-white truncate rounded-full font-poppins text-semibold text-sm text-center text-orange-200">
              <span>{t("no_active_insulin")}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ActiveInsulin;
