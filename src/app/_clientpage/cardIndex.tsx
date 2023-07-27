"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import _ from "lodash";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import AddBookmarkDialog from "@/components/BookmarkModal";
import SingleActionBookmark from "@/components/singleBtnBookmark";

type PropsMedia = {
  media: any[];
  pageInfo: {
    lastPage: any;
  };
};
export default function Home({
  listTitle = "Anime Terbaru",
  curCategory = "",
  anime,
  curPage = "1",
  modeBookmark = "add",
  refetch,
}: {
  listTitle: string;
  anime: PropsMedia;
  modeBookmark: string;
  refetch: any;
  curCategory: string;
  curPage: string;
}) {
  const rtr = useRouter();
  const [dataSelect, setDataSelect] = useState<any[]>([]);
  const [bulkadd, setBulkAdd] = useState<boolean>(false);
  const [openDialogBookmark, setOpenDialogBookmark] = useState<boolean>(false);
  function handleCheckedAnime(state: any, id: any, data: any) {
    var dt: any[] = dataSelect;
    if (state) {
      const gt = JSON.parse(data);
      setDataSelect((old) => [...old, gt]);
    } else {
      setDataSelect(dt.filter((item) => item.id !== id));
    }
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const paginationHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    rtr.push(`/?page=${value}`);
  };
  return (
    <>
      {modeBookmark == "add" && (
        <Grid
          container
          spacing={2}
          sx={{ paddingX: 2, paddingTop: 2, marginBottom: -3 }}
        >
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              {listTitle}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            {bulkadd ? (
              <div className="btnbookmarksc">
                <Button
                  variant="text"
                  color="success"
                  onClick={() => setOpenDialogBookmark(true)}
                >
                  Simpan
                </Button>
                <Button variant="text" onClick={() => setBulkAdd(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="text"
                color="success"
                onClick={() => setBulkAdd(true)}
              >
                Tambah ke Koleksi
              </Button>
            )}
          </Grid>
        </Grid>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {anime?.media?.map((v, i) => (
            <Grid key={i} item md={4} xs={12} sm={6} lg={3} xl={2}>
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  marginBottom: "30px",
                }}
              >
                <Link href={`/detail/${v.id}`}>
                  <CardMedia
                    sx={{ height: 250 }}
                    image={v.coverImage.large}
                    title={v.title.english}
                  />
                </Link>
                <CardContent>
                  <Grid container>
                    {bulkadd && (
                      <Grid item xs={2}>
                        <Checkbox
                          {...label}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ): void =>
                            handleCheckedAnime(
                              e.target.checked,
                              v.id,
                              e.target.checked ? JSON.stringify(v) : ""
                            )
                          }
                          sx={{ marginTop: -1, paddingX: 0 }}
                        />
                      </Grid>
                    )}
                    <Grid item xs={bulkadd ? 10 : 12}>
                      <Typography gutterBottom variant="h5" component="div">
                        <Link
                          href={`/detail/${v.id}`}
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          {v.title.english ||
                            v.title.native ||
                            `Unknown Anime Title`}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" color="text.secondary">
                    {_.truncate(v.description, {
                      length: 140,
                    })}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    left: 0,
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <Link
                    href={`/detail/${v.id}`}
                    style={{ marginRight: "auto" }}
                  >
                    <IconButton aria-label="add to favorites">
                      <PlayArrowIcon />
                    </IconButton>
                  </Link>
                  <SingleActionBookmark
                    modeBookmark={modeBookmark}
                    data={v}
                    refetch={() => refetch()}
                    curCollection={curCategory}
                  >
                    <IconButton aria-label="Bookmark">
                      {modeBookmark == "add" ? (
                        <PlaylistAddIcon />
                      ) : (
                        <PlaylistRemoveIcon />
                      )}
                    </IconButton>
                  </SingleActionBookmark>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {anime?.pageInfo && (
          <Pagination
            count={anime.pageInfo.lastPage}
            page={parseInt(curPage)}
            sx={{ marginTop: 2, marginBottom: 10, marginX: 2 }}
            onChange={paginationHandler}
          />
        )}
      </Box>
      <AddBookmarkDialog
        animeData={dataSelect}
        open={openDialogBookmark}
        handleClose={() => {
          setOpenDialogBookmark(false);
          setBulkAdd(false);
        }}
      />
    </>
  );
}
