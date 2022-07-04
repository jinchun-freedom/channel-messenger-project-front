import React, { useEffect, useState, useRef } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Skeleton, Typography } from "@mui/material";
import { CellType, WriteMessageData } from "../../../definition";
import DialogCreateChannel from "dialog/DialogCreateChannel";
import { Subscription_Messages } from "query";
import { createClient } from "graphql-transport-ws";
import { SUBSCRIPTIONS } from "config";

const CreateChannel = () => {
  const defaultColumns = [
    {
      flex: 0.25,
      field: "id",
      headerName: "ID",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant="body2">
            {row.id}
          </Typography>
        );
      },
    },
    {
      flex: 0.25,
      field: "title",
      headerName: "Title",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant="body2">
            {row.title}
          </Typography>
        );
      },
    },
    {
      flex: 0.25,
      field: "content",
      headerName: "content",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant="body2" title={row.content}>
            {row.content}
          </Typography>
        );
      },
    },
    {
      flex: 0.25,
      field: "createdAt",
      headerName: "CreatedAt",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant="body2" title={row.createdAt}>
            {row.createdAt}
          </Typography>
        );
      },
    },
  ];
  const [createChannelDialogShow, setCreateChannelDialogShow] =
    useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [data, setData] = useState<WriteMessageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [channelId, setChannelId] = useState<string>();
  const [message, setMessage] = useState<WriteMessageData>();

  //启动
  useEffect(() => {
    if (!channelId) return;
    setShowGrid(true);
    const client = createClient({
      url: SUBSCRIPTIONS,
    });
    client.subscribe(
      {
        query: Subscription_Messages.replace("$channel", `"${channelId}"`),
      },
      {
        next: (result: any) => {
          setLoading(false);
          console.log(result.data)
          const item: WriteMessageData = result.data.writeMessages;
          setMessage(item);
        },
        error: () => {
          console.log("error");
        },
        complete: () => {
          console.log("complete");
        },
      },
    );
    return () => {
      client.dispose();
    };
  }, [channelId]);

  useEffect(() => {
    if (message) {
      const messages = JSON.parse(JSON.stringify(data));
      messages.push(message);
      setData(messages);
    }
  }, [message]);

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      ></Box>
      <Button
        variant="contained"
        sx={{ mb: 1 }}
        onClick={() => {
          setCreateChannelDialogShow(true);
        }}
      >
        Add Channel
      </Button>
      {showGrid && loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
      {showGrid && !loading && (
        <DataGrid
          autoHeight
          rowHeight={50}
          disableColumnMenu
          //@ts-ignore
          rows={data}
          pageSize={pageSize}
          disableSelectionOnClick
          columns={defaultColumns}
          rowsPerPageOptions={[3, 25, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      )}
      {createChannelDialogShow && (
        <DialogCreateChannel
          setDialogShow={setCreateChannelDialogShow}
          setChannelId={setChannelId}
        ></DialogCreateChannel>
      )}
    </Box>
  );
};

export default CreateChannel;
