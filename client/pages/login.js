import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const [FormData, setFormData] = useState({});
  const onSubmit = (data) => setFormData(JSON.stringify(data));
  return (
    <div className="h-full h-screen">
      <div className="absolute z-50 m-5">
        <div className="text-inter text-diaBlue text-3xl font-semibold">
          DIA<span className="text-diaOrange">BUDDIES</span>
        </div>
      </div>
      <div className="flex flex-row items-center h-screen ">
        <div className="flex-none justify-center content-center basis-2/5 px-20">
          <div className="my-5 py-5">
            <h1 className="mb-2 text-3xl font-inter font-semibold">Login to your panel</h1>
            <div className="py-5 border-b">
              <Link href="http://localhost:3000/login/auth/google" passHref>
                <Button fullWidth variant="outlined" className="mt-7 text-diaGray border-diaGray" startIcon={<GoogleIcon />}>
                  Sign up with Google
                </Button>
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                required
                {...register("email", { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                fullWidth
                id="standard-required"
                label="Email"
                variant="standard"
                margin="normal"
              />
              <TextField
                required
                {...register("password")}
                fullWidth
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                margin="normal"
              />
              <Button fullWidth className="my-5 text-diaGray border-diaGray" variant="outlined" type="submit" margin="normal">
                Sign in
              </Button>
            </form>
          </div>
        </div>
        <div className="relative flex-1 rounded-lg shadow-lg w-full h-full basis-1/5">
          <div className="absolute m-16 z-50">
            <h2 className="mb-8 font-rubik text-4xl text-white">
              Let's put some control <br /> on your diabetes together.
            </h2>
            <span className="text-lg text-white font-inter">
              With Diabuddies you can easily control <br /> your chronic disease and your Blood Sugar.
            </span>
          </div>
          <Image src={"/signup_promo.jpg"} className="blur-xs brightness-50" fill objectFit="cover" alt={"black woman checking blood sugar"} />
        </div>
      </div>
    </div>
  );
}
