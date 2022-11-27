import { TextInput, Label, Checkbox, Button } from "flowbite-react";
export default function Login() {
  return (
    <div className="h-full h-screen">
      <div className="flex flex-row items-center h-screen m-5">
        <div className="flex-none justify-center content-center p-7 basis-1/8">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Your email" />
              </div>
              <TextInput id="email2" type="email" placeholder="name@flowbite.com" required={true} shadow={true} />
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
              <Checkbox id="agree" />
              <Label htmlFor="agree">
                I agree with the{" "}
                <a href="/forms" className="text-blue-600 hover:underline dark:text-blue-500">
                  terms and conditions
                </a>
              </Label>
            </div>
            <Button type="submit">Register new account</Button>
          </form>
        </div>
        <div className="flex-1 text-green-300 w-64 h-64 text-center basis-1/2">1</div>
      </div>
    </div>
  );
}
