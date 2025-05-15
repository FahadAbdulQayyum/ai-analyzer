export const formatNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`; // Millions
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`; // Thousands
    } else {
      return num?.toString(); // Return as-is for smaller numbers
    }
  };