import { gql } from '@apollo/client'
import client from './apollo-client'

/**
 * get wp categories
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
 * get wp category
 */
export function getCategory() {
  return client.query({
    query: gql`
      query getCategory($id: ID = "") {
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
 * get wp posts
 */
export function getPosts() {
  return client.query({
    query: gql`
      query getPosts {
        posts {
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
 * get wp post
 */
export function getPost() {
  return client.query({
    query: gql`
      query getPost($id: ID = "") {
        post(id: $id) {
          postId
          slug
          date
          modified
          featuredImage {
            node {
              altText
              uri
            }
          }
          content
        }
      }
    `,
  })
}
