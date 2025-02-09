export interface Comment {
  id: string
  content: string
  ownerProfileName: string
  ownerAvatar: string
  ownerUrl:string
  numberOfLike: number
  likedByMe: boolean
  creationDate: string
 }

 export interface AddCommentRequest {
  content: string,
  postId: string
 }

 export interface likeCommentRequest {
    commentId: string | undefined
    userId: string | undefined
 }