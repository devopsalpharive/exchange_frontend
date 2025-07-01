import React, { useState, forwardRef, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import StarRatings from 'react-star-ratings';
import { FaQuoteLeft } from 'react-icons/fa6';
import comJson from '../asset/json/com.json';
import Lottie from 'lottie-react';
import { getPosts, sendPost, editPost, getAllPosts, getRoleName } from '../actions/launchpadAction'; // Make sure to add the editPost action
import { showToastMessage } from '../lib/toast';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import isEmpty from 'is-empty';




const Jurylist = forwardRef((props, ref) => {
    const { getUser } = useSelector((state) => state.user);
    const { id } = useParams();
    console.log("getuser", getUser?.roleId);
    // console.log("getu",getUser);
    // console.log("getu", getUser, props.launchpadId);
    // console.log("getuzzz", props.launchpadId);


    // const launchpadId = props.launchpadId
    // console.log("launchpadId", launchpadId);
    const initialForm = {
        rating: "",
        desc: "",
    };

    const [jurycom, setJurycom] = useState(initialForm);
    const [rating, setRating] = useState(0);
    const [jurySec, setJurySec] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(false)
    const [allpost, setAllPost] = useState([])
    const [roleName, setRoleName] = useState("")
    console.log("qqqqq", roleName);
    console.log("dfdgfdgg", allpost);


    const changeRating = (newRating) => {
        setJurycom({ ...jurycom, rating: newRating });
    };


    const handlGetAllCommands = async () => {
        try {
            if (id != "perview") {
                const response = await getAllPosts({ launchpadId: id }); // Call getAllComments API
                console.log("handlGetAllCommandsresponse", response?.data?.data);
                setAllPost(response?.data?.data)
            }
        } catch (e) {
            console.log("handlGetAllCommands_error", e);
        }


    }

    const handleRoleName = async () => {
        console.log("qaqa", getUser?.roleId);
        try {
            const payload = {
                roleId: getUser?.roleId,
            };
            const response = await getRoleName(payload, getUser.secretKey);
            console.log("response0000", response, response.data.data);
            setRoleName(response?.data?.data[0]?.roleName)
        } catch (e) {
            console.log("handleRoleName_error", e);
        }
    }


    const handlePostOrEditComment = async () => {
        try {
            const payload = {
                ratings: jurycom.rating,
                comments: jurycom.desc,
                launchpadId: id,

            };
            let response;
            if (isEditing) {
                response = await editPost(payload, getUser.secretKey); // Call edit API if in editing mode              
                console.log("resp", response);

            } else {
                response = await sendPost(payload, getUser.secretKey); // Call post API if in add mode               
            }

            if (response.status) {
                fetchRoleList()
                handlGetAllCommands();
                console.log("resp", response);
                showToastMessage(response.data.message, "success");
                setJurycom(initialForm);
                setIsEditing(false); // Reset edit mode

            } else {
                showToastMessage(Object.values(response.error), "error");
                console.log("response", response);
            }
            setStatus(true)
        } catch (e) {
            console.error("post_err", e);
        }
    };


    const options = {
        loop: false,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        dots: true,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 2 },
            1200: { items: 3 },
            1920: { items: 4 }
        }
    };

    const fetchRoleList = async () => {
        try {
            const payload = {
                launchpadId: id,
                userId: getUser?.userId
            };
            console.log("oooo9889", payload);

            if (id != "perview") {
                const data = await getPosts(payload, getUser.secretKey); // Fetching existing comments
                console.log("ppp", data);
                if (data.status) {
                    console.log("databag", data);
                    const initialForm = {
                        rating: Number(data?.data?.ratings),
                        desc: data?.data?.comments,
                    };
                    setJurycom(initialForm);
                    setIsEditing(true); // Set editing mode if there is existing data
                } else {
                    setIsEditing(false);
                }
            }

        } catch (e) {
            console.log("getHistory_err", e);
        }
    };



    useEffect(() => {
        if (!isEmpty(id)) {
            handlGetAllCommands();
        }
    }, [id, isEditing]);

    useEffect(() => {
        if (!isEmpty(getUser)) {
            handleRoleName();
        }
    }, [getUser]);

    useEffect(() => {
        if (!isEmpty(getUser) && !isEmpty(id)) {
            fetchRoleList();
        }
    }, [getUser, id])





    return (
        <>
            {allpost?.length > 0 ? (
                <div className='jurysec'>
                    <div className='container container80 '>
                        <div className='headsec mb-5 mt-3'>
                            <p className='head'>What Our Clients Say</p>
                        </div>
                        <OwlCarousel className='owl-theme' dots {...options} center={true}>
                            {allpost && allpost.map((e, index) => (
                                <div className='item' key={index}>
                                    <div className='jurycard d-flex align-items-center justify-content-between'>
                                        <div className='quotesec'>
                                            <FaQuoteLeft fill='#ff602e' fontSize={40} />
                                        </div>
                                        <p className='desc'>{e.comments}</p>
                                        <div>
                                            <div className='starsec mt-3'>
                                                <StarRatings
                                                    // rating={e.rating}
                                                    rating={Number(e?.ratings) || 0}
                                                    starRatedColor="#ff602e"
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="20px"
                                                    starSpacing="5px"
                                                />
                                            </div>
                                            <div className='mt-3'>
                                                <p className='name'>{e?.name}</p>
                                                <p className='cate'>{e?.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>

                    </div>
                </div>
            ) : ""}
            {
                roleName?.toLocaleLowerCase() == "jury" ?
                    <>
                        <div className='container container80 ' ref={ref}>
                            <div className='row jurycomsec justify-content-center'>
                                <div className='col-lg-8'>
                                    <div className='juryaddsec mt-5'>
                                        <div className='security_card'>
                                            <h5 className="grad_title mb-4">
                                                {isEditing ? 'Edit Comments' : 'Add Comments'}
                                            </h5>
                                            <div className='mb-4'>
                                                <p className='label mb-2'>Comments</p>
                                                <textarea className="form-control"
                                                    value={jurycom.desc || ''}
                                                    onChange={(e) => setJurycom({ ...jurycom, desc: e.target.value })}
                                                ></textarea>
                                            </div>
                                            <div className='mb-0'>
                                                <p className='label mb-2'>Ratings</p>
                                                <StarRatings
                                                    rating={jurycom.rating || 0}
                                                    starRatedColor="#ff602e"
                                                    changeRating={changeRating}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="20px"
                                                    starSpacing="5px"
                                                />
                                            </div>
                                            <div className='btnsec'>
                                                <button className="mt-5 grad_btn" onClick={handlePostOrEditComment}>
                                                    {isEditing ? 'Edit' : 'Post'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <></>
            }

        </>
    );
});

export default Jurylist;


