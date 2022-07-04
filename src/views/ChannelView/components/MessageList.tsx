import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Skeleton, Typography } from "@mui/material";
import {
  CellType,
  QueryMessagesData,
  QueryMessageData,
} from "../../../definition";
import { queryData, Query_Messages } from "query";

const MessageList = () => {
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
      headerName: "createdAt",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant="body2" title={row.createdAt}>
            {row.createdAt}
          </Typography>
        );
      },
    },
  ];

  const [pageSize, setPageSize] = useState<number>(10);
  const [data, setData] = useState<QueryMessageData[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    queryData(Query_Messages)
      .then((res: Response) => res.json())
      .then((res: any) => {
        console.log(res.data);
        const result: QueryMessageData[] | undefined = res.data.queryMessages;
        setLoading(false);
        setData(result);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      ></Box>

      {loading && (
        <Box sx={{ width: "100%" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
      {!loading && (
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
    </Box>
  );
};

export default MessageList;
