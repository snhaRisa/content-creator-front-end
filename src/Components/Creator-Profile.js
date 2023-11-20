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
    console.log(user, 'user')
    const [creator, setCreator] = useState({})
    const [info, setInfo] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSubscribers, setSelectedSubscribers] = useState(null)

    const params = useParams()
    console.log(params, 'params')

    const result = jwtDecode(localStorage.getItem('token'));

    const data = content.filter((ele) => {
        return params.id === ele.creatorId._id;
    });
    console.log(data, 'creator data')
    console.log(info, 'info')
    useEffect(() => {
        console.log(params, 'inuseEffect')
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
        <section className="section about-section gray-bg" id="about">
            <div className="container" style={{ backgroundColor: '#f2f2f2' }}>
                {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-fluid avatar-xxl rounded-circle" alt="" /> */}

                <div className='body' >
                    <div className='media-body ml-5'>
                        {
                            user ?
                                <h3 className=" font-weight-bold ml-5"> {user?.tempData?.username}</h3>
                                :
                                <h4>Loading ....</h4>
                        }
                        <span className=" font-size-13 mb-0"><h4><p>{user?.tempData?.role}</p></h4></span>
                    </div>
                </div>
                {info.followers ? (
                    <h5 className="text-right">Followers: {info.followers.length}</h5>
                ) : (
                    <h5>Loading...</h5>
                )}

                <div className='d-flex justify-center-top ' >

                    {
                        <h5>Subscribers :
                            <span onClick={() => setSubscribers(true)}>{subscribers.length}
                            </span></h5>
                    }
                </div>

                <h5> Categories: {info.categories}</h5>
                {/* {
                    user.data && user.data.socialMedia ?
                        <h5> Links:</h5>
                        :
                        <h4>Loading...</h4>
                } */}

                <ul className='list-group mb-4'>
                    <h5>Social Media:</h5>
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
                <div className='card-group' >
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