import { ListFormat } from "typescript";
import { z } from "zod";

interface Image {
  id?: number;
  imageId: string;
  altText?: string; // Optional alt text for accessibility
}
export interface Comment {
  id: string,
  content: string,
  ownerProfileName: string,
  ownerAvatar: string,
  creationDate: string
 }

export type Post = {
    id : string
    caption: string
    type: string
    createdAt: string 
    authorProfileName: string
    authorProfileAvatar: string
    postContentSet: Image[]
    commentSet: Comment[]
    numberOfLikes: number,
    latestUserLike: string,
    latestUserLikeAvatar: string
}

