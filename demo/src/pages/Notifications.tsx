/*
 *    Copyright 2022 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

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
