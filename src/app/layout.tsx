import Header from "@/components/header";
import BottomNav from "@/components/bottomNav";
import Container from "@mui/material/Container";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }} className={roboto.className}>
        <Header />
        <Container
          maxWidth={false}
          sx={{
            marginTop: { md: "64px", xs: "56px" },
            paddingX: "0!important",
          }}
        >
          {children}
        </Container>
        {/* <div style={{ marginTop: 64 }}>{children}</div> */}
        <BottomNav />
      </body>
    </html>
  );
}
