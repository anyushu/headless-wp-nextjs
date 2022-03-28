import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import Layout from '@/components/templates/Layout'
import { getCategories, getCategory, getPosts } from '@/libs/graphql/wp-query'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: NextPage<Props> = ({ posts, category }) => {
  return (
    <>
      <NextSeo title={category?.name || ''} />

      <Layout>
        <div className="container py-12 mx-auto">
          <h2 className="mb-5 text-3xl">Category</h2>
          <table className="border border-collapse table-auto">
            <tbody>
              <tr>
                <th className="p-2 border">ID</th>
                <td className="p-2 border">{category?.categoryId}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div className="container py-12 mx-auto">
          <h2 className="mb-5 text-3xl">Posts</h2>
          <table className="border border-collapse table-auto">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Slug</th>
              </tr>
            </thead>
            <tbody>
              {posts?.nodes?.map((post) => {
                return (
                  <tr key={post?.slug}>
                    <td className="p-2 border">{post?.postId}</td>
                    <td className="p-2 border">{post?.title}</td>
                    <td className="p-2 border">
                      <Link href="/posts/[slug]" as={`/posts/${post?.slug}`}>
                        {post?.slug}
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}

export default CategoryPage

export const getStaticPaths = async () => {
  const { data } = await getCategories()
  const categories = data.categories
  const paths = categories?.nodes?.map((category) => ({
    params: {
      slug: category?.slug,
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
  const { data } = await getCategory(context.params?.slug as string)
  const category = data.category
  const posts = await getPosts(category?.categoryId as number)

  return {
    props: {
      category: category,
      posts: posts.data.posts,
    },
  }
}
