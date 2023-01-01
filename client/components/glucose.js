const Glucose = () => {
  return (
    <div className="py-2 w-1/2 mx-1">
      <div className="rounded-3xl shadow-md bg-diaGreen text-white p-3">
        <div className="flex justify-between w-full items-center mb-3">
          <h3 className="font-inter text-md text-semibold ">Glucose</h3>
        </div>

        <div className="my-3">
          <div className="mx-2">
            <p className="font-inter text-bold text-4xl text-white">
              95 <span className="text-sm text-semibold"> mg/dl</span>
            </p>
          </div>
        </div>
        <div className="mt-7">
          <span className="px-3 py-0.5 rounded-full bg-white font-poppins text-semibold text-diaGreen">21:30 Today</span>
        </div>
      </div>
    </div>
  );
};
export default Glucose;
