import { Button } from "./ui/button";
import React from "react";

interface OpenEditButtonProps {
  setOpenEdit: (value: boolean) => void;
}

const OpenEditButton: React.FC<OpenEditButtonProps> = ({ setOpenEdit }) => {
  return <Button onClick={() => setOpenEdit(true)}>Edit</Button>;
};

export default OpenEditButton;
