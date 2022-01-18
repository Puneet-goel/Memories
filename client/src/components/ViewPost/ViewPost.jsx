import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserPost } from "../../actions/posts";
import { authenticate } from "../../actions/auth";
import Skeleton from '@material-ui/lab/Skeleton';
import creatorImage from "./creator.jpg";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SkeletonSpecificPost from './SkeletonSpecificPost';
import "./viewpost.css";

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const ViewPost = ({isUserValid, setUserValid}) => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const dispatch = useDispatch();
    const [curPost, setCurPost] = useState({
        creator: '',
        title: '',
		message: '',
		tags: '#tags',
		selectedFile: '',
        likedBy: [],
        createdAt: '',
    }); 

    var scrollTop = function() {
        window.scrollTo(0, 0);
    };
    scrollTop();

    const [creatorPost, setCreatorPost] = useState([]);
    const handleLog = () => {
        navigate('/login');
    }

    useEffect(() => {

        (async () => {

            if(!isUserValid){
                const x = await dispatch(authenticate());
                setUserValid(x);
            }

            const {specificPost, userPosts} = await getUserPost(id);
            setCreatorPost(userPosts || []);
            setCurPost(specificPost || []);

        })()
    },[id, dispatch, setUserValid, isUserValid]);

	return (
        <div className="container-fluid bg-white" style={{backgroundColor: '#f1f1f1'}}>
            <nav aria-label="breadcrumb" className="p-3 d-flex justify-content-between">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"> <Link to="/" className="text-primary">Home</Link> </li>
                    <li className="breadcrumb-item"> View Post </li>
                </ol>
                {isUserValid?null:<button onClick={handleLog} className="btn btn-primary"> Login</button>}
            </nav>

            {
                (curPost.creator === '')
                ?<SkeletonSpecificPost />
                :<div>
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="fs-1 fw-bolder fst-italic text-primary">{curPost.title}</h2>
                        <p className="fw-light">{new Date(curPost.createdAt).toLocaleString('en-US', options)}</p>
                    </div>
                    <h4 className="text-end pe-3 fst-italic text-primary mb-3"> - {curPost.creator} </h4> 

                    <div className="row">
                        <div className="col-12 col-md-5 px-2">
                            <div className="card border-0">
                                {
                                    (curPost.selectedFile==='')
                                    ?<Skeleton variant="rect" height={300} />
                                    :<img alt="Post" src={curPost.selectedFile} className="card-img-top" />
                                }
                            </div>
                        </div>
                        <div className="col-12 col-md-7 px-2">
                            <div className="card border-0">
                                <div className="card-body">
                                    <p className="card-text fs-5">{curPost.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column align-items-center p-5">
                        <button type="button" className="btn btn-primary btn-lg position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                            Likes
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {curPost.likedBy.length}
                                <span className="visually-hidden">Likes on Post</span>
                            </span>
                        </button>
                    </div>

                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title fw-bolder fst-italic text-primary" id="offcanvasWithBothOptionsLabel">Users who liked your Post</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="list-group list-group-flush">
                                {
                                    curPost.likedBy.map((user) => 
                                        <li className="list-group-item list-group-item-action" key={user}> {user} </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>

                    <div id="carouselExampleCaptions" className="carousel slide carousel-fade mb-5" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img id="myCarousel" src={creatorImage} className="d-block w-100" alt="post view"/>
                                <div className="carousel-caption d-block">
                                    <h5 className="text-dark fs-4 fw-bolder">More Posts from the same Creator...</h5>
                                </div>
                            </div>
                            {
                                creatorPost.map(post => 
                                    <div className="carousel-item" key={post._id}>
                                        {
                                            (post.selectedFile==='')?
                                            <Skeleton variant="rect" height={400} width="100%" />
                                            :<img id="myCarousel" src={post.selectedFile} className="d-block " alt="post view"/>
                                        }
                                        <div className="carousel-caption d-block">
                                            <h5 className="fs-4 fw-bolder" style={{color: '#000000'}}> {post.title} </h5>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <ArrowBackIcon style={{ fontSize: 40 }} color="primary"/>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <ArrowForwardIcon style={{ fontSize: 40 }} color="primary"/>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            }

        </div>
	);
}

export default ViewPost;