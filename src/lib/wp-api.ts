import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.WORDPRESS_API_URL || '',
  cache: new InMemoryCache(),
})

/**
 * get site meta
 */
export function getSiteMeta() {
  return client.query({
    query: gql`
      query getSiteMeta {
        generalSettings {
          title
          description
        }
      }
    `,
  })
}

/**
 * get categories
 */
export function getCategories(slug?: string) {
  return client.query({
    variables: {
      slug: slug,
    },
    query: gql`
      query getCategories($slug: [String] = null) {
        categories(where: { slug: $slug }) {
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
export function getCategory(slug: string) {
  return client.query({
    variables: {
      id: slug,
    },
    query: gql`
      query getCategory($id: ID!) {
        category(id: $id, idType: SLUG) {
          categoryId
          databaseId
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
                sourceUrl
                srcSet
                mediaDetails {
                  height
                  width
                }
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
export function getPost(slug: string) {
  return client.query({
    variables: {
      id: slug,
    },
    query: gql`
      query getPost($id: ID = "") {
        post(id: $id, idType: SLUG) {
          postId
          slug
          date
          title
          content
          featuredImage {
            node {
              altText
              sourceUrl
              srcSet
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
    `,
  })
}
