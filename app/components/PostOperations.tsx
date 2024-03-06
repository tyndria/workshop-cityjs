import { Form, useActionData } from "@remix-run/react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import PostGenerator from "./PostGenerator";

const PostOperations = () => {
  const data = useActionData();

  return (
    <div>
      <PostGenerator />
      <Input type="text" value={data?.post.title} />
      <Editor
        apiKey="megl6butiqhm3whiwmspl4igyb05ob2u5zke3i53jduwwma6"
        value={data?.post.content}
      />

      {data?.post && (
        <>
          <h1>{data?.post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
        </>
      )}
    </div>
  );
};

export default PostOperations;
