import { Avatar } from "@chakra-ui/react";

const UserAvatar = ({ src, name, bg, ...props }) => {
  return <Avatar bg={bg} name={name} src={src} {...props} />;
};

export default UserAvatar;
