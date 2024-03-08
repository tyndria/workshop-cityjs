import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
import {
  type LoaderFunction,
  json,
  type ActionFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostOperations from "~/components/PostOperations";
import PostListItem from "~/components/PostListItem";
import {
  handleDelete,
  handleGenerate,
  handleEdit,
} from "~/lib/utils/actionFunctions";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany();

  return json({ posts });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const task = formData.get("task");
  console.log("tasks", task);

  switch (task) {
    case "generate":
      return handleGenerate(formData);
    case "edit":
      return handleEdit(formData);
    case "delete":
      return handleDelete(formData);
    default:
      throw new Error(`Invalid task: ${task}`);
  }
};

const Blog = () => {
  const { posts } = useLoaderData();

  return (
    <div className="flex justify-between gap-5">
      <div className="border border-border p-10 w-full">
        <h1>Posts</h1>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
      <div className="border border-border p-10 w-full">
        <PostOperations />
      </div>
    </div>
  );
};

export default Blog;
