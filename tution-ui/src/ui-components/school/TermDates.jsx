'use client';

import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const TermDates = ({
  openStart,
  openEnd,
  startDate,
  endDate,
  setOpenStart,
  setStartDate,
  setEndDate,
  setOpenEnd,
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Beginning of term */}
      <div className="flex flex-col gap-2 bg-gray-600 p-2 rounded-sm">
        <Label htmlFor="start" className="px-1 text-white">
          Beginning Of Term
        </Label>
        <Popover open={openStart} onOpenChange={setOpenStart}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="start"
              className="justify-between font-normal bg-gray-600 hover:bg-gray-500 text-white"
            >
              {startDate ? startDate.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 bg-gray-500 border-none text-white"
            align="start"
          >
            <Calendar
              mode="single"
              selected={startDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                setStartDate(date);
                setOpenStart(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* End of term */}
      <div className="flex flex-col gap-2 bg-gray-600 p-2 rounded-sm">
        <Label htmlFor="end" className="px-1 text-white">
          End Of Term
        </Label>
        <Popover open={openEnd} onOpenChange={setOpenEnd}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="end"
              className="justify-between font-normal bg-gray-600 hover:bg-gray-500 text-white"
            >
              {endDate ? endDate.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 bg-gray-500 border-none text-white"
            align="start"
          >
            <Calendar
              mode="single"
              selected={endDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                setEndDate(date);
                setOpenEnd(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
