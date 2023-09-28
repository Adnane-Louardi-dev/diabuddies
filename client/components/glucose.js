import moment from "moment";
import NewLogDialog from "./logBookDialog/newLogDialog";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

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
  let bgColor = localGlucose?.glucose >= 180 ? "diaRed" : localGlucose?.glucose <= 70 ? "diaBlue" : "diaGreen";
  return (
    <>
      {localGlucose ? (
        <div className="py-2 w-1/2 mx-1">
          <div className={`rounded-3xl shadow-md bg-${bgColor} text-white p-3`}>
            <div className="flex justify-between w-full items-center mb-3">
              <h3 className="font-inter text-md text-semibold truncate">{t("glucose")}</h3> <Icon icon="ph:info" />
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
      ) : (
        <div className="py-2 w-1/2 mx-1">
          <div className="rounded-3xl shadow-md bg-green-300 p-3">
            <div className="w-full items-center text-center">
              <h3 className="font-poppins text-md text-white">{t("logNotFound")}</h3>
            </div>
            {/* <Image src={"/nologs_illustrator.svg"} width={48} height={48} /> */}
            <div className="my-3">
              <div className="mx-2 flex justify-center">
                <NewLogDialog />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Glucose;
