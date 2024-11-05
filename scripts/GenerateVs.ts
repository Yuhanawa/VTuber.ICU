import { getUnamesAndMids } from "../src/lib/InfoUtils";
import fs from "fs";

const namesAndMids = getUnamesAndMids();

const vs = fs
  .readdirSync("src/content/v/", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

namesAndMids
  .filter(({ uname }) => !vs.includes(uname))
  .forEach(({ uname, mid }) => {
    const content = `---
mid: ${mid}
title: "${uname}"
pubDate: "${new Date().toISOString()}"
updatedDate: "${new Date().toISOString()}"
profile:
  {
    Nickname: ["${uname}"],
  }
---

关注[${uname}](https://space.bilibili.com/${mid})谢谢喵~ 关注[${uname}](https://space.bilibili.com/${mid})谢谢喵~

## 此条目有待补充
你可以在[这里](https://github.com/Yuhanawa/VTuber.ICU-Content/edit/master/v/${uname}/index.md)编辑本文
`;
    fs.mkdirSync(`src/content/v/${uname}`);
    fs.writeFileSync(`src/content/v/${uname}/index.md`, content);
    console.info(`已添加${uname}`);
  });
