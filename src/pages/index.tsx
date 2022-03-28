import type { InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import Layout from '@/components/templates/Layout'
import { getSiteMeta, getCategories, getPosts } from '@/libs/graphql/wp-query'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ siteMeta, categories, posts }) => {
  return (
    <>
      <NextSeo title={siteMeta?.title || ''} description={siteMeta?.description || ''} />

      <Layout>
        <div className="container py-12 mx-auto">
          <h2 className="mb-5 text-3xl">SiteInfo</h2>
          <table className="border border-collapse table-auto">
            <tbody>
              <tr>
                <th className="p-2 text-left border">Title</th>
                <td className="p-2 border">{siteMeta?.title}</td>
              </tr>
              <tr>
                <th className="p-2 text-left border">Description</th>
                <td className="p-2 border">{siteMeta?.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div className="container py-12 mx-auto">
          <h2 className="mb-5 text-3xl">Category</h2>
          <table className="border border-collapse table-auto">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Slug</th>
              </tr>
            </thead>
            <tbody>
              {categories?.nodes?.map((category) => {
                return (
                  <tr key={category?.slug}>
                    <td className="p-2 border">{category?.categoryId}</td>
                    <td className="p-2 border">{category?.name}</td>
                    <td className="p-2 border">
                      <Link href="/category/[slug]" as={`/category/${category?.slug}`}>
                        {category?.slug}
                      </Link>
                    </td>
                  </tr>
                )
              })}
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

export default Home

export const getStaticProps = async () => {
  const siteMeta = await getSiteMeta()
  const categoriesData = await getCategories()
  const postsData = await getPosts()

  return {
    props: {
      siteMeta: siteMeta.data.generalSettings,
      categories: categoriesData.data.categories,
      posts: postsData.data.posts,
    },
  }
}
