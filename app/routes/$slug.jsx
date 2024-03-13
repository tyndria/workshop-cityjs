import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Date from "../components/Date";

const prisma = new PrismaClient();

export const loader = async ({ params }) => {
  const { slug } = params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  return json({ post });
};

const Post = () => {
  const { post } = useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <Date date={post.createdAt} />
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
};

export default Post;
