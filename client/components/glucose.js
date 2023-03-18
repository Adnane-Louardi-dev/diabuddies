import moment from "moment";
import Image from "next/image";
import NewLogDialog from "./newLogDialog";
import { Icon } from "@iconify/react";

const Glucose = ({ props }) => {
  return (
    <>
      {props ? (
        <div className="py-2 w-1/2 mx-1">
          <div className="rounded-3xl shadow-md bg-diaGreen text-white p-3">
            <div className="flex justify-between w-full items-center mb-3">
              <h3 className="font-inter text-md text-semibold truncate">Glucose</h3> <Icon icon="ph:info" />
            </div>

            <div className="my-3">
              <div className="mx-2">
                <p className="font-inter text-bold text-4xl truncate">
                  {props.glucose} <span className="text-sm text-semibold"> mg/dl</span>
                </p>
              </div>
            </div>
            <div className="mt-7 py-1 bg-white truncate rounded-full font-poppins text-semibold text-sm text-center text-diaGreen">
              <span>{moment(props.time).calendar()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-2 w-1/2 mx-1">
          <div className="rounded-3xl shadow-md bg-white p-3">
            <div className="flex justify-between w-full items-center text-center">
              <h3 className="font-poppins text-md text-semibold">there's no logs for today</h3>
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
