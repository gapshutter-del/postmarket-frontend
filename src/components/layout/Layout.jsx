import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F7F2EA",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar />

        <main
          style={{
            flex: 1,

            paddingTop: 48,
            paddingBottom: 56,
            paddingLeft: 56,
            paddingRight: 56,

            maxWidth: 1500,
            width: "100%",
            margin: "0 auto",

            boxSizing: "border-box",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}