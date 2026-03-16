import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";

const quarterPresets = [
  { label: "Q1 2025", from: new Date(2025, 0, 1), to: new Date(2025, 2, 31) },
  { label: "Q2 2025", from: new Date(2025, 3, 1), to: new Date(2025, 5, 30) },
  { label: "Q3 2025", from: new Date(2025, 6, 1), to: new Date(2025, 8, 30) },
  { label: "Q4 2025", from: new Date(2025, 9, 1), to: new Date(2025, 11, 31) },
  { label: "Q1 2026", from: new Date(2026, 0, 1), to: new Date(2026, 2, 31) },
];

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handlePreset = (preset: typeof quarterPresets[0]) => {
    onDateRangeChange({ from: preset.from, to: preset.to });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-9 justify-start text-left font-normal gap-2 text-sm",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "MMM d, yyyy")} – {format(dateRange.to, "MMM d, yyyy")}
              </>
            ) : (
              format(dateRange.from, "MMM d, yyyy")
            )
          ) : (
            <span>选择日期范围</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex">
          <div className="border-r border-border p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-2">快速选择</p>
            {quarterPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset)}
                className={cn(
                  "block w-full text-left text-sm px-3 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  dateRange?.from?.getTime() === preset.from.getTime() &&
                    dateRange?.to?.getTime() === preset.to.getTime() &&
                    "bg-accent text-accent-foreground font-medium"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
