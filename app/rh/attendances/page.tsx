import { Button } from "@/components/ui/button";
import Link from "next/link";
import DateRangeInput from "@/src/ui/attendances/date-range";
import TableWrapper from "@/src/ui/attendances/table-wrapper";
import { Suspense } from "react";
import Loading from "../loading";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    "attendanceDateTime[after]"?: string;
    "attendanceDateTime[before]"?: string;
  };
}) {
  const after = searchParams && searchParams["attendanceDateTime[after]"]
  const before = searchParams && searchParams["attendanceDateTime[before]"]

    return (
      <Suspense fallback={<Loading />}>
        <div className="pt-8">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Présences</h1>
                <div className="flex gap-4 items-center">
                  <Link href={"/pyiurs/rh/attendances/import"}>
                    <Button>Importer</Button>
                  </Link>
                </div>
            </div>
            <div className="flex justify-between pt-4">
                <div className="flex gap-8 items-center">
                  <div>
                    <DateRangeInput />
                  </div>
                </div>
            </div>
            <div className="mt-8">
              <TableWrapper sParams={{after: after, before: before}} />
            </div>
        </div>
      </Suspense>
    )
}