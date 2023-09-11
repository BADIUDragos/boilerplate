import React from "react";
import { Alert } from "react-bootstrap";

interface IMessage {
  variant: "success" | "danger" | "warning" | "info";
  children: React.ReactNode;
}

const Message: React.FC<IMessage> = ({ variant, children, ...props }) => {
  return (
    <Alert variant={variant} {...props}>
      {children}
    </Alert>
  );
};

export default Message;
