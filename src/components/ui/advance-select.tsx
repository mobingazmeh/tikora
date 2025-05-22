import { useMemo, useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Option {
  value: string | number;
  label: string;
}

interface AdvanceSelectProps {
  options: Option[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  isLoading?: boolean;
}

export default function AdvanceSelect({
  options,
  onValueChange,
  placeholder = "Select an option",
  searchable = true,
  isLoading = false,
  ...props
}: AdvanceSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // فیلتر کردن گزینه‌ها بر اساس ورودی جستجو
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchTerm]);
 
  return (
    <Select {...props} onValueChange={onValueChange}>
      <SelectTrigger className="rtl" disabled={isLoading}>
        {isLoading ? (
          <div className="w-full flex justify-between items-center  ">
            <span>
              <Icon icon="mdi:loading" className="animate-spin" />
            </span>
            <span>در حال بارگذاری</span>
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent
        onFocus={(e) => e.stopPropagation()} // جلوگیری از از دست دادن فوکوس
        onKeyDown={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        onBlur={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        onKeyUp={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        className="z-[1000] "
      >
        {searchable && (
          <div
            className="p-2 sticky z-[1000] -top-2 bg-white"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بستن منو
          >
            <Input
              ref={inputRef}
              placeholder="جستجو ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-right"
              onFocus={(e) => e.stopPropagation()} // جلوگیری از از دست دادن فوکوس
              onKeyDown={(e) => {
                e.currentTarget.focus();
              }}
              onBlur={(e) => {
                e.currentTarget.focus();
              }}
              onKeyUp={(e) => {
                e.currentTarget.focus();
              }}
            />
          </div>
        )}
        {filteredOptions.map((option: Option) => (
          <SelectItem
            dir="rtl"
            className="!text-right"
            key={option.value}
            value={option.value + ""}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
