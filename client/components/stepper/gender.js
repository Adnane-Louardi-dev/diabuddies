import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import Image from "next/image";

const Gender = ({data, setData}) => {

    const handleGenderChange = (_, newGender) => {
        setData(oldData => ({...oldData, gender: newGender}))
    };
    return (
        <section>
            <div className="mt-24 grid items-center justify-center text-center">
                <h1 className="font-semibold font-poppins text-xl">
                    What's your <span className="decoration-none font-bold text-diaBlue">gender</span> sweety?
                </h1>
                <p className="my-3 font-rubik text-gray-400">
                    we will use this data for a better <br/>
                    management for you
        </p>
      </div>
      <div className="flex justify-around mt-10">
        <ToggleButtonGroup
            sx={{
                "& .MuiButtonBase-root.MuiToggleButton-root.Mui-selected": {
                    backgroundColor: "#98D6FF",
                    border: "none",
                },
            }}
            value={data.gender}
            exclusive
            onChange={handleGenderChange}
            aria-label="text alignment"
            className="grid grid-cols-2 p-5"
        >
          <ToggleButton value="female" className="grid rounded-xl self-center shadow-md mx-5">
            <Image src={"/female_avatar_diaBlue.png"} height={250} width={120} alt={"blue illustration of female character"} />
            <div className="m-5">
              <h5 className="font-poppins font-semibold">Female</h5>
            </div>
          </ToggleButton>
          <ToggleButton value="male" className="grid rounded-xl self-center shadow-md mx-5">
            <Image src={"/male_avatar_diaBlue.png"} height={250} width={120} alt={"blue illustration of male character"} />
            <div className="m-5">
              <h5 className="font-poppins font-semibold">Male</h5>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </section>
  );
};

export default Gender;
