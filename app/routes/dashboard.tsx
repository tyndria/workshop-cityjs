import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
import {
  type LoaderFunction,
  json,
  type ActionFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PostOperations from "~/components/PostOperations";

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
      return handleEdit(formData);
    default:
      throw new Error(`Invalid task: ${task}`);
  }
};

async function handleEdit(formData: FormData) {
  const headline = formData.get("headline");
  const content = formData.get("content");
  const postId = formData.get("id");
  console.log("content", content);

  let post;
  const slug = slugify(headline, { lower: true });
  try {
    post = await prisma.post.update({
      where: { id: postId },
      data: {
        title: String(headline),
        content: String(content),
        slug: String(slug),
      },
    });
    console.log(`Published post: ${post.title}`);
  } catch (error) {
    console.error("Error publishing post:", error);
  }
  return json({
    post,
  });
}

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
  let post;
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

    post = await response.json();
    //if post is not null, then save it to database
    if (post) {
      const slug = slugify(post.headline, { lower: true });
      await prisma.post.create({
        data: {
          title: String(post.headline),
          content: String(post.content),
          slug: String(slug),
        },
      });
    }
    console.log(post);
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  return json({
    post,
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
        <PostOperations />
      </div>
    </div>
  );
};

export default Blog;
