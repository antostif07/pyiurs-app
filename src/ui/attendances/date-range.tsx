'use client';
 
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/src/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
 
export default function DateRangeInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedRange, setSelectedRange] = useState<DateRange>()
 
  // @ts-ignore
  useEffect(() => {
    function handleSearch() {
      const params = new URLSearchParams(searchParams);
      if (selectedRange && (selectedRange.from && selectedRange.to)) {
        params.set('attendanceDateTime[after]', format(selectedRange.from, "yyyy-MM-dd"));
        params.set('attendanceDateTime[before]', format(selectedRange.to, "yyyy-MM-dd"));
      } else {
        params.delete('attendanceDateTime[after]');
        params.delete('attendanceDateTime[before]')
      }
      replace(`${pathname}?${params.toString()}`);
    }
    
    if (selectedRange && (selectedRange.from && selectedRange.to)) {
      handleSearch()
    }
  }, [selectedRange,])

  return (
    <Popover>
      <PopoverTrigger asChild>
          <Button
              variant={"outline"}
              className={cn("w-[240px] pl-3 text-left font-normal", !selectedRange && "text-muted-foreground")}
            >
              {searchParams.get('attendanceDateTime[after]') && searchParams.get('attendanceDateTime[after]') ? (
                searchParams.get('attendanceDateTime[after]')?.toString() + " Au " + searchParams.get('attendanceDateTime[before]')?.toString()
              ) : (
                <span>Selectionner les dates</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={setSelectedRange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}