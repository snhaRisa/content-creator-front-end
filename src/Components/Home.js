import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showContent, addComment, removeLikeAsync, addLikeAsync, deleteComment } from "../Actions/allContentsAction"
import { deleteContent } from "../Actions/newContentAction"
import TestHomePage from "./TestHomePage"

const ContentItem = ({ content }) => {
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState("")
    const [showCommentInput, setShowCommentInput] = useState(false);

    const userData = useSelector(state => { return state.users.data })
    const liked = useSelector((state) => {
        const contentItem = state.content.content.find(item => item._id === content._id);
        return contentItem
    })

    const check = liked.likes.some(item => item.userId === userData._id)
    const handleAddComment = () => {
        dispatch(addComment(content._id, commentText))
        setCommentText("")
        setShowCommentInput(false)
    }

    const handleLikeClick = (contentId) => {

        if (check) {
            console.log({ re: contentId, })
            dispatch(removeLikeAsync(contentId))
        } else {
            console.log(contentId)
            dispatch(addLikeAsync(contentId))
        }
        dispatch(showContent())
      
        }
        const handleRemoveComment = (commentId, postId) => {
            dispatch(deleteComment(commentId, postId))
        }
        const handleDeleteContent = (id) => {
            dispatch(deleteContent(id))
            dispatch(showContent())
        }
    return (
        <div>
            {content?.body}
            <p>
                <button onClick={() => handleLikeClick(content._id)}>
                    {check ? "Unlike" : "Like"}
                </button>
                <button onClick={() => handleDeleteContent(content._id)}>remove</button>
                {content?.likes?.length}
            </p>
            <div>
                <ul>
                    {content.comments.map((comment) => (
                        <li key={comment._id}>
                            {comment.body}
                            <button
                                onClick={() => {
                                    handleRemoveComment(comment._id, comment.postId);
                                }}
                            >remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button onClick={() => setShowCommentInput(!showCommentInput)}>
                    {showCommentInput ? "Hide Comment" : "Add Comment"}
                </button>
                {showCommentInput && (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your comment"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={handleAddComment}>Add Comment</button>
                    </div>
                )}
            </div>
        </div>
    );
}

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showContent())
    }, [dispatch])

    const content = useSelector((state) => state.content.content)
    console.log(content, 'content')

    if (!content || content.length === 0) {
        return <div>Loading or no content available...</div>
    }
    return (
        <div>
            <TestHomePage/>
        </div >
    )
}

export default Home
