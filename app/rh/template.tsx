import { Suspense } from "react";
import RhMenu from "../../src/ui/RhMenu";
import Loading from "./loading";

export default function Template({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="px-8 sm:px-12 md:px-24 lg:px-32 py-8">
            <RhMenu />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
        </div>
    )
}