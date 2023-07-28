import { getOneAnime } from "@/function/api/animeApi";
import { Metadata } from "next";
import _ from "lodash";
import Image from "next/image";
import Typography from "@mui/material/Typography";

import VideoModal from "@/components/videoModal";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Grid from "@mui/material/Grid";

import SingleBookmarkAction from "@/components/singleBtnBookmark";

import WhereAddedCollection from "@/components/whereAnimeAdded";

type Props = {
  params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const anim = await getOneAnime(params.id);
  // console.log(anim);

  return {
    title:
      anim.Media.title.english ||
      anim.Media.title.native ||
      `Unknown Anime Title`,
    description: _.truncate(anim.Media.description, { length: 140 }),
  };
}
export default async function DetailAnime({ params }: Props) {
  const anime = await getOneAnime(params.id);
  return (
    <>
      <Paper
        sx={{
          position: "relative",
          width: "100%",
          height: { md: 400, xs: 300 },
          boxShadow: "none",
        }}
        elevation={3}
      >
        <Image
          src={anime.Media.bannerImage || anime.Media.coverImage.extraLarge}
          alt={anime.Media.title.native}
          fill={true}
          objectFit={"cover"}
        />
        <Paper
          sx={{
            position: "absolute",
            background: "rgb(0 0 0 / 50%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "end",
            color: "#fff",
            boxShadow: "none",
          }}
          elevation={3}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              gutterBottom
              sx={{ marginY: "20px", fontWeight: 500 }}
            >
              {anime.Media.title.native}
            </Typography>
            {anime.Media.title.native != anime.Media.title.english && (
              <Typography variant="h4" gutterBottom sx={{ marginTop: -1 }}>
                {anime.Media.title.english}
              </Typography>
            )}
          </Container>
        </Paper>
      </Paper>
      <Container maxWidth="lg" sx={{ marginTop: 3 }}>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: -0.5 }}>
              Jumlah Season: {anime.Media.seasonInt}
            </Typography>
            <Rating
              name="size-medium"
              readOnly
              defaultValue={anime.Media.averageScore / 20}
            />
            <Typography
              variant="subtitle2"
              sx={{
                display: "inline-block",
                position: "relative",
                top: -6,
                marginLeft: 1,
              }}
            >
              {anime.Media.averageScore / 20}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <SingleBookmarkAction
              curCollection=""
              modeBookmark="add"
              refetch=""
              data={anime.Media}
            >
              <Button variant="outlined" startIcon={<BookmarkBorderIcon />}>
                Add To Collection
              </Button>
            </SingleBookmarkAction>
          </Grid>
        </Grid>
        <Typography
          variant="body1"
          gutterBottom
          dangerouslySetInnerHTML={{ __html: anime.Media.description }}
          sx={{ marginBottom: 3 }}
        />
        {anime.Media.genres.map((v: any, i: number) => (
          <Chip label={v} key={i} size="small" sx={{ marginRight: 1 }} />
        ))}
        <Typography variant="subtitle2" gutterBottom sx={{ marginTop: 4 }}>
          Collection:
        </Typography>
        <WhereAddedCollection id={anime.Media.id} />
      </Container>
      {/* <pre>{JSON.stringify(anime, null, 2)}</pre> */}
    </>
  );
}
