export type Posts = {
  nodes: [
    {
      postId: number
      slug: string
      title: string
      featuredImage?: {
        node: {
          altText: string
          sourceUrl: string
          srcSet: string
          mediaDetails: {
            height: number
            width: number
          }
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
      sourceUrl: string
      srcSet: string
      mediaDetails: {
        height: number
        width: number
      }
    }
  }
  content?: string
}
