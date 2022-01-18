import React from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import "./viewpost.css";

const SkeletonSpecificPost = () => {

	return (
        <div> 
            <div className="d-flex flex-column align-items-center">
                <Skeleton width="50%" />
                <Skeleton width="30%" />
            </div>

            <div className="d-flex flex-column align-items-end mb-3">
                <Skeleton width="30%"/>
            </div>

            <div className="row">
                <div className="col-12 col-md-5 px-1">
                    <Skeleton variant="rect" height={300} />
                </div>
                <div className="col-12 col-md-7 px-1">
                    <Skeleton variant="rect" height={300} />
                </div>
            </div>

            <div className="d-flex flex-column align-items-center p-5">
                <Skeleton variant="rect" height={50} width={70}/>
            </div>

            <Skeleton variant="rect" className="mb-5" height={400} width="100%" />
        </div>
	);
}

export default SkeletonSpecificPost;