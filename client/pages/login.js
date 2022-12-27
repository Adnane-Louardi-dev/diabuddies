import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import EastIcon from "@mui/icons-material/East";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const [FormData, setFormData] = useState({});
  const onSubmit = (data) => setFormData(JSON.stringify(data));
  return (
    <div className="h-full h-screen">
      <div className="relative lg:hidden h-96 w-screen pt-16 px-8">
        {/* <h1 className="text-6xl text-white font-rubik font-semibold tracking-wider">Login to your panel</h1> */}
        <p className="text-4xl text-white tracking-wide leading-relaxed font-poppins">
          With <span className="font-semibold hover:underline hover:text-diaBlue decoration-diaOrange">DIABUDDIES</span> you can easily control <br />
          and track your diabetes in one single platform.
          <Button endIcon={<EastIcon />} className="my-6 font-roboto text-white hover:text-diaOrange text-4xl underline hover:decoration-diaOrange">
            Discover why and how
          </Button>
        </p>

        <Image src={"/signup_promo.jpg"} className="brightness-50 -z-50" fill objectFit="cover" alt={"black woman checking blood sugar"} />
      </div>
      <div className="flex flex-row -mt-12 bg-white justify-center lg:items-center h-full w-full rounded-t-[25px] lg:rounded-none">
        <div className="absolute my-16">
          <div className="text-inter text-diaBlue text-7xl font-semibold">
            DIA<span className="text-diaOrange">BUDDIES</span>
          </div>
        </div>
        <div className="flex-none w-full lg:basis-2/5 my-48">
          <div className="my-5 p-10">
            <div className="mb-12 pb-10 border-b-4">
              <Link href="/api/login/auth/google" passHref>
                <Button fullWidth variant="outlined" className="mb-7 p-7 text-diaGray text-4xl rounded-full border-4 border-diaGray">
                  <GoogleIcon className="text-5xl mx-5" />
                  Sign up with Google
                </Button>
              </Link>
              <Link href="/api/login/auth/facebook" to="http://localhost:3000/login/auth/facebook" as="/login" passHref>
                <Button fullWidth variant="outlined" className="mb-5 p-7 text-diaGray text-4xl rounded-full border-4 border-diaGray">
                  <FacebookIcon className="text-5xl mx-5" />
                  Sign up with Facebook
                </Button>
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                required
                InputLabelProps={{
                  style: {
                    fontSize: 45,
                    backgroundColor: "transparent",
                    color: "#666666",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: 45,
                    backgroundColor: "transparent",
                    margin: "25px 0",
                  },
                }}
                {...register("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                fullWidth
                id="standard-required"
                label="Email"
                variant="standard"
                margin="normal"
              />
              <TextField
                required
                InputLabelProps={{
                  style: {
                    fontSize: 45,
                    backgroundColor: "transparent",
                    color: "#666666",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: 45,
                    backgroundColor: "transparent",
                    margin: "25px 0",
                  },
                }}
                {...register("password")}
                fullWidth
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                margin="normal"
              />
              <Button
                fullWidth
                className="my-10 p-7 text-diaGray text-4xl rounded-full border-4 border-diaGray"
                variant="outlined"
                type="submit"
                margin="normal"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
        <div className="hidden relative lg:flex flex-1 justify-center rounded-lg shadow-2xl w-full h-full lg:basis-1/5">
          <div className="absolute backdrop-blur-lg rounded-3xl shadow-2xl my-20 p-8 z-50">
            <h2 className="mb-8 font-inter text-4xl font-semibold leading-relaxed tracking-wider text-white">
              Let's put some control <br /> on your diabetes together.
            </h2>
            <p className="text-lg text-white font-inter">
              With <span className="font-semibold hover:underline hover:text-diaBlue decoration-diaOrange">DIABUDDIES</span> you can easily control <br />
              and track your diabetes in one single platform.
            </p>

            <Button endIcon={<EastIcon />} className="my-8 font-rubik text-white hover:text-diaOrange text-xl underline hover:decoration-diaOrange">
              Discover why and how
            </Button>
          </div>
          <Image src={"/signup_promo.jpg"} className="brightness-50" fill alt={"black woman checking blood sugar"} />
        </div>
      </div>
    </div>
  );
}
