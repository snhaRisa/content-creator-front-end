import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const PostContentForm = (props)=>
{
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postType, setPostType] = useState('');
    const [forSubscribers, setForSubscribers] = useState(false);
    const [fileType, setFileType] = useState(null);
    const [richText, setRichText] = useState('');
    const [errors, setErrors] = useState({});

    function runValidations()
    {
        const temp = {};
    }

    function handleChange(event)
    {
        const {name, value, files} = event.target;
        
        if(name === 'title')
        {
            setTitle(value);
        }
        else if(name === 'postType')
        {
            setPostType(value);
        }
        else if(name === 'forSubscriber')
        {
            setForSubscribers(value);
        }
        else if(name === 'fileType')
        {
            const temp = files[0];
            setFileType(temp);
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
        setBody(strippedText);
        console.log(body);
    };

    function handleSubmit(event)
    {
        event.preventDefault();
        console.log({
            title, 
            body,
            postType, 
            forSubscribers, 
            fileType
        });
    }

    return(
        <div className='container mt-3'>
            <h2 style={{color:'Brown'}}>Post Content Here!</h2>
            <form onSubmit={handleSubmit} className='container mt-3 md-3'>

                <div className='form-group'>
                    <label htmlFor='title'>Enter the Title for your Post</label><br/>
                    <input id='title' name='title' type='text' value={title} onChange={handleChange} className='form-control'/><br/>
                </div>
                
                <div className='form-group'>
                    <label htmlFor='body'>Enter the description of your Post:</label>
                    <ReactQuill
                        id='body'
                        value={richText}
                        name='body'
                        onChange={handleRichChange}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'], 
                                ['link'], 
                                [{'list':'ordered'},{'list':'bullet'}], 
                            ]
                        }}
                    />
                </div><br/>
                
                <div className="form-group">
                    <label>Select your Post type !</label><br />
                    <div className="form-check">
                        <input id="imageType" type="radio" name="postType" value='Image' className="form-check-input" onChange={handleChange}/>
                        <label htmlFor="imageType" className="form-check-label">Image</label>
                    </div>
                    <div className="form-check">
                        <input id="videoType" type="radio" name="postType" value='Video' className="form-check-input" onChange={handleChange}/>
                        <label htmlFor="videoType" className="form-check-label">Video</label>
                    </div>
                    <div className="form-check">
                        <input id="textType" type="radio" name="postType" value='Text' className="form-check-input" onChange={handleChange}/>
                        <label htmlFor="textType" className="form-check-label">Text</label>
                    </div>
                </div><br/>
                
                <div className='form-group'>
                <label>Only for Subscribers ?</label><br/>
                    <div className='form-check'>
                        <input id='yes' type='radio' name='forSubscriber' value={true} className='form-check-input' onChange={handleChange}/>
                        <label htmlFor='yes' className='form-check-label'>Yes</label>
                    </div>
                    <div className='form-check'>
                        <input id='no' type='radio' name='forSubscriber' value={false} className='form-check-input' onChange={handleChange}/>
                        <label htmlFor='no' className='form-check-label'>No</label> 
                    </div>
                </div><br/>

                <div className='form-group'>
                    <label htmlFor='file'>Upload your File : </label><br/>
                    <input id='file' name="fileType" type='file' accept="image/*,video/*" className='form-control-file' onChange={handleChange}/><br/><br/>
                </div>

                <input type='submit' value={'Post Your Content'} className='btn btn-dark'/>
            </form>
        </div>
    );
};

export default PostContentForm; 
