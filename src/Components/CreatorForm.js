import React, {useState} from "react";
import {useHistory, Link} from 'react-router-dom'; 
import {useDispatch} from 'react-redux'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS styles

import { startRegisterCreator } from "../Actions/usersAction";

const CreatorForm = (props)=>
{
    const history = useHistory(); 
    const dispatch = useDispatch(); 

    const [richText, setRichText] = useState('');
    const [plainText, setPlainText] = useState('');
    const [errors, setErrors] = useState({});
    const [creator, setCreator] = useState({
        image: '', //store the URL
        bio: '', 
        categories: '', 
        socialMedia: {
            facebook: '', 
            twitter: '', 
            instagram: '', 
            youtube: ''
        }
    }); 

    function stripHtml(htmlText)
    {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlText; 
        return tempDiv.innerText || tempDiv.textContent || ''; 
    }

    function handleChange(event)
    {
        const {name, value} = event.target; 

        if(name.startsWith('socialMedia.'))
        {
            const socialMediaValue = name.split('.')[1]; 
            setCreator({...creator, socialMedia: {...creator.socialMedia, [socialMediaValue] : value}});
        }
        else if(name === 'categories')
        {
            setCreator({...creator, categories: value}); 
        }
    };

    function handleRichChange(value)
    {
        setRichText(value);
        const strippedText = stripHtml(value);
        setPlainText(strippedText);
        setCreator({...creator, bio: strippedText});
    }

    function runValidations()
    {
        const temp = {};

        if(creator.bio.trim().length === 0)
        {
            temp.bio = 'Your Bio cannot be empty';
        }
        if(creator.categories.trim().length === 0)
        {
            temp.categories = 'Please add one category!';
        }

        return temp; 
    }

    function resetForm()
    {
        setCreator({
            image: '', //store the URL
            bio: '', 
            categories: '', 
            socialMedia: {
                facebook: '', 
                twitter: '', 
                instagram: '', 
                youtube: ''
            }
        });
    }

    function handleSubmit(event)
    {
        event.preventDefault(); 

        const temp = runValidations(); 

        if(Object.keys(temp).length > 0)
        {
            setErrors(temp); 
        }
        else
        {
            setErrors({});
            dispatch(startRegisterCreator(creator, resetForm, history));
        };
    };

    return(
        <div className='container mt-3'>
            <h4>Become A Creator !</h4><br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='image'>Upload your Image:</label><br/>
                    <input type="file" className="form-control-file" accept="image/*" id="image" name="image" value={creator.image} onChange={handleChange}/>
                </div><br/>
                <div className="form-group">
                    <label htmlFor="bio">Your Bio:</label>
                    <ReactQuill
                        id="bio"
                        value={richText}
                        name='bio'
                        onChange={handleRichChange}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'],
                                ['link', 'image'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['clean']
                            ],
                        }}
                    />
                    {errors.bio && <span style={{color:'red'}}>{errors.bio}</span>}
                </div><br/>
                <div className="form-group">
                    <label htmlFor="categories">Enter your content category:</label>
                    <textarea className="form-control" id='categories' name="categories" value={creator.categories} onChange={handleChange}></textarea>
                    {errors.categories && <span style={{color:'red'}}>{errors.categories}</span>}
                </div><br/>
                <div className="form-group">
                    <label htmlFor="facebook">Enter your Facebook link:</label>
                    <input type="text" className="form-control" id='facebook' name="socialMedia.facebook" value={creator.socialMedia.facebook} onChange={handleChange}/>
                </div><br/>
                <div className="form-group">
                    <label htmlFor="instagram">Enter your Instagram link:</label>
                    <input type="text" className="form-control" id='instagram' name="socialMedia.instagram" value={creator.socialMedia.instagram} onChange={handleChange}/>
                </div><br/>
                <div className="form-group">
                    <label htmlFor="youtube">Enter your YouTube link:</label>
                    <input type="text" className="form-control" id='youtube' name="socialMedia.youtube" value={creator.socialMedia.youtube} onChange={handleChange}/>
                </div><br/>
                <div className="form-group">
                    <label htmlFor="twitter">Enter your Twitter link:</label>
                    <input type="text" className="form-control" id='twitter' name="socialMedia.twitter" value={creator.socialMedia.twitter} onChange={handleChange}/>
                </div><br/>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form><br/>
            <div className="alert alert-info" role="alert">
                <Link to='/account' href="#" className="alert-link">
                    Back to Your Account.
                </Link>
            </div>
        </div>
    );
};

export default CreatorForm; 
