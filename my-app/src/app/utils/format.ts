
//Clean the data, format data
//Removing number 1..... 2....
export function cleanList(text: string): string[] {
  //The line (Which contain \n) will be split
  //Removes a leading number + dot + space
  //^ → start of the string
  // \d+ → one or more digits
  // \. → a literal dot
  // \s* → optional spaces
  return text
    .split("\n")
    .map(line => line.replace(/^\d+\.\s*/, "").trim())
    .filter(line => line.length > 0);
}