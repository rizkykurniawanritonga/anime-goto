"use client";
import {
  createNewList,
  deleteCollection,
  editNameCollection,
  readBookmarkData,
} from "@/function/storage/bookmark";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Button,
  ButtonGroup,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";

import DialogModal from "@/components/videoModal";

export default function DetailCollection() {
  const [data, setData] = useState<any>();
  const [listBookmark, setListBookmark] = useState<any>([]);
  const [snackbar, setSnackbar] = useState<any>(false);
  const [ftch, setFtch] = useState(false);
  const [newCol, setNewCol] = useState<boolean>(false);
  const [newColName, setNewColName] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const sdsd = await readBookmarkData();
      // console.log(sdsd);
      return {
        bookmark: sdsd,
        list: _.keys(sdsd),
      };
    };
    function loadData() {
      fetchData()
        .then((v) => {
          setData({
            media: v.bookmark,
          });
          setListBookmark(v.list);
        })
        .catch(console.error);
    }
    loadData();
    if (ftch) {
      loadData();
      setFtch(false);
    }
  }, [setData, setListBookmark, setFtch, ftch]);

  async function handleDeleteCollection(name: string) {
    const konfirm = `Yakin ingin menghapus collection ${name} ini?`;
    if (confirm(konfirm) == true) {
      const dsd = await deleteCollection(name);
      setSnackbar(dsd);
      if (dsd.state) setFtch(true);
    }
  }
  async function handleEditCollection(from: string) {
    let newName = prompt("Silahkan Edit nama Collection", from);
    if (newName != null) {
      const dsd = await editNameCollection(from, newName);
      setSnackbar(dsd);
      if (dsd.state) setFtch(true);
    }
  }
  async function handleCreateCollection() {
    const dsd = await createNewList(newColName);
    setSnackbar(dsd);
    if (dsd.state) {
      setFtch(true);
      setNewCol(false);
    }
  }
  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Collection List
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Button
              variant="text"
              color="success"
              onClick={() => setNewCol(true)}
            >
              Tambah Koleksi
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {listBookmark.map((v: any, i: number) => (
            <Grid item md={6} lg={3} xs={12} key={i}>
              <Card sx={{ display: "flex", minHeight: "130px" }}>
                <Box flex={1} sx={{ position: "relative" }}>
                  <CardContent>
                    <Link
                      href={`/bookmark/${v}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography component="div" variant="h5">
                        {v}
                      </Typography>
                    </Link>
                    {data?.media[v][0] && (
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {_.take(data?.media[v], 2).map(
                          (lc: any) =>
                            `${lc.data.title.english || lc.data.title.native}, `
                        )}
                      </Typography>
                    )}
                  </CardContent>
                  {v != "Tonton Nanti" && (
                    <>
                      <Paper
                        sx={{
                          position: "absolute",
                          left: 10,
                          bottom: 5,
                          boxShadow: "none",
                        }}
                        elevation={3}
                      >
                        <IconButton
                          aria-label="play/pause"
                          onClick={() => handleEditCollection(v)}
                        >
                          <EditIcon sx={{ height: 24, width: 24 }} />
                        </IconButton>
                        <IconButton
                          aria-label="play/pause"
                          onClick={() => handleDeleteCollection(v)}
                        >
                          <DeleteForeverIcon sx={{ height: 24, width: 24 }} />
                        </IconButton>
                      </Paper>
                    </>
                  )}
                </Box>
                {data?.media[v][0] && (
                  <CardMedia
                    component="img"
                    sx={{ width: 150, height: 150 }}
                    image={
                      data.media[v][_.random(0, data.media[v].length - 1)].data
                        .coverImage.extraLarge
                    }
                  />
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <DialogModal
        open={newCol}
        modalWidth={300}
        handleClose={() => setNewCol(false)}
      >
        <Paper
          sx={{
            paddingTop: "0",
            paddingX: 1,
            paddingBottom: 1,
            boxShadow: "none",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Collection
          </Typography>
          <TextField
            id="outlined-basic"
            label="Nama Collection"
            variant="outlined"
            fullWidth={true}
            sx={{ marginTop: 1 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setNewColName(e.target.value)
            }
          />
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
            sx={{ marginTop: 2 }}
            fullWidth={true}
          >
            <Button onClick={() => setNewCol(false)}>Cancel</Button>
            <Button color={"success"} onClick={() => handleCreateCollection()}>
              Simpan
            </Button>
          </ButtonGroup>
        </Paper>
      </DialogModal>
      <Snackbar open={snackbar != false ? true : false} autoHideDuration={3000}>
        <Alert
          severity={snackbar.state ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
