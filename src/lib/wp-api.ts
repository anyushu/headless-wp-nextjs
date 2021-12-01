import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.WORDPRESS_API_URL || '',
  cache: new InMemoryCache(),
})

/**
 * get categories
 */
export function getCategories() {
  return client.query({
    query: gql`
      query getCategories {
        categories {
          nodes {
            categoryId
            name
            slug
          }
        }
      }
    `,
  })
}

/**
 * get category by categoryId
 */
export function getCategory(categoryId: number) {
  return client.query({
    variables: {
      categoryId: categoryId,
    },
    query: gql`
      query getCategory($id: ID!) {
        category(id: $id) {
          categoryId
          name
          slug
        }
      }
    `,
  })
}

/**
 * get posts by category
 */
export function getPosts(categoryId?: number) {
  return client.query({
    variables: {
      categoryId: categoryId,
    },
    query: gql`
      query getPosts($categoryId: Int = null) {
        posts(where: { categoryId: $categoryId }) {
          nodes {
            postId
            slug
            title
            featuredImage {
              node {
                altText
                uri
              }
            }
          }
        }
      }
    `,
  })
}

/**
 * get post by DATABASE_ID
 */
export function getPost(postId: number) {
  return client.query({
    variables: {
      idType: 'Int',
      id: postId,
    },
    query: gql`
      query getPost($id: ID!) {
        post(id: $id, idType: DATABASE_ID) {
          postId
          slug
          title
          content
          date
          modified
          featuredImage {
            node {
              altText
              uri
            }
          }
        }
      }
    `,
  })
}
