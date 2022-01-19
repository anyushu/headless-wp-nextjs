import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import PostContent from 'components/molecules/posts/PostContent'
import Layout from 'components/templates/Layout'
import { getPosts, getPost } from 'libs/graphql/wp-query'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <NextSeo title={post?.title || ''} />

      <Layout>
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
                <td className="border p-2">{post?.postId}</td>
                <td className="border p-2">{post?.title}</td>
                <td className="border p-2">{post?.slug}</td>
                <td className="border p-2">{post?.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {post?.featuredImage && (
          <>
            <hr />
            <div className="container mx-auto py-12">
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
        <div className="container mx-auto py-12">
          <PostContent htmlText={post?.content || ''} />
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
