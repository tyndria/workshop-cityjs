import { Form, useActionData } from "@remix-run/react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const CreatePost = () => {
  const data = useActionData();

  return (
    <div>
      <h1>Create a new post</h1>
      <div className="space-y-5">
        <Form className="space-y-3" method="post" action="/dashboard">
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
          <div className="flex space-x-3">
            <Input
              type="text"
              name="targetReader"
              placeholder="Target Reader"
            />
            <Input type="text" name="language" placeholder="language" />
          </div>
          <input type="hidden" name="task" value="generate" />
          <Button type="submit" value="submit">
            Generate
          </Button>
        </Form>
        <Input type="text" value={data?.post.title} />
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
