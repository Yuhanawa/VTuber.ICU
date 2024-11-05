import { getInfoByMid, getInfoByUname, getUnamesAndMids } from "../src/lib/InfoUtils";
import fs from "fs";

const namesAndMids = getUnamesAndMids();

const vs = fs
  .readdirSync("src/content/v/", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

namesAndMids
  .filter(({ uname }) => vs.includes(uname))
  .forEach(({ uname, mid }) => {
    const info = getInfoByMid(mid)
    if (info.follower < 10000) {
      fs.rmdirSync(`src/content/v/${uname}`, { recursive: true });
      console.info(`已删除${uname}`);
    }
  });
