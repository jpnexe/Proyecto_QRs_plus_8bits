export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  url: string;
}

export function searchItems<T extends SearchableItem>(
  items: T[],
  query: string
): T[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return items;

  try {
    return items.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(cleanQuery);
      const matchDesc = item.description.toLowerCase().includes(cleanQuery);
      const matchTag = item.tag.toLowerCase().includes(cleanQuery);
      return matchTitle || matchDesc || matchTag;
    });
  } catch {
    return items;
  }
}
