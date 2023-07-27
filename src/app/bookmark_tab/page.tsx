"use client";

import { readStorage } from "@/function/storage/bookmark";
import { useEffect, useState } from "react";
import CardIndex from "../_clientpage/cardIndex";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import Typography from "@mui/material/Typography";

export default function BookmarkPage({
  searchParams,
}: {
  searchParams: { tab: string };
}) {
  const [data, setData] = useState<any>();
  const [listBookmark, setListBookmark] = useState<any>([]);
  const [tabKat, setTabKat] = useState("default");
  const [ftch, setFtch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const bmrk = await readStorage("bookmark");
      return {
        bookmark: bmrk,
        list: _.keys(bmrk),
      };
    };
    function loadData() {
      fetchData()
        .then((v) => {
          if (!v.bookmark[tabKat]) {
            const stl = v.list;
            setTabKat(searchParams.tab || stl[0]);
          }
          setData({
            media: v.bookmark[tabKat],
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
  }, [
    setData,
    setFtch,
    ftch,
    setListBookmark,
    tabKat,
    setTabKat,
    searchParams,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue == "addCollectionName") alert("baaa");
    setTabKat(newValue);
  };
  const handleRefetch = () => {
    setFtch(true);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom marginTop={10}>
        Collection List
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabKat}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Collection Category"
              variant="scrollable"
            >
              {listBookmark.map((v: any, i: number) => (
                <Tab
                  label={v}
                  key={i}
                  value={v}
                  icon={
                    <CloseIcon
                      sx={{
                        height: "18px",
                        padding: 0,
                      }}
                      onClick={() => alert("delete?")}
                    />
                  }
                  sx={{
                    minHeight: "50px",
                  }}
                  iconPosition="end"
                />
              ))}
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <CardIndex
        listTitle=""
        curPage=""
        anime={data}
        modeBookmark="hapus"
        refetch={handleRefetch}
        curCategory={tabKat}
      />
    </>
  );
}
