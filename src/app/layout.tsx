import Header from "@/components/header";
import BottomNav from "@/components/bottomNav";
import Container from "@mui/material/Container";
import TestLoading from "./loading";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body style={{ margin: 0 }}>
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
