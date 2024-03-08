import { Form } from "@remix-run/react";
import { Button } from "./ui/button";

const PublishButton = ({ post }) => {
  const published = post.published;
  return (
    <Form method="post">
      <Button type="submit">{published ? "unpublish" : "publish"}</Button>
      <input type="hidden" name="task" value="publish" />
      <input type="hidden" name="id" value={post.id} />
    </Form>
  );
};

export default PublishButton;
