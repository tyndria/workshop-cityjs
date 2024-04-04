import { PrismaClient } from "@prisma/client";
import { PostType } from "~/types";

import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostListItem from "~/components/PostListItem";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      createdAt: {
        gte: new Date("2024-01-01"), // greater than or equal to
        lt: new Date("2025-01-01"), // less than
      },
      published: true,
    },

    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
    },
  });

  return json({ posts });
};

const LatestBlog = () => {
  const data = useLoaderData();
  const { posts } = data as { posts: PostType[] };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <div className="border border-border p-10 w-full ">
        <h1>Latest Posts</h1>
        {posts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
