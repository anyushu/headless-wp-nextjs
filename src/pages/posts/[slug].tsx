import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { getPosts, getPost } from '../../lib/wp-api'
import { Post, Posts } from '../../models/Post'

export async function getStaticPaths() {
  const { data } = await getPosts()
  const posts = data.posts as Posts
  const paths = posts.nodes.map((post) => ({
    params: {
      slug: post.slug,
    },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context: GetStaticPropsContext<{ slug: string }>) {
  const { data } = await getPost(context.params?.slug as string)

  return {
    props: {
      post: data.post as Post,
    },
    revalidate: 60,
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

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

export default PostPage
