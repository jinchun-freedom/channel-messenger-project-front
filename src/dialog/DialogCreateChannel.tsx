// ** React Imports
import React from "react";
import { Ref, useState, forwardRef, ReactElement } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Fade, { FadeProps } from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { queryData, Mutation_Create } from "query/index";

// ** Icons Imports
import Close from "mdi-material-ui/Close";
import { CreateChannelData, CreateData } from "definition";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />;
});

interface FormData {
  channelName: string;
}

interface Props {
  setDialogShow: any;
  setChannelId: any;
}

const DialogCreateChannel = (props: Props) => {
  const { setDialogShow, setChannelId } = props;
  const dispatch = useDispatch();

  // ** States
  const [show, setShow] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues = {
    channelName: "",
  };
  const schema = yup.object().shape({
    channelName: yup.string().required("ChannelName Required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShow(false);
    setDialogShow(false);
  };
  const onSubmit = (data: FormData) => {
    const { channelName } = data;
    console.log(channelName);
    setLoading(true);
    queryData(Mutation_Create.replace("$name", `"${channelName}"`))
      .then((res: Response) => res.json())
      .then((res: CreateChannelData) => {
        let result: CreateData | undefined = res.data.createChannel;
        setChannelId(result?.id);
        setLoading(false);
        setShow(false);
        setDialogShow(false);
      });
  };

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        scroll="body"
        onClose={() => handleClose()}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ "&.MuiPaper-root": { width: "40px" } }}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: 8,
              px: { xs: 8, sm: 15 },
              pt: { xs: 8, sm: 12.5 },
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleClose()}
              sx={{ position: "absolute", right: "1rem", top: "1rem" }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Channel Name
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={8} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name="channelName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label={"Channel Name"}
                        value={value}
                        size="small"
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.channelName)}
                      />
                    )}
                  />
                  {errors.channelName && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {/*@ts-ignore*/}
                      {errors.channelName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12}>
                <Button
                  variant="contained"
                  sx={{ marginRight: 1 }}
                  type="submit"
                  loading={loading}
                >
                  {"OK"}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    </Card>
  );
};

export default DialogCreateChannel;
