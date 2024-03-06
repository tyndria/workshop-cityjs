import { useActionData } from "@remix-run/react";
import EditPost from "./EditPost";

import Spinner from "./Spinner";
import PostGenerator from "./PostGenerator";
import { useState, useEffect } from "react";

const PostOperations = () => {
  const data = useActionData();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    data?.post && setIsGenerating(false);
  }, [data]);

  return (
    <div>
      {isGenerating && <Spinner />}
      {!isGenerating && data?.post ? (
        <EditPost post={data?.post} />
      ) : (
        <PostGenerator setIsGenerating={setIsGenerating} />
      )}

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
