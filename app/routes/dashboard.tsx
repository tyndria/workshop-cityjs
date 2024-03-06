import { PrismaClient } from "@prisma/client";
import {
  type LoaderFunction,
  json,
  type ActionFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import GeneratePost from "~/components/GeneratePost";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany();

  return json({ posts });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const task = formData.get("task");

  switch (task) {
    case "generate":
      return handleGenerate(formData);
    case "edit":
      // Handle your edit task here
      break;
    default:
      throw new Error(`Invalid task: ${task}`);
  }
};

async function handleGenerate(formData: FormData) {
  const {
    subject,
    style,
    tone,
    purpose,
    keywords,
    length,
    targetReader,
    language,
  } = Object.fromEntries(formData.entries());

  const payload = {
    prompt: {
      messages: [
        {
          role: "system",
          content: "Generate content based on the following parameters.",
        },
      ],
      variables: [
        { name: "style", value: style },
        { name: "tone", value: tone },
        { name: "purpose", value: purpose },
        { name: "keywords", value: keywords },
        { name: "length", value: length },
        { name: "subject", value: subject },
        { name: "targetReader", value: targetReader },
        { name: "language", value: language },
      ],
    },
  };
  let data;
  try {
    const response = await fetch("https://api.langbase.com/beta/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer cee91a08-db3a-467e-aad4-67bca954b078",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  // save post to database
  // await prisma.post.create({
  //   data: {
  //     title: data.title,
  //     content: data.content,
  //   },
  // });

  return json({
    post: data,
  });
}

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
        <GeneratePost />
      </div>
    </div>
  );
};

export default Blog;
