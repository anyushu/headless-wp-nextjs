import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import PostContent from '@/components/molecules/posts/PostContent'
import Layout from '@/components/templates/Layout'
import { getPosts, getPost } from '@/libs/graphql/wp-query'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <NextSeo title={post?.title || ''} />

      <Layout>
        <div className="container py-12 mx-auto">
          <h2 className="mb-5 text-3xl">Post</h2>
          <table className="border border-collapse table-auto">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">{post?.postId}</td>
                <td className="p-2 border">{post?.title}</td>
                <td className="p-2 border">{post?.slug}</td>
                <td className="p-2 border">{post?.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {post?.featuredImage && (
          <>
            <hr />
            <div className="container py-12 mx-auto">
              <Image
                src={post.featuredImage.node?.sourceUrl || ''}
                alt={post.featuredImage.node?.altText || ''}
                width={post.featuredImage.node?.mediaDetails?.width || 0}
                height={post.featuredImage.node?.mediaDetails?.height || 0}
              />
            </div>
          </>
        )}
        <hr />
        <div className="container py-12 mx-auto">
          <article className="w-full max-w-none prose">
            <PostContent htmlText={post?.content || ''} />
          </article>
        </div>
      </Layout>
    </>
  )
}

export default PostPage

export const getStaticPaths = async () => {
  const { data } = await getPosts()
  const posts = data.posts
  const paths = posts?.nodes?.map((post) => ({
    params: {
      slug: post?.slug,
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
  const { data } = await getPost(context.params?.slug as string)

  return {
    props: {
      post: data.post,
    },
  }
}
