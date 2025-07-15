import {type FC, type PropsWithChildren, Suspense} from "react";

const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="bg-slate-200 h-full w-full">
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;