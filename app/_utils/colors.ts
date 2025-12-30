export function getItemQualityColor(quality: string): string {
  switch (quality) {
    case "Legendary":
      return "#ff8000";
    case "Epic":
      return "#c600ff";
    case "Rare":
      return "#0081ff";
    case "Uncommon":
      return "#1eff00";
    case "Heirloom":
      return "#0cf";
    default:
      return "#ffffff";
  }
}

export function classToColor(classId: number): string {
  switch (classId) {
    case 1:
      return "#c79c6e";
    case 2:
      return "#f58cba";
    case 3:
      return "#abd473";
    case 4:
      return "#fff569";
    case 5:
      return "#ffffff";
    case 6:
      return "#c41f3b";
    case 7:
      return "#0070de";
    case 8:
      return "#69ccf0";
    case 9:
      return "#9482c9";
    case 10:
      return "#00ff96";
    case 11:
      return "#ff7d0a";
    case 12:
      return "#a330c9";
    default:
      return "#ffffff";
  }
}
