import React from "react";
import { useSelector } from "react-redux";

const SingleImagePage = ({ match }) => {
    const { id } = match.params
    console.log(id, 'id')
    const content = useSelector((state) => state.content.content.find((item) => item._id === id))
    if (!content) {
        return <div>Loading or content not found...</div>
    }
    console.log(content, 'imagepage-content')
    return (
        <div>
            <h1>Image Page</h1>
            <h4>{content?.creatorId?.username}</h4>
            {content.type === "image" ? (
                <img src={content.fileType} alt={content.type} style={{ width: "200px", height: "200px" }} />
            ) : (
                <video controls width={200}>
                    <source src={content.fileType} />
                </video>
            )}<br />
            {content.likes.length}
            <br />
            {content.body}
            <ul>
                {content.comments.map((ele) => {
                    return (
                        <li key={ele._id}>{ele.body}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SingleImagePage 