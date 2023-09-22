import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {useNotificatoin} from "./useNotificatoin";


const findComment = (comments, id) => {
    let comment = comments.find(({_id}) => _id === id)
    while(!comment && comments.length > 0){
        comments = comments.flatMap(comment => comment.comments)
        comment = comments.find(({_id}) => _id === id)
    }
    return comment
}

const removeComment = (comments, id) => {
    if(comments.find(({_id}) => _id === id))
        return comments.filter(({_id}) => _id !== id)
    return {
        ...comments,
        comments: removeComment(comments.flatMap(comment => comment.comments),id)
    }
    // let comment = undefined
    // do {
    //     comment = comments.find(({_id}) => _id === id)
    //     console.log("commet",comment)
    //     if(comment){
    //         comments = comments.filter(({_id}) => _id !== id)
    //     }
    //     comments = comments.flatMap(comment => comment.comments)
    // } while (!comment && comments.length > 0)
    // let comment = comments.find(({_id}) => _id === id)
}
export const useGetComment = (articleId) => {
    const res = useQuery({
        queryKey: ["getComments",articleId],
        queryFn: () => {
            return axios.get(`/api/comments/${articleId}`)
        }
    })

    return {...res, data: res.data}
}

export const useAddComment = (id) => {
    const queryClient = useQueryClient()

    const result = useMutation({
        mutationKey: ["addComment"],
        mutationFn: (comment) => {
            return axios.post(`/api/comments/${id}`, {comment})
        },
        onMutate:async (comment) => {
            await queryClient.cancelQueries(["getComments",id])
            const comments = queryClient.getQueryData(["getComments",id])
            const {data:user} = queryClient.getQueryData(["getCurrentUser"])
            comments.data.push({
                user,
                content: comment,
                comments: []
            })
            queryClient.setQueryData(["getComments",id],comments)
        },
        onError: (e) => {
            console.error(e)
        },
        onSettled: () => {
            handleOpen()
            queryClient.invalidateQueries(["getComments", id])
        }
    })

    const {component, handleOpen} = useNotificatoin({
        successMessage: "Your comment was added successfully",
        errorMessage: "There was an error while adding your comment",
        isError: result.isError
    })

    return {...result,component}
}
export const useReportComment = () => useMutation({
    mutationKey: ["reportComment"],
    mutationFn: ({id,articleId}) => {
        return axios.delete(`/api/comments/${articleId}/${id}`)
    }
})

export const useUpdateComment = () => {
    const queryClient = useQueryClient()
    const result = useMutation({
        mutationKey: ["updateComment"],
        mutationFn: ({id, articleId, data}) => {
            return axios.put(`/api/comments/${articleId}/${id}`, data)
        },
        onMutate: async ({id,articleId,data}) => {
          await queryClient.cancelQueries(["getComments",articleId])
          let comments = queryClient.getQueryData(["getComments",articleId])
          if(data.isRemoved){
              console.log(data.trackComment)
              // comments = {
              //     ...comments,
              //     data: removeComment(comments.data, id).comments
              // }
              // console.log("comments: ",comments)
              // comments = {...comments, data:}
          } else {
              const comment = findComment(comments.data, id)
              if(comment){
                  comment.content = data.content
              }
          }
          queryClient.setQueryData(["getComments",articleId], comments)
        },
        onSettled: ({id, articleId, data}) => {
            handleOpen()
            queryClient.invalidateQueries(["getComments",articleId])
        }
    })
    const {component, handleOpen} = useNotificatoin({
        successMessage: "Your comment was modified successfully",
        errorMessage: "There was an error while modifying your comment",
        isError: result.isError
    })

    return {...result,component}
}
export const useReplyToComment = () => {
    const queryClient = useQueryClient()

    const result = useMutation({
        mutationKey: ["replyToComment"],
        mutationFn: ({commentId, articleId, data}) => {
            return axios.post(`/api/comments/reply/${articleId}/${commentId}`, data)
        },
        onMutate: async ({commentId, articleId, data}) => {
            await queryClient.cancelQueries(["getComments",articleId])
            const comments = queryClient.getQueryData(["getComments",articleId])
            const {data:user} = queryClient.getQueryData(["getCurrentUser"])
            const comment = findComment(comments.data, commentId)
            comment.comments.push({
                user,
                content: data.comment,
                comments: []
            })
            queryClient.setQueryData(["getComments",articleId],comments)
        },
        onSettled: ({articleId}) => {
            handleOpen()
            queryClient.invalidateQueries(["getComments",articleId])
        }
    })

    const {component, handleOpen} = useNotificatoin({
        successMessage: "Your reply was added successfully",
        errorMessage: "There was an error while adding your reply",
        isError: result.isError
    })
    return {...result, component}
}