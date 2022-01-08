import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSpecificPost } from "../../actions/posts";
import Skeleton from '@material-ui/lab/Skeleton';

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const ViewPost = ({isUserValid}) => {
    const params = useParams();
    const navigate = useNavigate()
    const id = params.id;
    const [curPost, setCurPost] = useState({
        creator: '',
        title: '',
		message: '',
		tags: '',
		selectedFile: '',
        likedBy: [],
        createdAt: new Date(),
    }); 

    const handleLog = () => {
        navigate('/login');
    }

    useEffect(() => {
        (async () => {
            let data = await getSpecificPost(id);
            setCurPost(data);
        })()
    },[id]);

	return (
        <div className="container-fluid bg-white pb-5" style={{minWidth: '100vw', minHeight: '100vh', backgroundColor: '#f1f1f1'}}>
            <nav aria-label="breadcrumb" className="p-3 d-flex justify-content-between">
                <Link to="/" className="breadcrumb-item text-primary">Home</Link>
                {isUserValid?null:<button onClick={handleLog} className="btn btn-primary"> Login</button>}
            </nav>
            <div className="d-flex justify-content-center">
                <h2 className="fs-1 fw-bolder fst-italic text-primary">{curPost.title}</h2>
            </div>
            <div className="row">
                <div className="col-12 col-md-7 px-2">
                    <div className="card border-0">
                        <div className="card-body">
                            <p className="card-text text-end fw-light">{new Date(curPost.createdAt).toLocaleString('en-US', options)}</p>
                            <p className="card-text text-center fw-bolder"> Number of Likes: {curPost.likedBy.length}</p>
                            <p className="card-text">{curPost.message}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-5 px-2">
                    <div className="card border-0 ">
                        <h4 className="text-center">Author</h4>
                        <h4 className="text-end pe-3 fst-italic text-primary"> - {curPost.creator} </h4> 
                    </div>
                    <br/>
                    <br/>
                    <div className="card border-0">
                        {
                            (curPost.selectedFile === '')?
                            <Skeleton variant="rect" animation="wave" height={300} width="100%" />
                            :<img alt="Post" src={curPost.selectedFile} className="card-img-top" />
                        }
                    </div>
                </div>
            </div>
        </div>
	);
}

export default ViewPost;