import { PrismaClient } from "@prisma/client";
import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany();

  return json({ posts });
};

const Blog = () => {
  const { posts } = useLoaderData();

  return (
    <div className="flex justify-between gap-5">
      <div className="border border-border p-10 w-full">
        <h1>Posts</h1>
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
      <div className="border border-border p-10 w-full">
        <Button className="uppercase">Create Post</Button>
      </div>
    </div>
  );
};

export default Blog;
