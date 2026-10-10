export const categories = [
  { id: "branding", label: "Branding" },
  { id: "graphic-design", label: "Graphic design" },
  { id: "illustration", label: "Illustration" },
  { id: "art", label: "Art" },
  { id: "3d", label: "3D" },
  { id: "motion", label: "Motion" },
  { id: "experimental", label: "Experimental" },
];
export const categoryLabel = (id: string) =>
  categories.find((item) => item.id === id)?.label || id;
