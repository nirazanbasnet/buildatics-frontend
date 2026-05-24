export type SpecRow = { label: string; value: string };
export type RoomDimension = { name: string; size: string };
export type FacadeOption = { id: string; label: string; image: string };

export const detailTabs = ["Details", "Documents", "Projects", "Estimation", "Tasks"] as const;
export type DetailTab = (typeof detailTabs)[number];

export const detailDescription =
  "Rear master retreat, open living, and alfresco for seamless outdoor flow.";

export const detailSpecs: SpecRow[] = [
  { label: "Min. Block Width", value: "#PR1000 m" },
  { label: "Max. Block Width", value: "#PR1000 m" },
  { label: "House Area", value: "#PR1000 m" }
];

export const detailRooms: RoomDimension[] = [
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" },
  { name: "Living Room", size: "3000 X 3000" }
];

export const availableFacades: FacadeOption[] = [
  {
    id: "facade-1",
    label: "Coastal",
    image: "/images/display-center/facade/RENDER_DF01_12.5M_RIGHT_VN01.jpg"
  },
  {
    id: "facade-2",
    label: "Hampton",
    image: "/images/display-center/facade/RENDER_DF02_12.5M_RIGHT_VN01.jpg"
  },
  {
    id: "facade-3",
    label: "Modern",
    image: "/images/display-center/facade/RENDER_DF04_12.5M_RIGHT_VN01.jpg"
  }
];
