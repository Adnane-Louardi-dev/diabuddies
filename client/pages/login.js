import Link from "next/link";
import Image from "next/image";
import { TextInput, Label, Checkbox, Button } from "flowbite-react";
import { Icon } from "@iconify/react";
export default function Login() {
  return (
    <div className="h-full h-screen">
      <div className="flex flex-row items-center h-screen ">
        <div className="flex-none justify-center content-center basis-1/3 px-20">
          <div className="my-5 py-5">
            <h1 className="mb-2 text-2xl font-inter font-semibold">Create an Account</h1>
            <span className="text-md text-gray-400 font-inter">Let's manage your diabetes together.</span>
          </div>
          <form className="flex flex-col gap-4 font-rubik">
            <div className="pb-5 border-b-2">
              <Link href={"/login/auth/google"} passHref>
                <Button className="flex justify-center w-full bg-diaGreen hover:bg-transparent text-white hover:text-diaGray hover:border-diaGray rounded-full">
                  <Icon icon="fa:google" />
                  <span className="mx-3">Sign up with Google</span>
                </Button>
              </Link>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Your email" />
              </div>
              <TextInput id="email2" className="" type="email" placeholder="Email" required={true} shadow={true} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Your password" />
              </div>
              <TextInput id="password2" type="password" required={true} shadow={true} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Repeat password" />
              </div>
              <TextInput id="repeat-password" type="password" required={true} shadow={true} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" className="text-diaGray" />
              <Label htmlFor="agree">
                I agree with the{" "}
                <Link href="/forms" className="text-diaBlue hover:underline">
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button type="submit" className="bg-diaGray hover:bg-diaGreen text-white rounded-full">
              Register new account
            </Button>
          </form>
        </div>
        <div className="flex-1 rounded-lg bg-diaGreen w-full h-full basis-1/6">
          <div className="m-5">
            <div className="text-inter text-diaBlue text-2xl font-semibold">
              DIA<span className="text-diaOrange">BUDDIES</span>
            </div>
          </div>
          <div className="">
            <Image src={"/blackWomanChecking.png"} height={300} width={500} alt={"black woman checking blood sugar"} />
          </div>
        </div>
      </div>
    </div>
  );
}
