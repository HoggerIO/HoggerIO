import itemsJson from "@/json/items.json";
import itemsEraJson from "@/json/itemsEra.json";

interface ItemData {
  itemLevel: number;
  displayId: number | null;
  icon: string | null;
}

interface ResolvedItemData extends ItemData {
  id: number;
}

type ItemsMap = Record<string, ItemData>;
const itemsMap: ItemsMap = itemsJson as ItemsMap;
const itemsEraMap: ItemsMap = itemsEraJson as ItemsMap;

/**
 * Get items by their IDs from the appropriate items map
 * @param ids - Array of item IDs to fetch
 * @param isEra - Whether to use ERA items or regular items
 * @returns Array of items with their IDs included
 */
export function getItemsByIds(ids: number[], isEra: boolean = false): ResolvedItemData[] {
  const itemMapToUse = isEra ? itemsEraMap : itemsMap;

  return ids
    .map((id) => {
      const item = itemMapToUse[id.toString()];
      if (item == null) {
        return null;
      }
      return {
        id,
        ...item,
      };
    })
    .filter((item) => item != null);
}
