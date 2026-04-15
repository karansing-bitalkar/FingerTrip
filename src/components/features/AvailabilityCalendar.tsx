import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Seeded availability generator for consistent results
function getAvailability(year: number, month: number): Record<number, 'available' | 'soldout' | 'limited'> {
  const result: Record<number, 'available' | 'soldout' | 'limited'> = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const seed = year * 100 + month;
  for (let d = 1; d <= daysInMonth; d++) {
    const hash = (seed * 31 + d * 17) % 10;
    if (hash < 5) result[d] = 'available';
    else if (hash < 7) result[d] = 'limited';
    else result[d] = 'soldout';
  }
  return result;
}

// Price variant per date (±20% variation based on day)
function getDatePrice(basePrice: number, year: number, month: number, day: number): number {
  const hash = (year * 31 + month * 17 + day * 7) % 41;
  const multiplier = 0.85 + (hash / 40) * 0.35;
  return Math.round(basePrice * multiplier);
}

interface Props {
  basePrice: number;
  onRangeChange?: (from: Date | null, to: Date | null) => void;
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function AvailabilityCalendar({ basePrice, onRangeChange }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const availability = getAvailability(viewYear, viewMonth);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (day: number, status: string) => {
    if (status === 'soldout') return;
    const clicked = new Date(viewYear, viewMonth, day);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(clicked);
      setRangeEnd(null);
      onRangeChange?.(clicked, null);
    } else {
      if (clicked < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(clicked);
        onRangeChange?.(clicked, rangeStart);
      } else {
        setRangeEnd(clicked);
        onRangeChange?.(rangeStart, clicked);
      }
    }
  };

  const isInRange = (day: number): boolean => {
    const d = new Date(viewYear, viewMonth, day);
    const end = rangeEnd || hoverDate;
    if (!rangeStart || !end) return false;
    const [lo, hi] = rangeStart <= end ? [rangeStart, end] : [end, rangeStart];
    return d > lo && d < hi;
  };

  const isRangeStart = (day: number) => rangeStart && +new Date(viewYear, viewMonth, day) === +rangeStart;
  const isRangeEnd = (day: number) => {
    const end = rangeEnd || (rangeStart && hoverDate);
    return end && +new Date(viewYear, viewMonth, day) === +end;
  };

  const isPast = (day: number) => new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Compute nights and total price for selected range
  const nights = rangeStart && rangeEnd ? Math.round(Math.abs(+rangeEnd - +rangeStart) / (1000 * 60 * 60 * 24)) : 0;
  const selectedDayPrice = rangeStart ? getDatePrice(basePrice, rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate()) : basePrice;

  return (
    <div className="bg-white rounded-2xl border border-[#AFDDE5]/40 shadow-sm overflow-hidden select-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003135] to-[#024950] px-5 py-4 flex items-center justify-between">
        <button onClick={prevMonth} className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-white font-bold text-sm font-display">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-5 py-3 bg-[#f0fafb] border-b border-[#AFDDE5]/30 text-[10px] font-semibold">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#0FA4AF] inline-block" />Available</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />Limited</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" />Sold Out</span>
        <span className="flex items-center gap-1.5 ml-auto"><span className="w-3 h-3 rounded bg-[#003135] inline-block" />Selected</span>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 px-2 pt-3 pb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 px-2 pb-3 gap-y-1">
        {/* Empty cells for first week offset */}
        {[...Array(firstDayOfWeek)].map((_, i) => <div key={`e${i}`} />)}

        {[...Array(daysInMonth)].map((_, idx) => {
          const day = idx + 1;
          const status = availability[day];
          const past = isPast(day);
          const start = isRangeStart(day);
          const end = isRangeEnd(day);
          const inRange = isInRange(day);
          const price = getDatePrice(basePrice, viewYear, viewMonth, day);

          let bgClass = '';
          let textClass = '';
          let circleClass = '';

          if (past) {
            textClass = 'text-gray-300 cursor-not-allowed';
          } else if (start || end) {
            bgClass = 'bg-[#003135] rounded-xl';
            textClass = 'text-white font-bold';
          } else if (inRange) {
            bgClass = 'bg-[#AFDDE5]/40';
            textClass = 'text-[#003135]';
          } else if (status === 'available') {
            circleClass = 'ring-1 ring-[#0FA4AF]/50';
            textClass = 'text-[#003135] hover:bg-[#0FA4AF]/20 cursor-pointer font-medium';
          } else if (status === 'limited') {
            circleClass = 'ring-1 ring-amber-400/60';
            textClass = 'text-amber-700 hover:bg-amber-50 cursor-pointer font-medium';
          } else {
            textClass = 'text-red-300 cursor-not-allowed line-through';
          }

          return (
            <div
              key={day}
              className={`relative flex flex-col items-center justify-center py-1.5 transition-all duration-100 ${bgClass}`}
              onClick={() => !past && handleDayClick(day, status)}
              onMouseEnter={() => rangeStart && !rangeEnd && !past && setHoverDate(new Date(viewYear, viewMonth, day))}
              onMouseLeave={() => setHoverDate(null)}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs ${textClass} ${circleClass} transition-colors`}>
                {day}
              </div>
              {!past && status !== 'soldout' && (
                <span className={`text-[8px] leading-none mt-0.5 font-semibold ${
                  start || end ? 'text-[#AFDDE5]/80' : status === 'limited' ? 'text-amber-500' : 'text-[#0FA4AF]/70'
                }`}>
                  ${(price / 100).toFixed(0)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Range Summary */}
      {rangeStart && (
        <div className="mx-3 mb-3 px-4 py-3 bg-gradient-to-r from-[#003135]/8 to-[#0FA4AF]/10 rounded-2xl border border-[#AFDDE5]/50">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs text-gray-600">
              <span className="font-bold text-[#003135]">
                {rangeStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              {rangeEnd && (
                <> → <span className="font-bold text-[#003135]">
                  {rangeEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-gray-400 ml-1">({nights} {nights === 1 ? 'night' : 'nights'})</span>
                </>
              )}
              {!rangeEnd && <span className="text-gray-400 ml-1">(select end date)</span>}
            </div>
            {rangeEnd && (
              <div className="text-right">
                <span className="text-[10px] text-gray-400">Total</span>
                <div className="text-sm font-bold text-[#964734]">${(selectedDayPrice * nights).toLocaleString()}</div>
              </div>
            )}
          </div>
          {rangeStart && !rangeEnd && (
            <div className="text-[10px] text-[#0FA4AF] mt-1.5 font-medium">
              From ${selectedDayPrice.toLocaleString()}/person on this date
            </div>
          )}
        </div>
      )}
    </div>
  );
}
