import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { useSwipeable } from 'react-swipeable';
// import style from './style.css'

import { showContent } from '../Actions/allContentsAction';
import { Row, Col, Image, Modal, Button } from 'react-bootstrap';


const Profile = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users);
    const content = useSelector((state) => state.content.content);
    console.log(content, 'content')
    const [selectedImage, setSelectedImage] = useState(null);
    const [subscribers, setSubscribers] = useState([])
    const [selectedSubscribers, setSelectedSubscribers] = useState(null)
    console.log(subscribers, 'sub')

    const result = jwtDecode(localStorage.getItem('token'));
    console.log(result, 'profile result')

    useEffect(() => {
        axios.post('http://localhost:3997/api/allSubscribers', { _id: result._id })
            .then((res) => {
                console.log(res.data, 'res.data')
                setSubscribers(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])



    useEffect(() => {
        dispatch(showContent());
    }, [dispatch]);

    const data = content.filter((ele) => {
        console.log(ele, 'ele filter')
        return result._id === ele.creatorId.userId._id;
    });
    console.log(data, 'data')


    const handleImageClick = (image) => {
        setSelectedImage(image);
    }

    const nextImage = () => {
        const currentIndex = data.indexOf(selectedImage);
        const nextIndex = (currentIndex + 1) % data.length;
        setSelectedImage(data[nextIndex]);
    };

    const previousImage = () => {
        const currentIndex = data.indexOf(selectedImage);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
        setSelectedImage(data[previousIndex]);
    };


    return (
        <section className="section about-section" id="about">
            <div className="container">
                {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-fluid avatar-xxl rounded-circle" alt="" /> */}

                <h2 className='display-1 text-center mt-5 mb-5'>Profile Page of <span className='text-muted'><u>{user?.data?.userId?.username}</u></span></h2>

                <div className='card col-md-5 mb-3 mx-auto' >
                    <div className='media-body ml-5'>
                        {
                            user.data && user.data.userId ?
                                <h1 className="h1 text-center">{user.data.userId.username}</h1>
                                :
                                <h4 className='text-center'>Loading ....</h4>
                        }
                        <span className="mb-3"><h2 className='h2 mb-3 text-center text-muted'><p>{user.data.bio}</p></h2></span>
                    </div>
                </div>
                <div className='row'>
                    <div className='card mt-2 mb-3 col-md-5 mr-md-3 mx-auto'>
                        {/* {<h5>Subscribers :
                            <Link onClick={() => setSelectedSubscribers(true)}>{subscribers.length}
                            </Link></h5>} */}
                        {
                            <h5 className='h3 text-center'>Total Subscribers :
                                <span onClick={() => setSelectedSubscribers(true)}>{subscribers.length}
                                </span>
                            </h5>
                        }
                    </div>
                    <div className='card mt-2 mb-3 col-md-5 mx-auto'>
                        {
                            user.data && user.data.followers ?
                                <h5 className="h3 text-center">Total Followers: {user.data.followers.length}</h5>
                                :
                                <h5>Loading...</h5>
                        }
                    </div>
                </div>

                <h5 className='h3 mt-2 mb-3'>Categories : {user.data.categories}</h5>
                <ul className='mx-auto list-group mb-3 mt-2'>
                    <h5 className='h3 mt-2 mb-3 card-header'>Social Media</h5>
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.facebook ?

                                <li className='list-group-item'><h5>Facebook : <a href={user.data.socialMedia.facebook} target="_blank">{user.data.socialMedia.facebook}</a> </h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Facebook : Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.twitter ?
                                <li className='list-group-item'><h5>Twitter : <a href={user.data.socialMedia.twitter} target="_blank">{user.data.socialMedia.twitter}</a> </h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Twitter : Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.instagram ?
                                <li className='list-group-item'><h5>Instagram :  <a href={user.data.socialMedia.instagram} target="_blank">{user.data.socialMedia.instagram}</a></h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Instagram : Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.youtube ?
                                <li className='list-group-item'><h5>Youtube :<a href={user.data.socialMedia.youtube} target="_blank">{user.data.socialMedia.youtube}</a> </h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Youtube : Not Given.</h5></li>
                            :
                            <></>
                    }
                </ul>
    
                <div className="alert alert-info" role="alert">
                        <Link to='/create-plans' href="#" className="alert-link">
                            Manage Subscriptions
                        </Link>
                </div>
                
                <div className='card-group' >
                    <h3 className='display-3 text-center'>{user?.data?.userId?.username} Contents</h3>
                    <Row>
                        {data.map((ele, i) => {
                            console.log(ele, 'ele')
                            return (
                                <Col key={i} xs='auto'>
                                    <div onClick={() => handleImageClick(ele)}>
                                        {console.log(ele, 'ele')}
                                        {ele.type === 'image' ? (
                                            <Image src={ele.fileType} className="card-img-top" thumbnail style={{ width: "275px", height: "275px" }} />
                                        ) : (
                                            <video controls width={200}>
                                                <source src={ele.fileType} />
                                            </video>
                                        )}
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
            <footer className="footer" style={{ marginBottom: '40px' }}>
                <div className="text-center">
                    <p style={{ margin: '20px 0' }}>Copyright © 2023 Your Website. All Rights Reserved.</p>
                </div>
            </footer>

            <Modal show={selectedImage !== null} onHide={() => setSelectedImage(null)} size="lg">

                <Modal.Title>{ }</Modal.Title>
                <Modal.Body >
                    <div>

                        {selectedImage && selectedImage.type === 'image' ? (
                            <Image src={selectedImage.fileType} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        ) : (
                            <video controls width="100%">
                                <source src={selectedImage && selectedImage.fileType} />
                            </video>

                        )}
                        <p>likes: {selectedImage && content.find((ele) => {
                            if (ele.fileType === selectedImage.fileType) {
                                return ele
                            }
                        }).likes.length}</p>
                        <div>comments: {selectedImage && content.find((ele) => {
                            if (ele.fileType === selectedImage.fileType) {
                                return ele
                            }
                        }).comments.map((ele, i) => {
                            return (
                                <p key={i}>{ele.body}</p>
                            )
                        })}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={previousImage}>
                        <FontAwesomeIcon icon={faChevronLeft} />  Previous

                    </Button>
                    <Button variant="primary" onClick={nextImage} >
                        Next <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </Modal.Footer>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedImage(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={selectedSubscribers !== null} onHide={() => setSelectedSubscribers(null)}>
                <Modal.Body>
                    {
                        selectedSubscribers && subscribers.map((ele, i) => {
                            return (
                                <p key={i}>{ele?.userId.username}</p>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
            {/* </Modal> */}
        </section>
    );
};

export default Profile;