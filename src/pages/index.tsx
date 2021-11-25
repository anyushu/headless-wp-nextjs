import type { NextPage } from 'next'
import Head from 'next/head'
import { getCategories, getPosts } from '../lib/wp-api'
import type { Categories } from '../models/Category'
import type { Posts } from '../models/Post'

export async function getStaticProps() {
  const categoriesData = await getCategories()
  const postsData = await getPosts()
  const revalidate = 60

  return {
    props: {
      categories: categoriesData.data.categories,
      posts: postsData.data.posts,
    },
    revalidate: revalidate,
  }
}

const Home: NextPage<{ categories: Categories; posts: Posts }> = ({ categories, posts }) => {
  return (
    <>
      <Head>
        <title>Next.js Boilerplate</title>
        <meta name="description" content="Next.js Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto py-12">
        <h2 className="text-3xl mb-5">Category</h2>
        <ul className="list-disc pl-6">
          {categories.nodes.map((category) => {
            return (
              <li key={category.categoryId} className="mb-3">
                name: {category.name}, slug: {category.slug}
              </li>
            )
          })}
        </ul>
      </div>
      <hr />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl mb-5">Posts</h2>
        <ul className="list-disc pl-6">
          {posts.nodes.map((post) => {
            return (
              <li key={post.postId} className="mb-3">
                name: {post.title}, slug: {post.slug}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Home
