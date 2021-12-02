import type { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { getCategories, getPosts } from '../../lib/wp-api'
import { Category, Categories } from '../../models/Category'
import { Posts } from '../../models/Post'

export async function getStaticPaths() {
  const { data } = await getCategories()
  const categories: Categories = data.categories
  const paths = categories.nodes.map((category: Category) => ({
    params: {
      slug: category.slug,
    },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context: GetStaticPropsContext<{ slug: string }>) {
  const { data } = await getCategories(context.params?.slug)
  const category = data.categories.nodes[0] as Category
  const posts = await getPosts(category.categoryId)

  return {
    props: {
      posts: posts.data.posts as Posts,
      categoryId: category.categoryId,
    },
    revalidate: 60,
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: NextPage<Props> = ({ posts, categoryId }) => {
  return (
    <>
      <div className="container mx-auto py-12">
        <h2 className="text-3xl mb-5">Category</h2>
        <table className="table-auto border border-collapse">
          <tbody>
            <tr>
              <th className="border p-2">ID</th>
              <td className="border p-2">{categoryId}</td>
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
            {posts.nodes.map((post) => {
              return (
                <tr key={post.slug}>
                  <td className="border p-2">{post.postId}</td>
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2">
                    <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                      {post.slug}
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CategoryPage
