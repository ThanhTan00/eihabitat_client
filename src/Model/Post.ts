import { ListFormat } from "typescript";
import { z } from "zod";
import { Comment } from "./Comment";

export type Image = {
  id?: number;
  imageId: string;
  altText?: string; // Optional alt text for accessibility
}

export type Post = {
    id : string
    caption: string
    type: string
    createdAt: string 
    authorId: string
    authorProfileName: string
    authorProfileAvatar: string
    authorUrl: string
    story: boolean
    newStory: boolean
    postContentSet: Image[]
    commentSet: Comment[]
    numberOfLikes: number
    numberOfComments: number
    latestUserLike: string
    latestUserLikeAvatar: string
    likeByUser: boolean
    savedByUser: boolean
}

export type PostOnPersonalWall = {
  id: string
  createdAt: string
  representImage: string
  numberOfLikes: number
  numberOfComments: number
}

export type LikePostRequest = {
  userId : string | undefined
  postId : string | undefined
}

export type createPostRequest = {
  caption: string | null
  type: string | null
  images : File[]
}

export type SavePostRequest = {
  postId: string
  userId: string | undefined
  albumId: string | null
}