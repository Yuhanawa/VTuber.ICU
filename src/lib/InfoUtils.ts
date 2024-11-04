import infoJson from "../data/info.json";
const infos = infoJson as BInfo[];

export function getInfoByMid(mid: number): BInfo {
  return infos.filter((i) => i.mid === mid)[0];
}

export function getInfoByUname(uname: string): BInfo {
  return infos.filter((i) => i.uname === uname)[0];
}
export function getUnames(): string[] {
  return infos.map((i) => i.uname);
}
export function getUnamesAndMids(): { uname: string; mid: number }[] {
  return infos
    .map((i) => ({
      uname: i.uname,
      mid: i.mid,
    }))
    .filter(
      ({ uname, mid }) =>
        !uname.startsWith("bili") && !uname.startsWith("Bili") && mid > 0 && !uname.match(/^\d+$/g),
    );
}
export function getMidByUname(uname: string): number {
  return getInfoByUname(uname).mid;
}
