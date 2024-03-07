import { useActionData, useLoaderData } from "@remix-run/react";
import EditPost from "./EditPost";

import Spinner from "./Spinner";
import PostGenerator from "./PostGenerator";
import { useState, useEffect } from "react";

const PostOperations = () => {
  const data = useActionData();
  const { posts } = useLoaderData();
  const lastPostPublished = posts[posts.length - 1];
  console.log("lastPost", lastPostPublished);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    data?.post && setIsGenerating(false);
  }, [data]);

  return (
    <div>
      {isGenerating && <Spinner />}
      {!isGenerating && data?.post ? (
        <EditPost post={lastPostPublished} />
      ) : (
        <>
          <PostGenerator setIsGenerating={setIsGenerating} />
        </>
      )}

      {data?.post && (
        <>
          <h1>{lastPostPublished.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: lastPostPublished.content }}
          />
        </>
      )}
    </div>
  );
};

export default PostOperations;
