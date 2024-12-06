function removeAccentsLetterOnly(str: string) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function createSlug(str: string) {
  const noAccentLetter = removeAccentsLetterOnly(str);
  return noAccentLetter
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
