export type PreconstructionCategoryStatus = "done" | "in-progress" | "pending";

export type PreconstructionCategory = {
  id: string;
  label: string;
  status: PreconstructionCategoryStatus;
  completed: number;
  total: number;
};

export type PreconstructionDetailContact = {
  id: string;
  role: string;
  value: string;
};

export type PreconstructionDetailOwner = {
  id: string;
  label: string;
  name: string;
  address: string;
  email: string;
  contact: string;
};

export type PreconstructionDetailProject = {
  id: string;
  projectNo: string;
  status: "in-progress";
  address: string;
  progress: number;
  totalBudget: string;
  spent: string;
  timeline: string;
  timelineDate: string;
  stage: string;
  stageStatus: string;
  owners: PreconstructionDetailOwner[];
  contacts: PreconstructionDetailContact[];
  categories: PreconstructionCategory[];
};

export const preconstructionDetailTabs = [
  "Overview",
  "Checklist",
  "Color Selections",
  "Permits",
  "Documents",
  "Timeline"
] as const;

export type PreconstructionDetailTab = (typeof preconstructionDetailTabs)[number];

const dummyOwner = {
  name: "client_name",
  address: "lotNo, streetNo streetName, suburb postCode",
  email: "client_email@gmail.com",
  contact: "+61 400 000 000"
};

export const preconstructionDetailMock: PreconstructionDetailProject = {
  id: "pr-001",
  projectNo: "#PR1000",
  status: "in-progress",
  address: "lotNo, streetNo streetName, suburb postCode",
  progress: 35,
  totalBudget: "$ cost",
  spent: "$0000",
  timeline: "7 months",
  timelineDate: "25 Oct 2025",
  stage: "stage_name",
  stageStatus: "On Schedule",
  owners: [
    { id: "o1", label: "Owner 1", ...dummyOwner },
    { id: "o2", label: "Owner 2", ...dummyOwner },
    { id: "o3", label: "Owner 3", ...dummyOwner }
  ],
  contacts: [
    { id: "c1", role: "Geotech Engineer", value: "geotechEngineer_name" },
    { id: "c2", role: "Structural Engineer", value: "structuralEngineer_name" },
    { id: "c3", role: "Energy Rater", value: "energyRater_name" },
    { id: "c4", role: "Building Surveyer", value: "buildingSurveyer_name" },
    { id: "c5", role: "Developer", value: "developer_name" },
    { id: "c6", role: "Council", value: "council_name" },
    { id: "c7", role: "Water Authority", value: "waterAuthority_name" }
  ],
  categories: [
    { id: "cat1", label: "Legal and Finance", status: "done", completed: 4, total: 4 },
    { id: "cat2", label: "Design and Drafting", status: "done", completed: 4, total: 4 },
    { id: "cat3", label: "Permits and Approval", status: "done", completed: 4, total: 4 },
    { id: "cat4", label: "Color and Selection", status: "in-progress", completed: 2, total: 4 },
    { id: "cat5", label: "Sites and Trades", status: "in-progress", completed: 2, total: 4 },
    { id: "cat6", label: "Pre-Start", status: "pending", completed: 0, total: 4 }
  ]
};
