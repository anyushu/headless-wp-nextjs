import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import Layout from 'components/templates/Layout'
import { getCategories, getCategory, getPosts } from 'libs/graphql/wp-query'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: NextPage<Props> = ({ posts, category }) => {
  return (
    <>
      <NextSeo title={category?.name || ''} />

      <Layout>
        <div className="container mx-auto py-12">
          <h2 className="text-3xl mb-5">Category</h2>
          <table className="table-auto border border-collapse">
            <tbody>
              <tr>
                <th className="border p-2">ID</th>
                <td className="border p-2">{category?.categoryId}</td>
              </tr>
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
              {posts?.nodes?.map((post) => {
                return (
                  <tr key={post?.slug}>
                    <td className="border p-2">{post?.postId}</td>
                    <td className="border p-2">{post?.title}</td>
                    <td className="border p-2">
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
