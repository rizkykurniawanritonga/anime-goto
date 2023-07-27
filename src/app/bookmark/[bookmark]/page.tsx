"use client";

import { editNameCollection, readStorage } from "@/function/storage/bookmark";
import { useEffect, useState } from "react";
import CardIndex from "../../_clientpage/cardIndex";

import _ from "lodash";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

type Props = {
  params: { bookmark: number };
};

export default function BookmarkPage({ params }: Props) {
  const { push } = useRouter();
  const [data, setData] = useState();
  const [tabKat, setTabKat] = useState("default");
  const [ftch, setFtch] = useState(false);
  const [snackbar, setSnackbar] = useState<any>(false);

  useEffect(() => {
    const fetchData = async () => {
      const bmrk = await readStorage("bookmark");
      return {
        bookmark: bmrk,
      };
    };
    function loadData() {
      fetchData()
        .then((v) => {
          setData({
            media: v.bookmark[decodeURI(params.bookmark)],
          });
        })
        .catch(console.error);
    }
    loadData();
    if (ftch) {
      loadData();
      setFtch(false);
    }
  }, [setData, setFtch, ftch, tabKat, setTabKat]);
  async function handleEditCollection() {
    let newName = prompt(
      "Silahkan Edit nama Collection",
      decodeURI(params.bookmark)
    );
    if (newName != null) {
      const dsd = await editNameCollection(decodeURI(params.bookmark), newName);
      setSnackbar(dsd);
      if (dsd.state) push(encodeURI(`/bookmark/${newName}`));
    }
  }
  const handleRefetch = () => {
    setFtch(true);
  };
  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        marginTop={10}
        marginX={2}
        marginBottom={-2}
      >
        Collection: {decodeURI(params.bookmark)}
        <IconButton
          aria-label="play/pause"
          onClick={() => handleEditCollection()}
          sx={{ marginLeft: 1 }}
        >
          <EditIcon sx={{ height: 20, width: 20 }} />
        </IconButton>
      </Typography>

      <Typography
        variant="subtitle2"
        gutterBottom
        marginTop={2}
        marginX={2}
        marginBottom={-2}
      >
        Jumlah: {data?.media?.length}
      </Typography>
      <CardIndex
        anime={data}
        modeBookmark="hapus"
        refetch={handleRefetch}
        curCategory={decodeURI(params.bookmark)}
      />
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
