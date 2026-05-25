export type BlockOption = "all" | "8.5" | "10.5" | "12.5";
export type CountOption = "all" | "1" | "2" | "3" | "4+";
export type GarageOption = "all" | "single" | "double";

export type FilterState = {
  houseArea: [number, number];
  minBlockDepth: BlockOption;
  minBlockWidth: BlockOption;
  bedrooms: CountOption;
  baths: CountOption;
  garage: GarageOption;
};

export const HOUSE_AREA_MIN = 15.5;
export const HOUSE_AREA_MAX = 99.6;

export const BLOCK_OPTIONS: { value: BlockOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "8.5", label: "8.5m" },
  { value: "10.5", label: "10.5m" },
  { value: "12.5", label: "12.5m" }
];

export const COUNT_OPTIONS: { value: CountOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4+" }
];

export const GARAGE_OPTIONS: { value: GarageOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "single", label: "Single" },
  { value: "double", label: "Double" }
];

export const DEFAULT_FILTER: FilterState = {
  houseArea: [HOUSE_AREA_MIN, HOUSE_AREA_MAX],
  minBlockDepth: "all",
  minBlockWidth: "12.5",
  bedrooms: "3",
  baths: "3",
  garage: "all"
};
