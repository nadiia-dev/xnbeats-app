import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../components/DashboardLayout";
import { useEffect } from "react";
import { selectMessages } from "../store/messages/selectors";
import { getMessages } from "../store/messages/actions";
import CardMessage from "../components/CardMessage";
import { Box } from "@mui/material";

const Messages = () => {
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  return (
    <DashboardLayout title="Messages">
      <Box display="flex" flexDirection="column" gap={2}>
        {messages &&
          messages.map((message) => (
            <CardMessage key={message.id} message={message} />
          ))}
      </Box>
    </DashboardLayout>
  );
};

export default Messages;
