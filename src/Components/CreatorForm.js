import React, {useState} from "react";

const CreatorForm = (props)=>
{
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

    function handleChange(event)
    {
        const {name, value} = event.target; 

        if(name.startsWith('socialMedia.'))
        {
            const socialMediaValue = name.split('.')[1]; 
            setCreator({...creator, socialMedia: {...creator.socialMedia, [socialMediaValue] : value}});
        }
        else if(name === 'bio')
        {
            setCreator({...creator, bio: value});
        }
        else if(name === 'categories')
        {
            setCreator({...creator, categories: value}); 
        }
    };

    function handleSubmit(event)
    {
        event.preventDefault(); 

        console.log(creator); 
    }

    return(
        <div>
            <h4>Become A Creator !</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='image'>Upload your Image : </label>
                    <input type="file" accept="image/*" id="image" name="image" value={creator.image} onChange={handleChange}/><br/>
                </div>
                <div>
                    <label htmlFor="bio">Your Description : </label>
                    <textarea id='bio' name="bio" value={creator.bio} onChange={handleChange}></textarea><br/>
                </div>
                <div>
                    <label htmlFor="categories">Enter your content category : </label>
                    <textarea id='categories' name="categories" value={creator.categories} onChange={handleChange}></textarea><br/>
                </div>
                <div>
                    <label htmlFor="facebook">Enter your facebook link : </label>
                    <input type="text" id='facebook' name="socialMedia.facebook" value={creator.socialMedia.facebook} onChange={handleChange}/><br/>
                </div>
                <div>
                    <label htmlFor="instagram">Enter your instagram link : </label>
                    <input type="text" id='instagram' name="socialMedia.instagram" value={creator.socialMedia.instagram} onChange={handleChange}/><br/>
                </div>
                <div>
                    <label htmlFor="youtube">Enter your youtube link : </label>
                    <input type="text" id='youtube' name="socialMedia.youtube" value={creator.socialMedia.youtube} onChange={handleChange}/><br/>
                </div>
                <div>
                    <label htmlFor="twitter">Enter your twitter link : </label>
                    <input type="text" id='twitter' name="socialMedia.twitter" value={creator.socialMedia.twitter} onChange={handleChange}/><br/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default CreatorForm; 
