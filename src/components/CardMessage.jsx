import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const CardMessage = ({ message }) => {
  return (
    <Card>
      <CardHeader
        title={`Sent at: ${new Date(message.createdAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}`}
      />
      <CardContent>
        <Typography variant="p" component="h4">
          From: {message.name}({message.email})
        </Typography>
        <Typography variant="p" component="p">
          {message.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardMessage;
