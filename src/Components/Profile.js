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
        return result._id === ele.creatorId.userId;
    });

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

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
        <section className="section about-section gray-bg" id="about">
            <div className="container" style={{ backgroundColor: '#f2f2f2' }}>
                {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-fluid avatar-xxl rounded-circle" alt="" /> */}

                <div className='body' >
                    <div className='media-body ml-5'>
                        {
                            user.data && user.data.userId ?
                                <h3 className=" font-weight-bold mt-3" style={{ backgroundColor: 'white' }}> {user.data.userId.username}</h3>
                                :
                                <h4>Loading ....</h4>
                        }
                        <span className=" font-size-13 mb-0"><h5><p>{user.data.bio}</p></h5></span>
                    </div>
                </div>

                <div className='d-flex justify-center-top ' >
                    {/* {<h5>Subscribers :
                        <Link onClick={() => setSelectedSubscribers(true)}>{subscribers.length}
                        </Link></h5>} */}
                        {
                            <h5>Subscribers :
                            <span onClick={() => setSelectedSubscribers(true)}>{subscribers.length}
                            </span></h5>
                        }
                </div>

                {
                    user.data && user.data.followers ?
                        <h5 className="text-right">Followers: {user.data.followers.length}</h5>
                        :
                        <h5>Loading...</h5>
                }

                {/* {
                        user.data && user.data.userId ?
                            <h4>E-Mail : {user.data.userId.email}</h4>
                            :
                            <h4>Loading ....</h4>
                    } */}

                <h5> Categories: {user.data.categories}</h5>
                {
                    user.data && user.data.socialMedia ?
                        <h5> Links:</h5>
                        :
                        <h4>Loading...</h4>
                }
                <ul className='list-group mb-4'>
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.facebook ?
                                <li className='list-group-item'><h5>Facebook : <a href='https://www.facebook.com' target="_blank">{user.data.socialMedia.facebook}</a> </h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Facebook : Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.twitter ?
                                <li className='list-group-item'><h5>Twitter : <a href='https://twitter.com' target="_blank">{user.data.socialMedia.twitter}</a> </h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Twitter : Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.instagram ?
                                <li className='list-group-item'><h5>Instagram :  <a href='https://instagram.com' target="_blank">{user.data.socialMedia.instagram}</a></h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Instagram : Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        user.data && user.data.socialMedia ?
                            user.data.socialMedia.youtube ?
                                <li className='list-group-item'><h5>Youtube :<a href='https://www.youtube.com' target="_blank">{user.data.socialMedia.youtube}</a> </h5></li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Youtube : Not Given.</h5></li>
                            :
                            <></>
                    }
                </ul>
                {/* <div className="alert alert-info" role="alert">
                        <Link to='/create-plans' href="#" className="alert-link">
                            Manage Subscriptions
                        </Link>
                    </div> */}
                <div className='card-group' >
                    <Row>
                        {data.map((ele, i) => {
                            console.log(ele,'ele')
                            return (
                                <Col key={i} xs='auto'>
                                    <div onClick={() => handleImageClick(ele)}>
                                        {console.log(ele,'ele')}
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