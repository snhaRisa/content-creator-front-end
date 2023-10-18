import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContent } from "../Actions/newContentAction";
import jwt_decode from "jwt-decode";

const CreateContent = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ title: "", body: "", type: "", id: "", fileType: "" });
    const [fileType, setFileType] = useState(null);
    const [id, setID] = useState(jwt_decode(localStorage.getItem('token')));

    const handleIdChange = (e) => {
        const idInput = e.target.value;
        setID(idInput);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = jwt_decode(localStorage.getItem('token'));

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('body', form.body);
        formData.append('type', form.type);
        formData.append('id', id._id);

        // Append the file if it exists
        if (fileType) {
            formData.append('fileType', fileType);
        }

        dispatch(createContent(formData));

        // Clear the form fields
        setForm({ title: "", body: "", type: "", id: "" });
        setFileType(null);
    };

    const handleChange = (e) => {
        if (e.target.name === "fileType") {
            const fileInput = e.target.files[0];
            setFileType(fileInput);
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Content Title:
                    <input
                        required
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    Caption:
                    <input
                        required
                        type="text"
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    Video/Image:
                    <input
                        required
                        type="text"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    Upload File:
                    <input
                        type="file"
                        accept="image/*,video/*"
                        name="fileType"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreateContent;
