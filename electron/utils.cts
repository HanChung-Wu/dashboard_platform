export const Utils = {
  formatDate: (date: Date) => {
    return date.toISOString().split("T")[0];
  },
  generateId: () => {
    return Date.now().toString();
  },
};
