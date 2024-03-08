import { ActionFunction } from "@remix-run/node";
import { useActionData, useLocation } from "@remix-run/react";
import EditPost from "~/components/EditPost";
import { handleEdit } from "~/lib/utils/actionFunctions";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  return handleEdit(formData);
};

const EditPostRoute = () => {
  const location = useLocation();
  let { post } = location.state || {};
  console.log("action", useActionData());
  const actionData = useActionData();
  const editedPost = actionData?.post;
  post = post || editedPost;

  return (
    <>
      {post ? (
        <div className="flex justify-between gap-5">
          <div className="border border-border p-10 w-full">
            <EditPost post={post} />
          </div>
          <div className="border border-border p-10 w-full">
            <h1>Preview</h1>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      ) : (
        <h3>No post to edit</h3>
      )}
    </>
  );
};

export default EditPostRoute;
