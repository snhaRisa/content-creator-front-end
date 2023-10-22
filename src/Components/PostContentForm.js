import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { createContent } from '../Actions/newContentAction';

const PostContentForm = (props) => 
{
    const dispatch = useDispatch();
    const user = useSelector((state) => 
    {
        return state.users.data;
    });

    const [richText, setRichText] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        creatorId: String(user._id),
        title: '',
        body: '',
        type: 'image',
        forSubscribers: false,
        fileType: null,
    });

    function runValidations() 
    {
        const temp = {};

        if (formData.title.trim().length === 0) {
        temp.title = 'Title cannot be empty!';
        }
        if (formData.body.trim().length === 0) {
        temp.body = 'Post should have a description!';
        }
        if (!formData.type) {
        temp.type = 'Please select a post type!';
        }
        if (!formData.fileType) {
        temp.fileType = 'Please select a file!';
        }

        return temp;
    };

    function handleChange(event) 
    {
        const { name, value, type, files } = event.target;

        if (type === 'file') 
        {    
            setFormData({...formData, fileType: files[0]});
        } 
        else 
        {
            setFormData({...formData, [name]: value});
        }
    };

    function stripHtml(htmlText)
    {
        const temp = document.createElement('div');
        temp.innerHTML = htmlText;
        return temp.innerText || temp.textContent || '';
    };

    function handleRichChange(value) 
    {
        setRichText(value);
        const strippedText = stripHtml(value);
        setFormData({...formData, body: strippedText});
    };

    function resetForm() 
    {
        setFormData({
            title: '',
            body: '',
            type: 'image',
            forSubscribers: false,
            fileType: null,
        });
        setRichText('');
        setErrors({});
    }

    function handleSubmit(event)
    {
        event.preventDefault();

        const temp = runValidations();

        if (Object.keys(temp).length > 0) 
        {
            setErrors(temp);
        } 
        else 
        {
            setErrors({});
            const formDataObject = new FormData();
            for (let key in formData) 
            {
                formDataObject.append(key, formData[key]);
            };
            dispatch(createContent(formDataObject, resetForm));
        };
    };

    return (
        <div className="container mt-3">
            <h2 style={{ color: 'Brown' }}>Post Content Here!</h2>
                <form onSubmit={handleSubmit} className="container mt-3 md-3">
                    <div className="form-group">
                        <label htmlFor="title">Enter the Title for your Post</label>
                        <br />
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
                        <br />
                    </div>

                    <div className="form-group">
                        <label htmlFor="body">Enter the description of your Post:</label>
                        <ReactQuill
                            id="body"
                            value={richText}
                            name="body"
                            onChange={handleRichChange}
                            modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'],
                                ['link'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                            ],
                            }}
                        />
                        {errors.body && <span style={{ color: 'red' }}>{errors.body}</span>}
                        <br />
                    </div>
                    <br />

                    <div className="form-group">
                        <label>Select your Post type !</label>
                        <br />
                        <div className="form-check">
                            <input
                            id="imageType"
                            type="radio"
                            name="type"
                            value="image"
                            checked={formData.type === 'image'}
                            className="form-check-input"
                            onChange={handleChange}
                            />
                            <label htmlFor="imageType" className="form-check-label">
                            Image
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                            id="videoType"
                            type="radio"
                            name="type"
                            value="video"
                            checked={formData.type === 'video'}
                            className="form-check-input"
                            onChange={handleChange}
                            />
                            <label htmlFor="videoType" className="form-check-label">
                            Video
                            </label>
                        </div>
                        {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
                    </div>
                    <br />

                    <div className="form-group">
                        <label>Only for Subscribers ?</label>
                        <br />
                        <div className="form-check">
                            <input
                            id="yes"
                            type="radio"
                            name="forSubscribers"
                            value="true"
                            className="form-check-input"
                            onChange={handleChange}
                            />
                            <label htmlFor="yes" className="form-check-label">
                            Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                            id="no"
                            type="radio"
                            name="forSubscribers"
                            value="false"
                            defaultChecked
                            className="form-check-input"
                            onChange={handleChange}
                            />
                            <label htmlFor="no" className="form-check-label">
                            No
                            </label>
                        </div>
                    </div>
                    <br />

                    <div className="form-group">
                        <label htmlFor="file">Upload your File :</label>
                        <br />
                        <input
                            id="file"
                            name="fileType"
                            type="file"
                            accept="image/*,video/*"
                            className="form-control-file"
                            onChange={handleChange}
                        />
                        {errors.fileType && <span style={{ color: 'red' }}>{errors.fileType}</span>}
                        <br />
                    </div>

                    <input type="submit" value={'Post Your Content'} className="btn btn-dark mt-3" />
                </form>
        </div>
  );
};

export default PostContentForm;
