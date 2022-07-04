import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ListType } from "definition";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeType } from "store/channel";

//@ts-ignore
const NavItem = ({ title, id, items }) => {
  const theme = useTheme();
  const store = useSelector((store: RootState) => store.channel);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClick = (event: any, popoverId: any) => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  };

  const handleChange = (type: ListType) => {
    dispatch(handleChangeType(type));
    handleClose();
  };

  const hasActiveLink = () =>
    items.find((i: any) => i.type === store.currentType);
  const linkColor = "text.primary";

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        aria-describedby={id}
        sx={{ cursor: "pointer" }}
        onClick={(e) => handleClick(e, id)}
      >
        <Typography
          fontWeight={openedPopoverId === id || hasActiveLink() ? 700 : 400}
          color={linkColor}
        >
          {title}
        </Typography>
        <ExpandMoreIcon
          sx={{
            marginLeft: theme.spacing(1 / 4),
            width: 16,
            height: 16,
            transform: openedPopoverId === id ? "rotate(180deg)" : "none",
            color: linkColor,
          }}
        />
      </Box>
      <Popover
        elevation={3}
        id={id}
        open={openedPopoverId === id}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          ".MuiPaper-root": {
            maxWidth: items.length > 12 ? 350 : 250,
            marginTop: 2,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderTop: `3px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <Grid container spacing={0.5}>
          {items.map((p: any, i: number) => (
            <Grid item key={i} xs={items.length > 12 ? 6 : 12}>
              <Button
                component={"a"}
                href={p.href}
                fullWidth
                sx={{
                  justifyContent: "center",
                  color:
                    store.currentType === p.type
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  backgroundColor:
                    store.currentType === p.type
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                  fontWeight: store.currentType === p.type ? 600 : 400,
                  textAlign: "center",
                }}
                onClick={() => {
                  handleChange(p.type);
                }}
              >
                {p.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Popover>
    </Box>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default NavItem;
