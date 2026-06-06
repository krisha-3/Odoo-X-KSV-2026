// import React from "react";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// interface AppShellProps {
//   children: React.ReactNode;
// }

// const AppShell: React.FC<AppShellProps> = ({
//   children,
// }) => {
//   return (
//     <div className="app-layout">
//       <Sidebar />

//       <div className="main-wrapper">
//         <Topbar />

//         <main className="page-content">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AppShell;
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const AppShell: React.FC<AppShellProps> = ({
  children,
  currentPage,
  onNavigate,
}) => {
  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <div className="main-wrapper">
        <Topbar />

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
