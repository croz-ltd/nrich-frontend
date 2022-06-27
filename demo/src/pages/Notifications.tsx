import React from "react";

import { Box, Button } from "@mui/material";

interface Variation {
  text: string;
  uri: string;
}

const variations: Variation[] = [
  {
    text: "With manual action resolving",
    uri: "/notification",
  },
  {
    text: "With manual action resolving and additional data",
    uri: "/notification-with-additional-data",
  },
  {
    text: "With action resolved from request",
    uri: "/notification-with-action-resolved-from-request",
  },
  {
    text: "With action resolved from request and additional data",
    uri: "/notification-with-additional-data-and-action-resolved-from-request",
  },
];

const Notifications = () => {
  const onClick = (variation: Variation) => {
    fetch(`/notification${variation.uri}`)
      .then((response) => response.json());
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {
        variations.map((variation) => (
          <Button
            key={variation.uri}
            variant="outlined"
            onClick={() => onClick(variation)}
          >
            {variation.text}
          </Button>
        ))
      }
    </Box>
  );
};

export default Notifications;
