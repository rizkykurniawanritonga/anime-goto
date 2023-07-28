import { getAnimePages } from "@/function/api/animeApi";
import type { Metadata } from "next";
import _ from "lodash";
import HomePage from "../_clientpage/cardIndex";

export const metadata: Metadata = {
  title: "Search Page",
  description: "Halaman Anime Main",
};
export default async function Home({
  searchParams,
}: {
  searchParams: { page: string; query: string };
}) {
  const anime = await getAnimePages({
    page: parseInt(searchParams.page),
    perPage: 12,
    search: searchParams.query || "",
  });

  return (
    <>
      <HomePage
        listTitle={`Pencarian: ${searchParams.query}`}
        anime={anime?.Page}
        modeBookmark="add"
        curPage={searchParams.page}
        curCategory=""
        refetch=""
      />
      {/* <pre>{JSON.stringify(anime, null, 2)}</pre> */}
    </>
  );
}
