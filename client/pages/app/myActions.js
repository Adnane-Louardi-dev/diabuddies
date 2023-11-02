import ResponsiveAppBar from "../../components/layout/ResponsiveAppBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import LoadingCircle from "../../components/loadingCircle";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { actionsLogbook } from "../../utils/actionLogbook";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import withAuth from "../../components/layout/withAuth";
import { useElementOnScreen } from "../../customeHooks/useElementOnScreen";
import { MyActionComponent } from "../../components/gamifiy/MyActionComponent";
import { MyActionSkeletonComponent } from "../../components/gamifiy/MyActionSkeletonComponent";

const PAGE_SIZE = 10;

function MyActions() {
  const { i18n, t } = useTranslation();
  const [ref, isVisible] = useElementOnScreen({
    rootMargin: "0px",
    threshold: 1,
  });
  const { data, isFetchingNextPage, fetchNextPage, isInitialLoading } = useInfiniteQuery(
    ["my-actions"],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get("/api/gamify/actions", {
        params: {
          pageSize: PAGE_SIZE,
          pageParam,
        },
      });
      return data;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const myActions = useMemo(() => {
    const actions = data?.pages.flatMap((page) => page) ?? [];
    return actions.map((action) => ({
      ...{ label: "You earned some insulin molecules 🎉", icon: "healthicons:i-note-action" },
      ...actionsLogbook.find((actionLogbook) => actionLogbook.actionType === action.actionType),
      pointsEarned: action.pointsEarned,
    }));
  }, [data]);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  return (
    <section>
      <Typography typography={"h4"} className={"absolute top-0 right-0 left-0 flex items-end justify-center bg-diaDarkBlue rounded-b-3xl pb-5 text-white h-52 font-inter shadow-lg"} textAlign={"center"}>
        {t("my_actions")}
      </Typography>
      <ResponsiveAppBar />
      <Container sx={{ position: "relative", top: "7rem" }}>
        {isInitialLoading && <MyActionSkeletonComponent parentClass={"border-r-4"} />}
        <div className={"mt-10"}>
          {myActions.map((myAction, index) => {
            if (myActions.length !== index + 1) {
              return <MyActionComponent key={myAction.label + index} {...myAction} lang={i18n.language} />;
            }
            return (
              <div ref={ref} key={myAction.label + index}>
                <MyActionComponent {...myAction} lang={i18n.language} />
              </div>
            );
          })}
          {isFetchingNextPage && (
            <>
              <MyActionSkeletonComponent parentClass={"border-r-4"} />
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "index"])),
  },
});

export default MyActions;
