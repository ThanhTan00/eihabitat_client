import { ListFormat } from "typescript";
import { z } from "zod";

interface Image {
  id?: number;
  imageId: string;
  altText?: string; // Optional alt text for accessibility
}
export interface Comment {
  id: string
  content: string
  ownerProfileName: string
  ownerAvatar: string
  ownerUrl:string
  numberOfLike: number
  creationDate: string
 }

 export interface AddCommentRequest {
  content: string,
  postId: string
 }

export type Post = {
    id : string
    caption: string
    type: string
    createdAt: string 
    authorProfileName: string
    authorProfileAvatar: string
    authorUrl: string
    postContentSet: Image[]
    commentSet: Comment[]
    numberOfLikes: number
    numberOfComments: number
    latestUserLike: string
    latestUserLikeAvatar: string
    likeByUser: boolean
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
