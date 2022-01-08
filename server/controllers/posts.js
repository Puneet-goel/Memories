import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async(req,res) => {
	try{
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	}catch(error){
		res.status(404).json({message: error.message});
	}
}

export const createPost = async(req,res) => {

	try{
		let post = req.body.post;
		post['creator'] = req.body.username;
		post['likedBy'] = [req.body.username];

		const newPost = new PostMessage(post);

		await newPost.save();
		res.status(201).json(newPost);
	}catch(error){
		res.status(409).json({message: error.message});
	}
}

export const updatePost = async(req,res) => {
	
	try{
		const { id: _id } = req.params;
		const post = req.body.post;
		const username = req.body.username;

		if(!mongoose.Types.ObjectId.isValid(_id)){
			return res.status(404).send("No post with that id");
		}

		const oldPost = await PostMessage.findById(_id);
		if(oldPost.creator !== username){
			return res.status(401).send("Not authorized");
		}

		const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
		
		res.status(204).json(updatedPost);
	}catch(error){
		res.status(409).json({message: error.message});
	}
}

export const deletePost = async(req,res) => {
	
	try{
		const { id: _id } = req.params;
		const username = req.body.username;

		if(!mongoose.Types.ObjectId.isValid(_id)){
			return res.status(404).send("No post with that id");
		}

		const oldPost = await PostMessage.findById(_id);
		if(oldPost.creator !== username){
			return res.status(401).send("Not authorized");
		}

		await PostMessage.findByIdAndRemove(_id);
		
		res.status(204).json({message: "Post Deleted successfully!!"});
	}catch(error){
		res.status(409).json({message: error.message});
	}
}

export const likePost = async(req,res) => {

	try{
		const { id: _id } = req.params;
		const username = req.body.username;

		if(!mongoose.Types.ObjectId.isValid(_id)){
			return res.status(404).send("No post with that id");
		}

		let post = await PostMessage.findById(_id);
		const x = post.likedBy.find(peer => peer === username) || null;
		
		if(x){
			post.likedBy = post.likedBy.filter(peer => peer !== username);
		}else{
			post.likedBy.push(username);
		}

		const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likedBy: post.likedBy }, {new: true});
		res.status(200).json(updatedPost);
	}catch(error){
		res.status(409).json({message: error.message});
	}
}

export const getSpecificPost = async(req,res) => {

	try{
		const { id: _id } = req.params;
		if(!mongoose.Types.ObjectId.isValid(_id)){
			return res.status(404).send("No post with that id");
		}

		const post = await PostMessage.findById(_id);
		res.status(200).json(post);
	}catch(error){
		res.status(404).json({message: error.message});
	}
}