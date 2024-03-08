import { PrismaClient } from "@prisma/client";
import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany();
  const publishedPosts = posts.filter((post) => post.published);
  return json({ posts: publishedPosts });
};

const Blog = () => {
  const { posts } = useLoaderData() || {};

  return (
    <div className="max-w-sm mx-auto">
      <h1>Blog</h1>
      {posts.map((post) => (
        <h2 key={post.id}>
          <Link
            to={`/${post.slug}`}
            className="bg-gradient-to-r font-bold from-purple-500 to-pink-500 text-transparent bg-clip-text transition duration-500 hover:from-purple-400 hover:to-pink-400"
          >
            {post.title}
          </Link>
        </h2>
      ))}
    </div>
  );
};

export default Blog;
