import type { NextPage } from 'next'
import Head from 'next/head'
import { getCategories, getPost, getPosts } from '../lib/wp-api'
import type { Categories } from '../models/Category'
import type { Posts, Post } from '../models/Post'

export async function getStaticProps() {
  const categoriesData = await getCategories()
  const postsData = await getPosts()
  const post = await getPost(1)
  const revalidate = 60

  return {
    props: {
      categories: categoriesData.data.categories,
      posts: postsData.data.posts,
      post: post.data.post,
    },
    revalidate: revalidate,
  }
}

const Home: NextPage<{ categories: Categories; posts: Posts; post: Post }> = ({
  categories,
  posts,
  post,
}) => {
  return (
    <>
      <Head>
        ˝<title>Next.js Boilerplate</title>
        <meta name="description" content="Next.js Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto py-12">
        <h2 className="text-3xl mb-5">Category</h2>
        <table className="table-auto border border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Slug</th>
            </tr>
          </thead>
          <tbody>
            {categories.nodes.map((category) => {
              return (
                <tr key={category.slug}>
                  <td className="border p-2">{category.categoryId}</td>
                  <td className="border p-2">{category.name}</td>
                  <td className="border p-2">{category.slug}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl mb-5">Posts</h2>
        <table className="table-auto border border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
            </tr>
          </thead>
          <tbody>
            {posts.nodes.map((post) => {
              return (
                <tr key={post.slug}>
                  <td className="border p-2">{post.postId}</td>
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2">{post.slug}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl mb-5">Post</h2>
        <table className="table-auto border border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{post.postId}</td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.slug}</td>
              <td className="border p-2">{post.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home
