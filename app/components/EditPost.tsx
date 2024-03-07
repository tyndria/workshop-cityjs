import { Form } from "@remix-run/react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useRef, useState, useEffect } from "react";

const EditPost = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const editorRef = useRef(null);
  const headlineRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("editor log", editorRef.current.getContent());
    }
    if (headlineRef.current) {
      console.log("headline log", headlineRef.current.value);
    }
  };

  useEffect(() => {
    setTitle(post.title);
  }, [post.title]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <h1>Edit your post</h1>
      <Form method="post" action="/dashboard" className="space-y-5">
        <Input
          type="text"
          value={title}
          name="headline"
          onChange={handleTitleChange}
          ref={headlineRef}
        />
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="megl6butiqhm3whiwmspl4igyb05ob2u5zke3i53jduwwma6"
          initialValue={post.content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;color=white, background:# }",
          }}
        />
        <input type="hidden" name="id" value={post.id} />
        <input
          type="hidden"
          name="content"
          value={editorRef?.current?.getContent()}
        />

        <input type="hidden" name="task" value="edit" />
        <Button type="submit" onClick={log}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditPost;
