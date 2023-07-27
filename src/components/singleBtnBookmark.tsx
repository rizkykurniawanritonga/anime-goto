"use client";
import { addBookmark, deleteBookmark } from "@/function/storage/bookmark";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import AddBookmarkDialog from "@/components/BookmarkModal";

export default function SngleBtnBookmark({
  children,
  data,
  refetch,
  modeBookmark = "add",
  curCollection = "Tonton Nanti",
}: {
  curCollection: string;
  modeBookmark: string;
  children: React.ReactNode;
  data: any;
  refetch: any;
}) {
  const [snackbar, setSnackbar] = useState<any>(false);
  const [open, setOpen] = useState<boolean>(false);
  async function bookmarkAction(data: any) {
    if (modeBookmark == "add") {
      // setSnackbar(false);
      // const addSt = await addBookmark(data);
      // if (addSt) setSnackbar(addSt);
    } else {
      const konfirm = `Yakin ingin menghapus anime ini?`;
      if (confirm(konfirm) == true) {
        const dl = await deleteBookmark(data.id, curCollection);
        if (dl) setSnackbar(dl);
        refetch();
      }
    }
  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };
  const dt = [data];
  return (
    <>
      {modeBookmark != "add" && (
        <>
          <div onClick={() => bookmarkAction(data)}>{children}</div>

          <Snackbar
            open={snackbar != false ? true : false}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackbar.state == true ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </>
      )}
      {modeBookmark == "add" && (
        <>
          <div onClick={() => setOpen(true)}>{children}</div>
          <AddBookmarkDialog
            animeData={dt}
            open={open}
            handleClose={() => {
              setOpen(false);
            }}
          />
        </>
      )}
    </>
  );
}
