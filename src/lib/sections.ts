/** Single source for nav, section rail and footer. Order = page order. */
export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "models", label: "Models" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
