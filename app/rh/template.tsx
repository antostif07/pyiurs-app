import RhMenu from "../../src/ui/RhMenu";
import RhMenuMobile from "@/src/ui/RhMenuMobile";
import React from "react";

export default async function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-5 relative">
      <RhMenu />
      <div className="flex flex-col col-span-4">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <RhMenuMobile />
          <div className="w-full flex-1">
            <form>
              <div className="relative flex justify-between items-center">
                <div>
                Pyiurs BackOffice
                </div>
              </div>
            </form>
          </div>
        </header>
        <main 
        className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"
        >
          {children}
        </main>
      </div>
    </div>
  )
}