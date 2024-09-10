import { ListFormat } from "typescript";
import { z } from "zod";

interface Image {
  id?: number;
  imageId: string;
  altText?: string; // Optional alt text for accessibility
}

export type Post = {
    id : string
    caption: string
    type: string
    createAt: Date
    authorProfileName: string
    authorProfileAvatar: string
    postContentSet: Image[]
}

