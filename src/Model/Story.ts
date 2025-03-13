
export type Story = {
    id: string
    caption: string
    imageUrl: string
    createdAt: string
    expiresAt: string
    seenId: string[]
    authorName: string
    authorAvatar: string
}

export type FollowingNewStory = {
    authorId: string
    authorName: string
    authorAvatar: string
    newStory: boolean
}