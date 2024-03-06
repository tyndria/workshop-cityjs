import { Form } from "@remix-run/react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const EditPost = ({ post }) => {
  return (
    <Form method="post" action="dashboard">
      <Input type="text" value={post.title} />
      <Editor
        apiKey="megl6butiqhm3whiwmspl4igyb05ob2u5zke3i53jduwwma6"
        value={post.content}
      />
      <input type="hidden" name="task" value="edit" />
      <Button>Submit</Button>
    </Form>
  );
};

export default EditPost;
