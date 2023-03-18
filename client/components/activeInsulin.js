import moment from "moment";
import { Icon } from "@iconify/react";
import { useState, useMemo } from "react";

const ActiveInsulin = ({ props }) => {
  //if the difference between now and the insulin shot < the insulin active time, show the active insulin
  const [activeInsulinCalculator, setActiveInsulinCalculator] = useState(
    props &&
      new Date().getMilliseconds() - moment(props.time).diff(moment()) < 3 * 60 * 60 * 1000 &&
      new Date().getMilliseconds() > moment(props.time).diff(moment())
      ? props.fastActingInsulinUnits -
          (props.fastActingInsulinUnits / (3 * 60 * 60 * 1000)) * (new Date().getMilliseconds() - moment(props.time).diff(moment()))
      : 0
  );
  const activeInsulinCalculatorMemo = useMemo(() => activeInsulinCalculator, [activeInsulinCalculator]);
  console.log(activeInsulinCalculatorMemo);
  return (
    <>
      {props ? (
        <div className="py-2 w-1/2 mx-1">
          <div className="rounded-3xl shadow-md bg-diaOrange text-white p-3">
            <div className="flex justify-between w-full items-center mb-3">
              <h3 className="font-inter text-md text-semibold truncate">Active insulin </h3> <Icon icon="ph:info" />
            </div>

            <div className="my-3">
              <div className="mx-2">
                <p className="font-inter text-bold text-4xl truncate">
                  {parseFloat(activeInsulinCalculator).toFixed(2)} <span className="text-sm text-semibold">UI</span>
                </p>
              </div>
            </div>
            <div className="mt-7 py-1 bg-white truncate rounded-full font-poppins text-semibold text-sm text-center text-diaOrange">
              <span>{moment(props.time).fromNow()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-2 w-1/2 mx-1">
          <div className="rounded-3xl shadow-md bg-diaOrange text-white p-3">
            <div className="flex justify-between w-full items-center mb-3">
              <h3 className="font-inter text-md text-semibold truncate">Active insulin </h3> <Icon icon="ph:info" />
            </div>

            <div className="my-3">
              <div className="mx-2">
                <p className="font-inter text-bold text-4xl truncate">
                  00.00 <span className="text-sm text-semibold">UI</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ActiveInsulin;
