export type DetailThemeId = "v1";

export type DetailTheme = {
  panel: string;
  card: string;
  cardHeader: string;
  facadeCard: string;
};

export const detailThemes: Record<DetailThemeId, DetailTheme> = {
  v1: {
    panel: "",
    card: "",
    cardHeader: "",
    facadeCard: ""
  }
};
