import React, {useEffect, useState} from "react";
import LoadingCircle from "../loadingCircle";
import {useGetHTML} from "../../customeHooks/useGetHTML";
import moment from "moment";
import {SmallArticle} from "./smallArticle";
import {Comment} from "./comment";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {Button, debounce} from "@mui/material";
import {useAddComment, useGetComment} from "../../customeHooks/useComments";
import {WishedIcon} from "../store/wishedIcon";
import {ShareBlog} from "./shareBlog";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import Typography from "@mui/material/Typography";
import {useElementOnScreen} from "../../customeHooks/useElementOnScreen";
import {useTranslation} from "next-i18next";
import {getDir} from "../../utils/getDir";
import Image from "next/image"
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";
import {RenderMarkup} from "../layout/renderMarkup";

export const Article = ({id,title,content, image,createdAt, relatedArticles,isLiked, likeCount, author:writer}) => {
    const [ref,haveReadArticle] = useElementOnScreen({
        rootMargin: "0px",
        threshold: 1
    })
    const {t,i18n} = useTranslation("blogStore")
    const queryClient = useQueryClient()
    const [comment, setComment] = useState("")
    const [liked, setLiked] = useState(isLiked)
    const [likesCount, setLikesCount] = useState(likeCount)
    const {mutate:addComment, component:addCommentNotification} = useAddComment(id)
    const {user:me} = useGetCurrentUser()
    const {mutate:likePost} = useMutation(["likePost"],
  ()=>{
                return axios.post(`/api/blog/article/like/${id}`)
            },
    {
                onMutate: () => {
                    if(liked){
                        setLikesCount(likesCount-1)
                    } else {
                        setLikesCount(likesCount+1)
                    }
                    setLiked((l) => !l)
               },
                onSettled: async () => {
                    const {data} = await axios.get(`/api/blog/article/like/${id}`)
                    setLiked(data.isLiked)
                    setLikesCount(data.likesCount)
                }
            })
    useEffect(() => {
        if(me && haveReadArticle){
            axios.post(`/api/blog/article/read/${id}`).then((res)=>{
                if(res.data.message === "read successfully"){
                    queryClient.invalidateQueries(["gamify"])
                }})
        }
    }, [haveReadArticle]);

    useEffect(() => {
        axios.get(`/api/blog/article/like/${id}`)
            .then(res => {
                setLiked(res.data.isLiked)
            })
    }, []);
    const {data, isLoading, isSuccess} = useGetComment(id)
    if(isHtmlLoading) {
        return <LoadingCircle />
    }
    const thumbnail = image ? image.data : ""
    const {name, biography, avatar} = writer.data?.attributes ?? {name: null, biography: null, avatar: {data: null}}
    const createdDate = moment(createdAt).format("DD/MM/YYYY")

    return  (
    <>
        {addCommentNotification}
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24" dir={getDir(i18n.language)}>
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article
                    className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
                    <header dir={"rtl"} className="mb-4 lg:mb-6 not-format">
                        <address className="flex justify-between mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                                {avatar?.data && <div className="ml-4 w-16 h-16l">
                                    <Image className={"relative rounded-full"}
                                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${avatar.data.attributes.url}`}
                                      layout="fill" objectFit="cover"
                                      alt={name}/>
                                </div>}
                                    <div>
                                        <span rel="author"
                                           className="text-xl font-bold text-gray-900">{name}</span>
                                        <p className="text-base font-light text-gray-500">
                                            <time pubdate dateTime={createdDate} title={createdDate}>
                                                {createdDate}
                                            </time>
                                        </p>
                                    </div>
                            </div>
                            <div>
                                <ShareBlog title={title} />
                                <WishedIcon itemId={id} type={"blog"} />
                            </div>
                        </address>
                        <h1 dir={"rtl"} className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                            {title}
                        </h1>
                    </header>
                    <RenderMarkup content={content} />
                    {!isLoading && isSuccess && <section className="not-format">
                        <div ref={ref} className="flex justify-between items-center my-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">{t("discussion")} ({data.data.length})</h2>
                            <div>
                                <Typography sx={{
                                    "&.MuiTypography-root":{
                                        fontSize: "17px"
                                    }}} variant="span" color="text.secondary">
                                    {likesCount}
                                </Typography>
                                <IconButton disabled={!me} onClick={debounce(likePost)}>
                                    <Icon icon={"mdi:like"} color={liked ? "#3AB0FF": undefined} />
                                </IconButton>
                                <ShareBlog title={title} />
                                <WishedIcon itemId={id} type={"blog"} />
                            </div>
                        </div>

                        <form className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg">
                                <label htmlFor="comment" className="sr-only">{t("yourComment")}</label>
                                <textarea id="comment"
                                          value={comment}
                                          onChange={(e) => {
                                              setComment(e.target.value)
                                          }}
                                          rows="6"
                                          className="p-3 w-full text-sm text-gray-900 border"
                                          placeholder={t("commentInput")} required/>
                            </div>
                            <Button
                                disabled={comment.length === 0 || !me}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    addComment(comment, {
                                        onSuccess: () => {
                                            setComment("")
                                        }
                                    })
                                }}
                                className={`${comment.length === 0 ? "cursor-not-allowed opacity-50" : ""} bg-diaBlue inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800`}>
                                {t("postComment")}
                            </Button>
                        </form>

                        {data.data.map((comment) => <Comment key={comment._id} articleId={id} {...comment} parentComment={null} />)}
                    </section>
                    }
            </article>
            </div>
        </main>

    <aside aria-label="Related articles" className="py-8 mb-8 lg:py-24" dir={getDir(i18n.language)}>
        <div className="px-4 mx-auto max-w-screen-xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">{t("relatedArticles")}</h2>
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
                {relatedArticles.map(({id,attributes}) => <SmallArticle key={id} id={id} {...attributes} />)}
            </div>
        </div>
    </aside>
</>)

}