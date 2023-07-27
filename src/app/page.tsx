import { getAnimePages } from "@/function/api/animeApi";
import type { Metadata } from "next";
import _ from "lodash";
import HomePage from "./_clientpage/cardIndex";

export const metadata: Metadata = {
  title: "Anime.in",
  description: "Halaman Anime Main",
};
export default async function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const anime = await getAnimePages({
    page: searchParams.page,
    perPage: 12,
  });

  return (
    <>
      <HomePage
        listTitle="Anime Terbaru"
        anime={anime?.Page}
        modeBookmark="add"
        curPage={searchParams.page}
      />
      {/* <pre>{JSON.stringify(anime, null, 2)}</pre> */}
    </>
  );
}
