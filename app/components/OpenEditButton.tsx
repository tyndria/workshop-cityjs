import { Button } from "./ui/button";

const OpenEditButton = ({ setOpenEdit }) => {
  return <Button onClick={() => setOpenEdit(true)}>Edit</Button>;
};

export default OpenEditButton;
