import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Logo } from "../components/layout/Logo";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Container from "@mui/material/Container";
import LanguageSwitcher from "../components/appBar/LanguageSwitcher";
import { getDir } from "../utils/getDir";
import Image from "next/image";
import { Icon } from "@iconify/react";
import assets from "../components/layout/importLandingPageAssets"
const {vector1, vector2, vector3, vector4,vector5,ahmed, adnane, appstore, googleplay, glass, logo, Rectangle6}= assets
function DiabuddiesProsComp({ prosName, prosDescriptions, icon, color }) {
  return (
    <div className={`relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 text-center w-52`} style={{ borderColor: color }}>
      <div className={`flex justify-center items-center rounded-full my-3 w-10 h-10`} style={{ backgroundColor: color }}>
        <Icon icon={icon} className="text-white h-6 w-6" />
      </div>
      <div className="font-tajawal text-xl font-bold">{prosName}</div>
      <div className="font-tajawal text-md text-diaGray">{prosDescriptions}</div>
    </div>
  );
}
const pros = [
  {
    prosName: "ذاكرتك الغدائية",
    prosDescriptions: "خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.",
    icon: "material-symbols:book-outline",
    color: "#666666",
  },
  {
    prosName: "حساب الكارب",
    prosDescriptions: "مع Diabuddies تيولي حساب الكاربوهيدرات شي حاجة ساهلة, بسهولة كتعرف شحال ديال الأنسولين غادي تاخد,",
    icon: "fluent:food-grains-20-regular",
    color: "#FFB562",
  },
  {
    prosName: "مقالات",
    prosDescriptions: "عندنا مقالات متنوعة كاملين تيتكلموا على حاجة وحدة و هي السكري, و كيفاش نتحكم و نعرف سكاري خطوة خطوة.",
    icon: "lucide:pen-line",
    color: "#44D29F",
  },
  {
    prosName: "إشعارات",
    prosDescriptions: "كنرسلو ليك إشعارات مرات متعددة باش نفكروك فوقت الأكل ديالك و باش تطمأن على صحتك و كنصحوك باش تبقى على بال.",
    icon: "iconamoon:notification-fill",
    color: "#000000",
  },
  {
    prosName: "متجر إلكتروني",
    prosDescriptions: "باش نسهلو عليك كلشي, Diabuddies عندها متجر خاص بيها لي تقدر تشري منو أي حاجة متعلقة بالسكري, غير طلب و غادي نجيو حتال بابكم.",
    icon: "uil:store",
    color: "#3AB0FF",
  },
  {
    prosName: "نشرة بريدية",
    prosDescriptions: "مرة في الأسبوع غادي نصيفطو ليك آخر الأخبار لي كتعلق بالسكري و نصيفطو لك مقالات عليه, لي كتهمك نتا بالطبع.",
    icon: "bx:news",
    color: "#666666",
  },
];
export default function LandingPage() {
  const { t, i18n } = useTranslation("landingPage");

  return (
    <Container maxWidth={"xl"}>
      <LanguageSwitcher lang={i18n.language} />
      <header className="fixed top-0 left-5 right-5 z-10">
        <nav className={"flex justify-between items-center bg-white my-5 rounded-3xl px-5 shadow-lg"}>
          <Logo />
          <div className={"self-center"}>
            <Button className={"text-diaDarkBlue capitalize mx-1 px-6 py-2 hidden md:inline"}>About us</Button>
            <Button className={"text-diaDarkBlue capitalize mx-1 px-6 py-2 hidden md:inline"}>Team</Button>
            <Button className={"text-diaDarkBlue capitalize mx-1 px-6 py-2 hidden md:inline"}>Contact</Button>
            <Button className={"bg-diaDarkBlue text-white rounded-3xl capitalize mx-1 px-6 py-2 font-tajawal"}>{t("logIn")}</Button>
          </div>
        </nav>
      </header>
      <main className="my-28">
        <section className={"flex gap-4 justify-between items-center h-[calc(100vh-150px)]"}>
          <Image src={vector2} height={300} width={200} className="absolute right-0 bottom-0" />
          <Image src={vector3} height={300} width={200} className="absolute left-0 top-20" />
          <Image src={vector1} height={300} width={200} className="absolute top-[45%] md:top-[55%] translate-x-5 md:translate-x-[300%]" />
          <Image src={vector4} height={300} width={200} className="absolute top-[5%] md:top-[15%] translate-x-44 md:translate-x-[500%]" />
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className={"relative w-full"}>
              <Image src={glass} height={500} width={500} alt={"hero section image"} className="" />
            </div>
            <div className={"w-full h-full px-16 relative"} dir={"rtl"}>
              <div className={"absolute w-full grid items-center -translate-y-[300%] md:translate-y-20 translate-x-[20%] md:translate-x-[35%]"}>
                <h1 className={"font-tajawal tracking-wide font-bold text-4xl md:text-5xl text-diaDarkBlue leading-normal mb-2 md:mb-4"}>
                  تحكم في <span className="text-diaBlue"> السكر ديالك</span>، ماتخليهش اتحكم فيك!
                </h1>
                <div className={"[&>ul]:list-disc tracking-wide font-tajawal text-md md:text-xl font-bold text-diaGray mr-2 md:mr-4"}>
                  مع <span className="text-diaDarkBlue">Diabuddies</span> كلشي تيولي ساهل.
                </div>
                <div className="hidden md:flex justify-start gap-3 mt-10 mr-4">
                  <Image src={appstore} height={150} width={150} />
                  <Image src={googleplay} height={150} width={150} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-5">
          <div className="relative rounded-2xl bg-white shadow-md p-5">
            <div className="text-center font-tajawal font-bold text-3xl mb-5">
              <span className="text-diaBlue">Diabuddies</span> علاش
            </div>
            <Image src={vector5} height={200} width={300} className="absolute left-3 bottom-28" />
            <Image src={Rectangle6} height={50} width={150} className="absolute right-3 top-0" />
            <div className="flex snap-x snap-mandatory px-3 w-full overflow-x-scroll no-scrollbar">
              {pros.map((item, index) => {
                return <DiabuddiesProsComp icon={item.icon} color={item.color} prosDescriptions={item.prosDescriptions} prosName={item.prosName} />;
              })}
            </div>
          </div>
        </section>
        <section className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between relative rounded-2xl bg-white shadow-md p-5 h-full" dir={getDir(i18n.language)}>
            <div className=" my-5">
              <h3 className="font-tajawal text-2xl font-bold text-diaDarkBlue my-3">تسجل معانا باش يوصلك الجديد</h3>
              <p className="font-tajawal text-lg font-semibold text-diaGray mr-2">Diabuddies غادي تصيفط ليك غاع داكشي لي متعلق بالسكري باش تعرف عليه كتر و تقدر تعايش معاه حسن</p>
            </div>
            <div className=" grid items-center justify-center">
              <Image src={vector5} height={200} width={200} className="absolute left-[25%] top-32" />
              <Button className={"bg-diaDarkBlue w-40 text-white rounded-xl capitalize mx-6 px-7 py-3 font-tajawal shadow-lg"}>{t("logIn")}</Button>
            </div>
          </div>
        </section>
        <section className="p-5">
          <div className="rounded-2xl bg-white shadow-md p-5 h-full" dir={getDir(i18n.language)}>
            <div className="text-center font-tajawal font-bold text-3xl mb-5">
              <span className="text-diaBlue">Diabuddies's</span> Team
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-around">
              <div className="grid gap-3 justify-items-center items-center">
                <Image src={adnane} height={150} width={150} alt="adnane louardi picture" />
                <h4 className="font-bold font-poppins text-xl text-diaDarkBlue">Adnane Louardi</h4>
                <Button className={"flex justify-around bg-diaDarkBlue w-40 text-white rounded-xl capitalize mx-6 p-1 font-rubik shadow-lg"}>
                  <span className="mt-0.5">Github Account</span>
                  <Icon icon="mdi:github" className="h-7 w-7 text-white" />
                </Button>
              </div>
              <div className="grid gap-3 justify-items-center items-center">
                <Image src={ahmed} height={150} width={150} alt="ahmed benahmed picture" />
                <h4 className="font-bold font-poppins text-xl text-diaDarkBlue">Ahmed Benahmed</h4>
                <Button className={"flex justify-around bg-diaDarkBlue w-40 text-white rounded-xl capitalize mx-6 p-1 font-rubik shadow-lg"}>
                  <span className="mt-0.5">Github Account</span>
                  <Icon icon="mdi:github" className="h-7 w-7 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* <div className={"flex"}>
          <div className={"w-1/2 h-full"} />
          <div className={"w-1/2"} dangerouslySetInnerHTML={{ __html: t("logbook_pros").split("\n").join("<br>") }} />
        </div>
        <div className={"flex"}>
          <div className={"w-1/2"} dangerouslySetInnerHTML={{ __html: t("blog_pros").split("\n").join("<br>") }} />
          <div className={"w-1/2 h-full"} />
        </div>
        <div className={"flex"}>
          <div className={"w-1/2 h-full"} />
          <div className={"w-1/2"} dangerouslySetInnerHTML={{ __html: t("store_pros").split("\n").join("<br>") }} />
        </div>
        <div className={"flex"}>
          <div className={"w-1/2"} dangerouslySetInnerHTML={{ __html: t("newsletter_pros").split("\n").join("<br>") }} />
          <div className={"w-1/2 h-full"} />
        </div> */}
      </main>
      <footer className="border-2 rounded-2xl bg-white p-2 shadow-lg">
        <section className="grid grid-cols-1 md:grid-cols-3 mt-3 p-2">
          <div className="grid gap-1 text-center justify-items-center md:justify-items-start">
            <Image src={logo} height={100} width={200} className="-mt-10 self-center md:self-start" />
            <p className="font-rubik text-sm font-light text-diaGray ml-5 -mt-8">Diabuddies is the world's platform and community for diabetics people, that helps them to manage their illness.</p>
            <div className="flex justify-around items-center m-3 gap-5 md:gap-2">
              <Icon icon="mdi:github" className="h-10 w-10 text-diaGray" />
              <Icon icon="mdi:twitter" className="h-10 w-10 text-diaGray" />
              <Icon icon="ic:baseline-facebook" className="h-10 w-10 text-diaGray" />
              <Icon icon="bi:instagram" className="h-9 w-9 text-diaGray" />
            </div>
          </div>
          <div className="grid items-start justify-center text-center md:text-start my-3">
            <h4 className="font-poppins font-semibold text-lg">Company</h4>
            <h4 className="font-poppins font-medium text-md">About</h4>
            <h4 className="font-poppins font-medium text-md">API</h4>
            <h4 className="font-poppins font-medium text-md">Terms of service</h4>
            <h4 className="font-poppins font-medium text-md">Privacy policy</h4>
            <h4 className="font-poppins font-medium text-md">Cookie policy</h4>
          </div>
          <div className="grid items-start justify-center text-center md:text-start my-3">
            <h4 className="font-poppins font-semibold text-lg">Directories</h4>
            <h4 className="font-poppins font-medium text-md">Dashboard</h4>
            <h4 className="font-poppins font-medium text-md">Profile</h4>
            <h4 className="font-poppins font-medium text-md">Logbooks</h4>
            <h4 className="font-poppins font-medium text-md">Graphs</h4>
            <h4 className="font-poppins font-medium text-md">Settings</h4>
          </div>{" "}
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center md:text-start items-center p-5 border-t-2 border-diaBlue">
          <div className="self-center font-poppins font-bold text-2xl text-diaDarkBlue">Diabuddies</div>
          <div className="self-center text-end font-poppins font-light text-sm text-diaGray">@ {new Date().getFullYear()} Diabuddies. All rights are reserved.</div>
        </section>
      </footer>
    </Container>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["landingPage"])),
  },
});
