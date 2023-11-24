import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Image, Modal, Button } from 'react-bootstrap';


import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const CreatorProfile = () => {

    const content = useSelector((state) => state.content.content);
    const [subscribers, setSubscribers] = useState([])
    const [user, setUser] = useState([])
    const [creator, setCreator] = useState({})
    const [info, setInfo] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSubscribers, setSelectedSubscribers] = useState(null)

    const params = useParams()

    const result = jwtDecode(localStorage.getItem('token'));

    const data = content.filter((ele) => {
        return params.id === ele.creatorId._id;
    });

    useEffect(() => {
        axios.post('http://localhost:3997/api/fetchprofile', { _id: params.id }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data[0].userId, 'in effect')
                setInfo(res.data[0])
                if (res.data[0].hasOwnProperty('userId')) {
                    axios.post(`http://localhost:3997/api/fetchuser/${res.data[0].userId}?creator=${params.id}`)
                        .then((res) => {
                            console.log(res, 'user data in profile')
                            setUser(res.data)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [params])
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
    }

    return (
        <section className="section about-section" id="about">
            <div className="container">
                {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-fluid avatar-xxl rounded-circle" alt="" /> */}

                <h2 className='display-1 text-center mt-5 mb-5'>Profile Page of <span className='text-muted'><u>{user?.tempData?.username}</u></span></h2>

                <div className='card col-md-5 mx-auto'>
                    <div className='card-header'>
                        {
                            user ?
                                <h3 className="h3 text-center"> {user?.tempData?.username}</h3>
                                :
                                <h4>Loading ....</h4>
                        }
                    </div>
                </div>
                    
                <div className="row mt-2 mb-3">
                    <div className="card col-md-5 mx-auto">
                        {
                            info.followers ? 
                            (
                                <h3 className="h3 text-center">Followers: {info.followers.length}</h3>
                            ) 
                            : 
                            (
                                <h3 className="h3 text-center">Loading...</h3>
                            )}
                    </div>
                    <div className='card col-md-5 mx-auto' >
                        {
                            <h3 className="h3 text-center">Subscribers :
                                <span onClick={() => setSubscribers(true)}>{subscribers.length}
                                </span>
                            </h3>
                        }
                    </div>
                </div>

                <div className='card col-md-5 mx-auto'>
                    <h3 className="text-center h3"> Categories : {info.categories}</h3>
                </div>

                <ul className='list-group mt-2 mb-3'>
                    <h3 className="h3 text-muted">Social Media:</h3>
                    {
                        info && info.socialMedia ?
                            info.socialMedia.facebook ?
                                <li className='list-group-item'>
                                    <h5>Facebook: <a href={`https://www.facebook.com/${info.socialMedia.facebook}`} target="_blank">{info.socialMedia.facebook}</a></h5>
                                </li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Facebook: Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        info && info.socialMedia ?
                            info.socialMedia.twitter ?
                                <li className='list-group-item'>
                                    <h5>Twitter: <a href={`https://twitter.com/${info.socialMedia.twitter}`} target="_blank">{info.socialMedia.twitter}</a></h5>
                                </li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Twitter: Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        info && info.socialMedia ?
                            info.socialMedia.instagram ?
                                <li className='list-group-item'>
                                    <h5>Instagram: <a href={`https://instagram.com/${info.socialMedia.instagram}`} target="_blank">{info.socialMedia.instagram}</a></h5>
                                </li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Instagram: Not Given.</h5></li>
                            :
                            <></>
                    }
                    {
                        info && info.socialMedia ?
                            info.socialMedia.youtube ?
                                <li className='list-group-item'>
                                    <h5>Youtube: <a href={`https://www.youtube.com/${info.socialMedia.youtube}`} target="_blank">{info.socialMedia.youtube}</a></h5>
                                </li>
                                :
                                <li className='list-group-item list-group-item-light'><h5>Youtube: Not Given.</h5></li>
                            :
                            <></>
                    }
                </ul>

                <h3 className="display-3">Contents of {user?.tempData?.username}</h3>
                <div className='card-group'>
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
    )
}

export default CreatorProfile