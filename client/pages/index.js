import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Logo } from "../components/layout/Logo";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Container from "@mui/material/Container";
import LanguageSwitcher from "../components/appBar/LanguageSwitcher";
import { getDir } from "../utils/getDir";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function LandingPage() {
  const { t, i18n } = useTranslation("landingPage");

  return (
    <Container maxWidth={"xl"}>
      <LanguageSwitcher lang={i18n.language} />
      <header className="fixed top-0 left-5 right-5 z-10">
        <nav className={"flex justify-between items-center bg-white my-5 rounded-3xl px-5 shadow-lg"}>
          <Logo />
          <div className={"self-center"}>
            <Button className={"text-diaDarkBlue capitalize mx-1 px-6 py-2"}>About us</Button>
            <Button className={"text-diaDarkBlue capitalize mx-1 px-6 py-2"}>Team</Button>
            <Button className={"text-diaDarkBlue capitalize mx-1 px-6 py-2"}>Contact</Button>
            <Button className={"bg-diaDarkBlue text-white rounded-3xl capitalize mx-1 px-6 py-2 font-tajawal"}>{t("logIn")}</Button>
          </div>
        </nav>
      </header>
      <main className="my-28">
        <section className={"flex gap-4 justify-between items-center h-[calc(100vh-150px)]"}>
          <Image src={"/landing_page_assets/vector2.png"} height={300} width={200} className="absolute right-0 bottom-0" />
          <Image src={"/landing_page_assets/vector3.png"} height={300} width={200} className="absolute left-0 top-20" />
          <Image src={"/landing_page_assets/vector1.png"} height={300} width={200} className="absolute top-[55%] translate-x-[300%]" />
          <Image src={"/landing_page_assets/vector4.png"} height={300} width={200} className="absolute top-[15%] translate-x-[500%]" />
          <div className={"w-1/2 h-full p-2"}>
            <Image src={`${i18n.language !== "ar" ? "." : ".."}/landing_page_assets/glass.png`} height={500} width={1000} alt={"hero section image"} />
          </div>
          <div className={"w-1/2 h-full px-16 relative"} dir={getDir(i18n.language)}>
            <div className={"absolute top-[40%] translate-y-[-50%]"}>
              <h1 className={"font-tajawal tracking-wide font-bold text-5xl text-diaDarkBlue leading-normal mb-4"}>
                تحكم في <span className="text-diaBlue"> السكر ديالك</span>، ماتخليهش اتحكم فيك!
              </h1>
              <div className={"[&>ul]:list-disc tracking-wide font-tajawal text-xl font-bold text-diaGray mr-4"}>
                مع <span className="text-diaDarkBlue">Diabuddies</span> كلشي تيولي ساهل.
              </div>
              <div className="flex justify-start gap-3 mt-10 mr-4">
                <Image src={"/landing_page_assets/appstore.png"} height={150} width={150} />
                <Image src={"/landing_page_assets/googleplay.png"} height={150} width={150} />
              </div>
            </div>
          </div>
        </section>
        <section className="p-5">
          <div className="relative rounded-2xl bg-white shadow-md p-5">
            <div className="text-center font-tajawal font-bold text-3xl mb-5">
              علاش <span className="text-diaBlue">Diabuddies</span>
            </div>
            <Image src={"/landing_page_assets/vector5.png"} height={200} width={300} className="absolute left-3 bottom-28" />
            <Image src={"/landing_page_assets/Rectangle6.png"} height={50} width={150} className="absolute right-3 top-0" />
            <div className="flex snap-x snap-mandatory px-3 w-full overflow-x-scroll no-scrollbar">
              <div className="relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 border-diaGray text-center w-52 h-full">
                <div className="flex justify-center items-center rounded-full bg-diaBlue my-3 w-10 h-10">
                  <Icon icon="material-symbols:book-outline" className="text-white h-6 w-6" />
                </div>
                <div className="font-tajawal text-xl font-bold">ذاكرتك الغدائية</div>
                <div className="font-tajawal text-md text-diaGray">خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.</div>
              </div>
              <div className="relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 border-diaGray text-center w-52 h-full">
                <div className="flex justify-center items-center rounded-full bg-diaBlue my-3 w-10 h-10">
                  <Icon icon="material-symbols:book-outline" className="text-white h-6 w-6" />
                </div>
                <div className="font-tajawal text-xl font-bold">ذاكرتك الغدائية</div>
                <div className="font-tajawal text-md text-diaGray">خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.</div>
              </div>
              <div className="relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 border-diaGray text-center w-52 h-full">
                <div className="flex justify-center items-center rounded-full bg-diaBlue my-3 w-10 h-10">
                  <Icon icon="material-symbols:book-outline" className="text-white h-6 w-6" />
                </div>
                <div className="font-tajawal text-xl font-bold">ذاكرتك الغدائية</div>
                <div className="font-tajawal text-md text-diaGray">خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.</div>
              </div>
              <div className="relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 border-diaGray text-center w-52 h-full">
                <div className="flex justify-center items-center rounded-full bg-diaBlue my-3 w-10 h-10">
                  <Icon icon="material-symbols:book-outline" className="text-white h-6 w-6" />
                </div>
                <div className="font-tajawal text-xl font-bold">ذاكرتك الغدائية</div>
                <div className="font-tajawal text-md text-diaGray">خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.</div>
              </div>
              <div className="relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 border-diaGray text-center w-52 h-full">
                <div className="flex justify-center items-center rounded-full bg-diaBlue my-3 w-10 h-10">
                  <Icon icon="material-symbols:book-outline" className="text-white h-6 w-6" />
                </div>
                <div className="font-tajawal text-xl font-bold">ذاكرتك الغدائية</div>
                <div className="font-tajawal text-md text-diaGray">خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.</div>
              </div>
              <div className="relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 border-diaGray text-center w-52 h-full">
                <div className="flex justify-center items-center rounded-full bg-diaBlue my-3 w-10 h-10">
                  <Icon icon="material-symbols:book-outline" className="text-white h-6 w-6" />
                </div>
                <div className="font-tajawal text-xl font-bold">ذاكرتك الغدائية</div>
                <div className="font-tajawal text-md text-diaGray">خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.</div>
              </div>
              <div className="relative snap-center mr-4 shrink-0 grid justify-items-center bg-white rounded-2xl p-3 border-2 border-diaGray text-center w-52 h-full">
                <div className="flex justify-center items-center rounded-full bg-diaBlue my-3 w-10 h-10">
                  <Icon icon="material-symbols:book-outline" className="text-white h-6 w-6" />
                </div>
                <div className="font-tajawal text-xl font-bold">ذاكرتك الغدائية</div>
                <div className="font-tajawal text-md text-diaGray">خلي وجباتك تعكس صحتك, خليهم فرصة باش تحقق حياة صحية متوازنة. كلف تطبيقنا يولي الشريك الدائم ديالك باش تنظم الوجبات دياولك.</div>
              </div>
            </div>
          </div>
        </section>
        <section className="p-5">
          <div className="flex justify-between relative rounded-2xl bg-white shadow-md p-5 h-full" dir={getDir(i18n.language)}>
            <div className="w-1/2 my-5">
              <h3 className="font-tajawal text-2xl font-bold text-diaDarkBlue my-3">تسجل معانا باش يوصلك الجديد</h3>
              <p className="font-tajawal text-lg font-semibold text-diaGray mr-2">Diabuddies غادي تصيفط ليك غاع داكشي لي متعلق بالسكري باش تعرف عليه كتر و تقدر تعايش معاه حسن</p>
            </div>
            <Image src={"/landing_page_assets/vector5.png"} height={200} width={200} className="absolute left-10 -top-2.5" />
            <div className="relative grid items-center justify-end w-1/2">
              <Button className={"bg-diaDarkBlue w-40 text-white rounded-xl capitalize mx-6 px-7 py-3 font-tajawal shadow-lg"}>{t("logIn")}</Button>
            </div>
          </div>
        </section>
        <section className="p-5">
          <div className="rounded-2xl bg-white shadow-md p-5 h-full" dir={getDir(i18n.language)}>
            <div className="text-center font-tajawal font-bold text-3xl mb-5">
              <span className="text-diaBlue">Diabuddies's</span> Team
            </div>
            <div className="flex justify-around">
              <div className="grid gap-3 justify-items-center items-center">
                <Image src={"/landing_page_assets/adnane.png"} height={200} width={200} alt="adnane louardi picture" />
                <h4 className="font-bold font-poppins text-xl text-diaDarkBlue">Adnane Louardi</h4>
                <Button className={"flex justify-around bg-diaDarkBlue w-40 text-white rounded-xl capitalize mx-6 px-2 py-2 font-tajawal shadow-lg"}>
                  Github Account
                  <span>
                    <Icon icon="mdi:github" className="h-7 w-7 text-white" />
                  </span>{" "}
                </Button>
              </div>
              <div className="grid gap-3 justify-items-center items-center">
                <Image src={"/landing_page_assets/ahmed.png"} height={200} width={200} alt="ahmed benahmed picture" />
                <h4 className="font-bold font-poppins text-xl text-diaDarkBlue">Ahmed BenAhmed</h4>
                <Button className={"flex justify-around bg-diaDarkBlue w-40 text-white rounded-xl capitalize mx-6 px-2 py-2 font-tajawal shadow-lg"}>
                  Github Account
                  <span>
                    <Icon icon="mdi:github" className="h-7 w-7 text-white" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className={"flex"}>
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
        </div>
      </main>
      <footer></footer>
    </Container>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["landingPage"])),
  },
});
