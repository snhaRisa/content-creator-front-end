import React, {useState} from 'react'; 
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SearchHomePage = (props)=>
{
    const content = useSelector((state)=>
    {
        return state.content.content;
    });
    const history = useHistory();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    function handleChange(event)
    {
        const {name, value} = event.target; 

        if(name === 'search')
        {
            setSearch(value);
        }

        if(value.length>3)
        {
            const temp = content.filter((ele)=>
            {
                const creatorName = ele.creatorId.userId.username;
                return creatorName.toLowerCase().includes(value) || ele.category.trim().toLowerCase().includes(value);
            });
            setSearchResults(temp);
        }
        else
        {
            setSearchResults([]);
        }
    };

    function handleContentView(contentId)
    {
        history.push(`/content-view/${contentId}`);
    };

    return(
        <div className='container mt-3 md-3'>
            <input className="form-control mr-sm-2 row col-md-5" name='search' value={search} type="search" placeholder="Search your favorite creator or category..." onChange={handleChange}/>
            {
                searchResults.length > 0 &&
                <div className='container mt-3 md-3'>
                    <table className='table table-sm table-secondary table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Posted On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchResults.map((result, id)=>
                                {
                                    return <tr key={id}>
                                        <td>{result.creatorId.userId.username}</td>
                                        <td>{result.title}</td>
                                        <td>{result.category}</td>
                                        <td>{String(result.createdAt).substring(0,10)}</td>
                                        <td><button className='btn btn-dark btn-sm' onClick={()=>{handleContentView(result._id)}}>View</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>                      
            }
        </div>
    );
};

export default SearchHomePage; 
