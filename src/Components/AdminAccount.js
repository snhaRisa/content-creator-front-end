import React, {useState, useEffect} from 'react'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";

const AdminAccount = (props)=>
{
    const {user} = props; 
    const token = localStorage.getItem('token');

    const [users, setUsers] = useState([]);
    const [creators, setCreators] = useState([]);
    const [posts, setPosts] = useState([]);

    const [checkUsers, setCheckUsers] = useState(false);
    const [checkCreators, setCheckCreators] = useState(false);
    const [checkPosts, setCheckPosts] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [selectValue, setSelectValue] = useState('users');

    const [userSearch, setUserSearch] = useState([]);
    const [creatorSearch, setCreatorSearch] = useState([]);
    const [postSearch, setPostSearch] = useState([]);

    useEffect(()=>
    {
        (async function ()
        {
            try
            {
                const tempUsers = await axios.get(`http://localhost:3997/api/users`);
                const listUser = tempUsers.data; 
                if(listUser)
                {
                    if(listUser.length === 0)
                    {
                        Swal.fire('There are no users in the website!');
                    }
                    setUsers(listUser);
                }

                const tempCreators = await axios.get('http://localhost:3997/api/creators', {headers:{'authorization':token}}); 
                if(tempCreators.data.length === 0)
                {
                    Swal.fire('There are no creators!');
                }
                if(tempCreators.data)
                {
                    setCreators(tempCreators.data);
                }

                const tempPosts = await axios.get(`http://localhost:3997/content-all`, {headers:{'authorization': token}});
                const postList = tempPosts.data; 
                if(postList.length>0)
                {
                    setPosts(postList);
                }
            }
            catch(err)
            {
                console.log(err.message);
            }
        })()
    },[])

    function handleChange(event)
    {
        const {value} = event.target; 
        setSelectValue(value);
    }

    function handleSearch(event)
    {
        const {value} = event.target; 
        setSearchValue(value);

        if(value.length > 3)
        {
            if(selectValue === 'users')
            {
                const temp = users.filter((user)=>
                {
                    return user.username.toLowerCase().includes(value);
                });

                setUserSearch(temp);
            }
            else if(selectValue === 'creators')
            {
                const temp = creators.filter((creator)=>
                {
                    return creator.userId.username.toLowerCase().includes(value);
                });

                setCreatorSearch(temp);
            }
            else if(selectValue === 'posts')
            {
                const temp = posts.filter((post)=>
                {
                    return post.title.toLowerCase().includes(value);
                });
                setPostSearch(temp);
            }
        }
        else
        {
            setUserSearch([]);
            setCreatorSearch([]);
            setPostSearch([]);
        }
    };

    async function handleDeleteUser(id)
    {
        try
        {
            const temp = await axios.delete(`http://localhost:3997/api/user/${id}`, {headers:{'authorization':token}});
            const remainingDocs = temp.data; 
            if(remainingDocs)
            {
                Swal.fire('Successfully Deleted the User !');
                setUsers(remainingDocs);
                setUserSearch([]);
                setSearchValue('');
            }
        }
        catch(err)
        {
            console.log(err.message);
        }
    }

    async function handleDeleteCreator(id)
    {
        try
        {
            const result = await Swal.fire({
                title: 'Are you sure to delete?',
                text: 'The creator will lose access to his account and his basic account will also be deleted !',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });
          
            if (result.isConfirmed) 
            {
                await Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                const temp = await axios.delete(`http://localhost:3997/api/creator/${id}`, {headers:{'authorization': token}});
                const obj = temp.data; 
                if(obj.hasOwnProperty('creators') && obj.hasOwnProperty('users'))
                {
                    setCreators(obj.creators);
                    setUsers(obj.users);
                    setCreatorSearch([]);
                    setSearchValue('');
                }
            }
        }
        catch(err)
        {
            console.log(err.message);
        };
    };

    async function handleDeletePost(id)
    {
        try
        {
            const temp = await axios.delete(`http://localhost:3997/content-delete-admin/${id}`, {headers:{'authorization':token}});
            if(temp.data.length>0)
            {
                Swal.fire('Successfully Deleted the Post !');
                setPosts(temp.data);
                setPostSearch([]);
                setSearchValue('');
            }
            else
            {
                setPosts([]);
                Swal.fire('Error while Deleting Posts! Please Refresh the Page.');
            }
        }
        catch(err)
        {
            Swal.fire(err.message);
        }
    };

    return(
        user.role === 'admin' ?
        <div className='container text-center mt-5'>
            <h1><span className='badge rounded-pill bg-dark' style={{color:'brown'}}>Welcome Admin Mr.{user.username}</span></h1>
            <div className='card mt-4'>
                <p className="lead">
                    Welcome, {user.username}! Here's what you can do:
                </p>
                <p>
                    As an admin, you have the power to read, update, and delete various entities such as Users, Creators, and Posts.
                </p>
            </div>
            <div className="row mt-3">
                <div className="btn-group col-md-6">
                        <button className="btn btn-dark" onClick={()=>{setCheckUsers(!checkUsers)}}>Show Users</button>
                        <button className="btn btn-dark" onClick={()=>{setCheckCreators(!checkCreators)}}>Show Creators</button>
                        <button className="btn btn-dark" onClick={()=>{setCheckPosts(!checkPosts)}}>Show All Posts</button>
                </div>
                <div className='col-md-4'>
                    <input name='search' value={searchValue} className="form-control mr-sm-2" placeholder="Search for users or post..." onChange={handleSearch}/>
                </div>
                <div className='col-md-2'>
                    <select value={selectValue} className='form-select' onChange={handleChange}>
                        <option value='users'>Users</option>
                        <option value='creators'>Creators</option>
                        <option value='posts'>Posts</option>
                    </select>
                </div>
            </div>
            
            <div>
                {
                    userSearch.length > 0 &&
                    <table className="table table-bordered table-hover table-dark mt-3">
                        <caption><span className='badge rounded-pill bg-danger'>Search Results</span></caption>
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Serial Number</th>
                                <th scope="col">UserName</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Creator ?</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userSearch.map((user)=>
                                {
                                    return(
                                        <tr key={user._id} className='table-secondary'>
                                            <th scope='row'>{user._id}</th>
                                            <th scope='row'>{user.username}</th>
                                            <th scope='row'>{user.email}</th>
                                            {
                                                user.role === 'user' || user.role === 'admin' ?
                                                <th scope='row'>No</th>
                                                :
                                                <th scope='row'>Yes</th>                
                                            }
                                            <th scope='row'><button className='btn btn-danger' 
                                            disabled={user.role === 'admin'}
                                            onClick={()=>{handleDeleteUser(user._id)}}>Delete User</button></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
            <div>
                {
                    creatorSearch.length > 0 &&
                    <table className='table table-bordered table-hover table-dark mt-3'>
                        <caption><span className='badge rounded-pill bg-danger'>Search Results</span></caption>
                        <thead>
                            <tr className='table-dark'>
                                <th>Serial Number</th>
                                <th>Name</th>
                                <th>E-Mail</th>  
                                <th>Total Followers</th>    
                                <th>Action</th>                     
                            </tr>
                        </thead>
                        <tbody>
                            {
                                creatorSearch.map((creator)=>
                                {
                                    return(
                                        <tr key={creator._id} className='table-secondary'>
                                            <th>{creator._id}</th>
                                            <th>{creator.userId.username}</th>
                                            <th>{creator.userId.email}</th>
                                            <th>{creator.followers.length}</th>
                                            <th><button className='btn btn-danger' onClick={()=>{handleDeleteCreator(creator._id)}}>Delete Creator</button></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
            <div>
                {
                    postSearch.length > 0 &&
                    <table className='table table-bordered table-dark table-hover table-rounded mt-3'>
                        <caption><span className='badge rounded-pill bg-danger'>Search Results</span></caption>
                        <thead>
                            <tr>
                                <th>Id Number</th>
                                <th>Creator-Name</th>
                                <th>Title</th>
                                <th>Type of Post</th>
                                <th>Category</th>
                                <th>Visible</th>
                                <th>No. of Likes</th>
                                <th>No. of Comments</th>
                                <th>Date Posted</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                postSearch.map((post)=>
                                {
                                    return(
                                        <tr key={post._id} className='table-secondary'>
                                            <th>{post._id}</th>
                                            <th>{post?.creatorId?.userId?.username}</th>
                                            <th>{post.title}</th>
                                            <th>{post.type}</th>
                                            <th>{post.category}</th>
                                            <th>{String(post.isVisible)}</th>
                                            <th>{post.likes.length}</th>
                                            <th>{post.comments.length}</th>
                                            <th>{String(post.createdAt).substring(0,10)}</th>
                                            <th><button className='btn btn-danger' onClick={()=>{handleDeletePost(post._id)}}>Delete Post</button></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>

            <div>
                {
                    users.length > 0 && checkUsers &&
                    <table className="table table-bordered table-hover table-dark mt-3">
                        <caption><span className='badge rounded-pill bg-danger'>List of Users</span></caption>
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Serial Number</th>
                                <th scope="col">UserName</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Creator ?</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user)=>
                                {
                                    return(
                                        <tr key={user._id} className='table-secondary'>
                                            <th scope='row'>{user._id}</th>
                                            <th scope='row'>{user.username}</th>
                                            <th scope='row'>{user.email}</th>
                                            {
                                                user.role === 'user' || user.role === 'admin' ?
                                                <th scope='row'>No</th>
                                                :
                                                <th scope='row'>Yes</th>                
                                            }
                                            <th scope='row'><button className='btn btn-danger' 
                                            disabled={user.role === 'admin'}
                                            onClick={()=>{handleDeleteUser(user._id)}}>Delete User</button></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
            <div>
                {
                    creators.length > 0 && checkCreators &&
                    <table className='table table-bordered table-hover table-dark mt-3'>
                        <caption><span className='badge rounded-pill bg-danger'>List of Creators</span></caption>
                        <thead>
                            <tr className='table-dark'>
                                <th>Serial Number</th>
                                <th>Name</th>
                                <th>E-Mail</th>  
                                <th>Total Followers</th>    
                                <th>Action</th>                     
                            </tr>
                        </thead>
                        <tbody>
                            {
                                creators.map((creator)=>
                                {
                                    return(
                                        <tr key={creator._id} className='table-secondary'>
                                            <th>{creator._id}</th>
                                            <th>{creator?.userId?.username}</th>
                                            <th>{creator?.userId?.email}</th>
                                            <th>{creator.followers.length}</th>
                                            <th><button className='btn btn-danger' onClick={()=>{handleDeleteCreator(creator._id)}}>Delete Creator</button></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
            <div>
                {
                    posts.length > 0 && checkPosts &&
                    <table className='table table-bordered table-dark table-hover table-rounded mt-3'>
                        <caption><span className='badge rounded-pill bg-danger'>List of Posts</span></caption>
                        <thead>
                            <tr>
                                <th>Id Number</th>
                                <th>Creator-Name</th>
                                <th>Title</th>
                                <th>Type of Post</th>
                                <th>Category</th>
                                <th>Visible</th>
                                <th>No. of Likes</th>
                                <th>No. of Comments</th>
                                <th>Date Posted</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post)=>
                                {
                                    return(
                                        <tr key={post._id} className='table-secondary'>
                                            <th>{post._id}</th>
                                            <th>{post?.creatorId?.userId?.username}</th>
                                            <th>{post.title}</th>
                                            <th>{post.type}</th>
                                            <th>{post.category}</th>
                                            <th>{String(post.isVisible)}</th>
                                            <th>{post.likes.length}</th>
                                            <th>{post.comments.length}</th>
                                            <th>{String(post.createdAt).substring(0,10)}</th>
                                            <th><button className='btn btn-danger' onClick={()=>{handleDeletePost(post._id)}}>Delete Post</button></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
        :
        null
    );
};

export default AdminAccount;
