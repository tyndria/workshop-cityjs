import { useActionData, useLoaderData } from "@remix-run/react";
import EditPost from "./EditPost";

import Spinner from "./Spinner";
import PostGenerator from "./PostGenerator";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import OpenEditButton from "./OpenEditButton";

const PostOperations = ({ posToEdit, setPosToEdit }) => {
  const data = useActionData();
  const { posts } = useLoaderData();
  const lastPostPublished = posts[posts.length - 1];

  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleGeneratePost = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setPosToEdit(lastPostPublished);
    // setIsGenerating(false);
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  // useEffect(() => {
  //   data?.post && setIsGenerating(false);
  // }, [data]);

  return (
    <div>
      {openEdit ? (
        <EditPost post={posToEdit} />
      ) : posToEdit && openEdit(false) ? (
        <>
          <h1>{posToEdit.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: posToEdit.content }} />
          <OpenEditButton setOpenEdit={setOpenEdit} />
        </>
      ) : (
        <>
          <PostGenerator onGeneratePost={handleGeneratePost} />
          {isGenerating && <Spinner />}
        </>
      )}
    </div>
  );
};

export default PostOperations;
