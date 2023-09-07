import React, {useMemo, useState} from "react";
import {Button} from "@mui/material";
import {useReplyToComment, useReportComment, useUpdateComment} from "../../customeHooks/useComments";
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import {useTranslation} from "next-i18next";


export const Comment = ({user,comments, content, createdAt, _id,articleId, parentComment}) => {
    const [actionsVisible, setActoinVisible] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [replyMode, setReplyMode] = useState(false)
    const {t} = useTranslation("blogStore")
    const {mutate: reportComment} = useReportComment()
    const {mutate: updateComment, component:editedCommentNotification} = useUpdateComment()
    const {mutate: replyToComment, component:replyNotification} = useReplyToComment()
    const {user:me, isLoading} = useGetCurrentUser()
    const [comment, setComment] = useState(content)
    const [reply, setReply] = useState("")

    const trackComment = useMemo(()=>{
        return {
            id: _id,
            parent: parentComment
        }
    },[])
    const handleOpenCommentMenu = (event) => {
        setActoinVisible(event.currentTarget);
    };

    const handleCloseCommentMenu = () => {
        setActoinVisible(null);
    };
     return (
      <article className="p-6 mb-6 text-base bg-white rounded-lg">
          {replyNotification}
          {editedCommentNotification}
          <footer className="flex justify-between items-center mb-2 relative">
              <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                      <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={`${user.photo}`}
                      alt={user.name}/>{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time pubdate dateTime={moment(createdAt).format("DD/MM/YYYY")}
                            title={moment(createdAt).format("DD/MM/YYYY")}>
                          {moment(createdAt).format("DD/MM/YYYY")}
                      </time>
                  </p>
              </div>
              {!isLoading && user._id === me._id &&
                  <>
                      <button id="dropdownComment2Button"
                              data-dropdown-toggle="dropdownComment2"
                              onClick={handleOpenCommentMenu}
                              className={`inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50`}
                              type="button">
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                              </path>
                          </svg>
                          <span className="sr-only">{t("commentSettings")}</span>
                      </button>
                      <Menu
                          sx={{ mt: "45px"}}
                          id="menu-appbar"
                          anchorEl={actionsVisible}
                          anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                          }}
                          className={"py-1 text-gray-700"}
                          open={Boolean(actionsVisible)}
                          onClose={handleCloseCommentMenu}
                      >
                          <MenuItem
                              className="block w-full text-gray-600 py-2 px-4 hover:bg-gray-100"
                              onClick={()=>{
                                  setEditMode(true)
                                  handleCloseCommentMenu()
                              }}>
                              {t("edit")}
                          </MenuItem>
                          {/*<MenuItem*/}
                          {/*    className="block w-full text-gray-600 py-2 px-4 hover:bg-gray-100"*/}
                          {/*    onClick={()=>{*/}
                          {/*        updateComment({articleId,id:_id,data:{*/}
                          {/*                isRemoved: true,*/}
                          {/*                trackComment*/}
                          {/*            }})*/}
                          {/*        handleCloseCommentMenu()*/}
                          {/*    }}>*/}
                          {/*    Remove*/}
                          {/*</MenuItem>*/}
                          <MenuItem
                              className="block w-full text-gray-600 py-2 px-4 hover:bg-gray-100"
                              onClick={()=>{
                                  reportComment({articleId,id:_id})
                                  handleCloseCommentMenu()
                              }}>
                              {t("report")}
                          </MenuItem>

                      </Menu>
              </>
          }
          </footer>
          {!editMode ? <p>{content}</p> :
            <div>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg">
                    <label htmlFor="comment" className="sr-only">{t("yourComment")}</label>
                    <textarea id="comment"
                              value={comment}
                              onChange={(e)=>{
                                  setComment(e.target.value)
                              }}
                              rows="auto"
                              className="p-3 w-full text-sm text-gray-900 border"
                              placeholder={t("yourComment")} required />
                </div>
                <Button
                    disabled={comment.length === 0}
                    onClick={(e)=>{
                        e.stopPropagation()
                        e.preventDefault()
                        setEditMode(false)
                        console.log(articleId, _id, comment)
                        updateComment({articleId,id:_id, data: {
                                content: comment
                            }})
                    }}
                    className={`${comment.length === 0 ? "cursor-not-allowed opacity-50" : ""} text-black bg-cyan-100 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800`}>
                    {t("commentEdit")}
                </Button>
            </div>
          }
          <div className="flex items-center mt-4 space-x-4">
              <button type="button"
                      onClick={()=>{
                          setReplyMode(!replyMode)
                      }}
                      className="flex items-center text-sm text-gray-500 hover:underline">
                  <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  {t("reply")}
              </button>
          </div>
          {replyMode && !isLoading &&
              <>
                  <div className="flex items-center mt-3">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                          <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={`${me.photo}`}
                              alt={me.givenName}/>{me.givenName} {me.familyName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time pubdate dateTime={moment().format("DD-MM-YYYY")}
                                title={moment().format("DD/MM/YYYY")}>
                              {moment().format("DD/MM/YYYY")}
                          </time>
                      </p>
                  </div>
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg">
                      <label htmlFor="reply" className="sr-only">{t("yourReply")}</label>
                      <textarea id="reply"
                                value={reply}
                                onChange={(e)=>{
                                    setReply(e.target.value)
                                }}
                                rows="auto"
                                className="p-3 w-full text-sm text-gray-900 border"
                                placeholder={t("replyInput")} required />
                  </div>
                  <div className={"flex justify-end"}>
                      <Button
                          disabled={reply.length === 0}
                          onClick={(e)=>{
                              e.stopPropagation()
                              e.preventDefault()
                              setReplyMode(false)
                              replyToComment({articleId,commentId:_id, data: {
                                      comment: reply
                                  }})
                          }}
                          className={`${reply.length === 0 ? "cursor-not-allowed opacity-50" : ""} text-black bg-cyan-100 py-2.5 px-4 text-xs font-medium text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800`}>
                          {t("reply")}
                      </Button>
                  </div>
              </>
          }
          {comments.map((comment => <Comment key={comment._id} articleId={articleId} {...comment} parentComment={{id:_id, parent: trackComment}} />))}
      </article>
    )
}