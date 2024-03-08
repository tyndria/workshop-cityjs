import { json } from "@remix-run/node";
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function handleDelete(formData: FormData) {
  const postId = formData.get("id");
  console.log("post deleted", postId);

  let post;
  try {
    post = await prisma.post.delete({
      where: { id: postId },
    });
    console.log(`Deleted post: ${post.title}`);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
  return json({
    post,
  });
}

export async function handleGenerate(formData: FormData) {
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
    console.log("post created", post);
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  return json({
    post,
  });
}

export async function handleEdit(formData: FormData) {
  const headline = formData.get("headline");
  const content = formData.get("content");
  const postId = formData.get("id");
  console.log("content edited", content);

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
