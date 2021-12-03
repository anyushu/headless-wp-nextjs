import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { getSiteMeta, getCategories, getPost, getPosts } from '../lib/wp-api'
import type { Categories } from '../models/Category'
import type { Posts, Post } from '../models/Post'
import type { GeneralSettings } from '../models/SiteInfo'

export async function getStaticProps() {
  const siteMeta = await getSiteMeta()
  const categoriesData = await getCategories()
  const postsData = await getPosts(1)
  const post = await getPost('hello-world')

  return {
    props: {
      siteMeta: siteMeta.data.generalSettings as GeneralSettings,
      categories: categoriesData.data.categories as Categories,
      posts: postsData.data.posts as Posts,
      post: post.data.post as Post,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ siteMeta, categories, posts, post }) => {
  return (
    <>
      <Head>
        <title>{siteMeta.title}</title>
        <meta name="description" content={siteMeta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto py-12">
        <h2 className="text-3xl mb-5">SiteInfo</h2>
        <table className="table-auto border border-collapse">
          <tbody>
            <tr>
              <th className="border p-2 text-left">Title</th>
              <td className="border p-2">{siteMeta.title}</td>
            </tr>
            <tr>
              <th className="border p-2 text-left">Description</th>
              <td className="border p-2">{siteMeta.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
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
