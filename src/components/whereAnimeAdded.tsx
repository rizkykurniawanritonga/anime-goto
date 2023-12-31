"use client";

import { whereAnimeAdded } from "@/function/storage/bookmark";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WhereAdd({ id }: { id: string }) {
  const [listed, setListed] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const listed = await whereAnimeAdded(id);
      return {
        list: listed,
      };
    };
    function loadData() {
      fetchData()
        .then((v) => {
          setListed(v.list);
        })
        .catch(console.error);
    }
    loadData();
  }, [setListed, id]);
  return listed.map((v: any, i: number) => (
    <Link
      href={`/bookmark/${v}`}
      title={`Buka Collection ${v}`}
      style={{ marginRight: "10px" }}
      key={i}
    >
      <Chip label={v} sx={{ cursor: "pointer" }} />
    </Link>
  ));
}
