import React from "react";

import { ChannelView } from "views";

const routes = [
  {
    path: "/",
    renderer: (params = {}) => <ChannelView {...params} />,
  },
];

export default routes;
