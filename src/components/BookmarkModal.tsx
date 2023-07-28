"use client";
import Typography from "@mui/material/Typography";
import Modal from "./videoModal";
import {
  Alert,
  Button,
  ButtonGroup,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  addBookmark,
  bookmarkList,
  createNewList,
  whereAnimeAdded,
} from "@/function/storage/bookmark";
import _ from "lodash";

export default function BookmarkDialog({
  animeData,
  open,
  handleClose,
}: {
  animeData: any;
  open: boolean;
  handleClose: any;
}) {
  const [snackbar, setSnackbar] = useState<any>(false);
  const [bmrkList, setBookmarkList] = useState<any>([]);
  const [arrListCheck, setArrListCheck] = useState<string[]>([]);
  const [openNewCol, setOpenNewCol] = useState<any>(false);

  const [newList, setNewList] = useState<any>("");
  async function buatListBaru() {
    setSnackbar(false);
    const sa = await createNewList(newList);
    if (sa.state) {
      setNewList("");
      setOpenNewCol("fetch");
    } else {
      const msg = {
        state: "error",
        message: sa.message,
      };
      setSnackbar(msg);
    }
  }

  function actArrList(data: string) {
    var dtf: string[] = arrListCheck;
    if (dtf[0] == "0") dtf.shift();

    if (_.includes(arrListCheck, data)) {
      dtf = _.pull(dtf, data);
    } else {
      dtf.push(data);
    }
    setArrListCheck(dtf);
  }
  async function handleSaveKeBookmark() {
    let dtscs: any[] = [];
    let dtfld: any[] = [];
    setSnackbar(false);

    // console.log(arrListCheck);

    for (let a = 0; a < animeData.length; a++) {
      for (let c = 0; c < arrListCheck.length; c++) {
        const addSt = await addBookmark(animeData[a], arrListCheck[c]);
        if (addSt.state) {
          dtscs.push(true);
        } else {
          dtfld.push(false);
          const msg = {
            state: "error",
            message: addSt.message,
          };
          setSnackbar(msg);
        }
      }
    }
    const tsktodo = animeData.length * arrListCheck.length;
    const msg = {
      state:
        dtscs.length == tsktodo
          ? "success"
          : dtscs.length > 0
          ? "info"
          : "error",
      message: `${
        dtscs.length > 0
          ? `${animeData.length} Anime Sukses ditambahkan ke ${arrListCheck.length} Collection.`
          : ""
      }${
        dtscs.length < tsktodo
          ? ` ${dtfld.length} Gagal ditambahkan, silahkan cek log.`
          : ""
      }`,
    };
    if (dtscs.length > 0) setSnackbar(msg);
    handleClose();
  }
  useEffect(() => {
    const fetchData = async () => {
      const ftchbmrklst = await bookmarkList();
      const ds = await whereAnimeAdded(animeData[0].id);
      return {
        list: ftchbmrklst,
        chkHasCol: ds,
      };
    };
    function loadData() {
      fetchData()
        .then((v) => {
          if (animeData.length == 1) {
            setArrListCheck(v.chkHasCol);
          }
          setBookmarkList(v.list);
        })
        .catch(console.error);
    }
    loadData();
    if (openNewCol == "fetch") {
      loadData();
      setOpenNewCol(false);
    }
  }, [openNewCol, setOpenNewCol]);
  return (
    <>
      <Modal open={open} handleClose={() => handleClose()} modalWidth={300}>
        <Typography
          variant="h6"
          gutterBottom={false}
          sx={{ paddingTop: 1, paddingX: 2 }}
        >
          Tambahkan ke Koleksi
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
        >
          {bmrkList.map((v: any, i: number) => {
            const labelId = `checkbox-list-label-${v}`;
            return (
              <ListItem key={v} disablePadding onClick={() => actArrList(v)}>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      // defaultChecked={_.includes(arrListCheck, v)}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      color="success"
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={v} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem disablePadding onClick={() => setOpenNewCol(true)}>
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText id={"newList"} primary={"Tambah Baru"} />
            </ListItemButton>
          </ListItem>
        </List>
        <ButtonGroup
          variant="text"
          aria-label="outlined primary button group"
          sx={{ float: "right" }}
        >
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button color="success" onClick={() => handleSaveKeBookmark()}>
            Simpan
          </Button>
        </ButtonGroup>
        <Modal
          open={openNewCol == true}
          handleClose={() => setOpenNewCol(false)}
          modalWidth={300}
        >
          <Typography
            variant="h6"
            gutterBottom={false}
            sx={{ paddingTop: 1, paddingX: 2 }}
          >
            Collection Name
          </Typography>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            autoComplete={"new-password"}
            autoFocus={true}
            sx={{ marginY: 2, width: "100%" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setNewList(e.target.value)
            }
          />
          <ButtonGroup
            variant="text"
            aria-label="outlined primary button group"
            sx={{ float: "right" }}
          >
            <Button onClick={() => setOpenNewCol(false)}>Close</Button>
            <Button color="success" onClick={() => buatListBaru()}>
              Simpan
            </Button>
          </ButtonGroup>
        </Modal>
      </Modal>
      <Snackbar
        open={snackbar != false ? true : false}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.state}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
