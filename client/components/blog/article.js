import React, {useEffect, useState} from "react";
import LoadingCircle from "../loadingCircle";
import {useGetHTML} from "../../customeHooks/useGetHTML";
import moment from "moment";
import {SmallArticle} from "./smallArticle";
import {Comment} from "./comment";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {Button} from "@mui/material";
import {useAddComment, useGetComment} from "../../customeHooks/useComments";
import {WishedIcon} from "../store/wishedIcon";
import {ShareBlog} from "./shareBlog";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import Typography from "@mui/material/Typography";
import {useElementOnScreen} from "../../customeHooks/useElementOnScreen";


export const Article = ({id,title,content, image,createdAt, relatedArticles,isLiked,likeCount, author:writer}) => {
    const [ref,haveReadArticle] = useElementOnScreen({
        rootMargin: "0px",
        threshold: 1
    })
    const queryClient = useQueryClient()
    const {data:html, isLoading:isHtmlLoading} = useGetHTML(content)
    const [comment, setComment] = useState("")
    const [liked, setLiked] = useState(isLiked)
    const [likesCount, setLikesCount] = useState(likeCount)
    const {mutate:addComment, component:addCommentNotification} = useAddComment(id)
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
                    const {data:liked} = await axios.get(`/api/blog/article/like/${id}`)
                    setLiked(liked.isLiked)
                }
            })
    useEffect(() => {
        if(haveReadArticle){
            axios.post(`/api/blog/article/read/${id}`).then((res)=>{
                if(res.data.message === "read successfully"){
                    queryClient.invalidateQueries(["gamify"])
                }})
        }
    }, [haveReadArticle]);
    const {data, isLoading, isSuccess} = useGetComment(id)
    if(isHtmlLoading) {
        return <LoadingCircle />
    }
    const thumbnail = image ? image.data : ""
    const {name, biography, avatar} = writer.data ? writer.data.attributes : {name: null, avatar: {url: null,size:20}, biography: null}
    const createdDate = moment(createdAt).format("DD/MM/YYYY")

    return  (
    <>
        {addCommentNotification}
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article
                    className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex justify-between mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                                <img className="mr-4 w-16 h-16 rounded-full"
                                     src={`http://localhost:1337${avatar.data.attributes.url}`}
                                     width={avatar.size}
                                     height={avatar.size}
                                     alt={name} />
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
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                            {title}
                        </h1>
                    </header>
                    <div dangerouslySetInnerHTML={{__html: html}} />

                    {!isLoading && isSuccess && <section className="not-format">
                        <div ref={ref} className="flex justify-between items-center my-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Discussion
                                ({data.data.length})</h2>
                            <div>
                                <Typography sx={{
                                    "&.MuiTypography-root":{
                                        fontSize: "17px"
                                    }}} variant="span" color="text.secondary">
                                    {likesCount}
                                </Typography>
                                <IconButton onClick={()=>{
                                    likePost()
                                }}>
                                    <Icon icon={"mdi:like"} color={liked ? "#3AB0FF": undefined} />
                                </IconButton>
                                <ShareBlog title={title} />
                                <WishedIcon itemId={id} type={"blog"} />
                            </div>
                        </div>

                        <form className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg">
                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                <textarea id="comment"
                                          value={comment}
                                          onChange={(e) => {
                                              setComment(e.target.value)
                                          }}
                                          rows="6"
                                          className="p-3 w-full text-sm text-gray-900 border"
                                          placeholder="Write a comment..." required/>
                            </div>
                            <Button
                                disabled={comment.length === 0}
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
                                Post comment
                            </Button>
                        </form>

                        {data.data.map((comment) => <Comment key={comment._id} articleId={id} {...comment} parentComment={null} />)}
                    </section>
                    }
            </article>
            </div>
        </main>

    <aside aria-label="Related articles" className="py-8 mb-8 lg:py-24">
        <div className="px-4 mx-auto max-w-screen-xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Related articles</h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {relatedArticles.map(({id,attributes}) => <SmallArticle key={id} id={id} {...attributes} />)}
            </div>
        </div>
    </aside>
</>)

}