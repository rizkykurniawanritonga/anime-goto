"use client";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WindowIcon from "@mui/icons-material/Window";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
export default function bottomNav() {
  const { push } = useRouter();
  const [value, setValue] = useState("/");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    push(newValue);
    setValue(newValue);
  };
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { md: "none", sm: "block" },
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<WindowIcon color="success" />}
        />
        <BottomNavigationAction
          label="Cari"
          value="/search"
          icon={<SearchIcon color="success" />}
        />
        <BottomNavigationAction
          label="Bookmark"
          value="/bookmark"
          icon={<BookmarkBorderIcon color="success" />}
        />
      </BottomNavigation>
    </Paper>
  );
}
