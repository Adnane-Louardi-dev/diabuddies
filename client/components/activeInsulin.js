const ActiveInsulin = () => {
  return (
    <div className="py-2 w-1/2 mx-1">
      <div className="rounded-3xl shadow-md bg-gray-800 text-white p-3">
        <div className="flex justify-between w-full items-center mb-3">
          <h3 className="font-inter text-md text-semibold ">Active insulin </h3>
        </div>

        <div className="my-3">
          <div className="mx-2">
            <p className="font-inter text-bold text-4xl text-white">
              2.89 <span className="text-sm text-semibold">UI</span>
            </p>
          </div>
        </div>
        <div className="mt-7">
          <span className="px-3 py-0.5 rounded-full bg-white font-poppins text-semibold text-gray-800">18:15 Today</span>
        </div>
      </div>
    </div>
  );
};
export default ActiveInsulin;
