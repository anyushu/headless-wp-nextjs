export type Posts = {
  nodes: [
    {
      postId: number
      slug: string
      title: string
      featuredImage?: {
        node: {
          altText: string
          uri: string
        }
      }
    },
  ]
}

export type Post = {
  postId: number
  title: string
  slug: string
  date: string
  modified?: string
  featuredImage?: {
    node: {
      altText: string
      uri: string
    }
  }
  content?: string
}
