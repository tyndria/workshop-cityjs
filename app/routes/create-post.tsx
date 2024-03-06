import { type ActionFunction, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { subject, style, tone, purpose, keywords, length, targetReader } =
    Object.fromEntries(formData.entries());

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

  return json({
    post: data,
  });
};

const CreatePost = () => {
  const data = useActionData();
  console.log("data in actiondata", data);

  return (
    <div>
      <h1>Create your post</h1>
      <div className="flex justify-between ">
        <Form className="space-y-3" method="post">
          <div className="flex space-x-3">
            <Input type="text" name="subject" placeholder="Subject" />
            <Input type="text" placeholder="Style" />
          </div>
          <div className="flex space-x-3">
            <Input type="text" name="tone" placeholder="Tone" />
            <Input type="text" placeholder="Purpose" />
          </div>
          <div className="flex space-x-3">
            <Input type="text" name="keywords" placeholder="Keywords" />
            <Input type="text" name="length" placeholder="Length" />
          </div>
          <Input type="text" name="targetReader" placeholder="Target Reader" />
          <Button type="submit" value="submit">
            Submit
          </Button>
        </Form>
        <Editor
          apiKey="megl6butiqhm3whiwmspl4igyb05ob2u5zke3i53jduwwma6"
          value={data?.post.content}
        />
      </div>
      {data?.post && (
        <>
          <h1>{data?.post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
        </>
      )}
    </div>
  );
};

export default CreatePost;
