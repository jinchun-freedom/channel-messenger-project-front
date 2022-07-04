import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

import Main from "layouts/Main";
import Container from "components/Container";
import { CreateChannel, MessageList } from "./components";
import { RootState } from "store";
import { ListType } from "definition";

const ChannelView = () => {
  const store = useSelector((store: RootState) => store.channel);

  return (
    <Main>
      <Box bgcolor={"alternate.main"} position={"relative"}>
        <Box paddingBottom={{ xs: 2, sm: 3, md: 4 }}>
          <Container>
            {store.currentType === ListType.Create ? (
              <CreateChannel />
            ) : (
              <MessageList />
            )}
          </Container>
        </Box>
      </Box>
    </Main>
  );
};

export default ChannelView;
