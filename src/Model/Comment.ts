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
  postId: string,
  replyTo: string
 }

 export interface getCommentRequest {
   postId : string | null
   rootUserID: string | undefined
   replyTo: string
 }

 export interface likeCommentRequest {
    commentId: string | undefined
    userId: string | undefined
 }