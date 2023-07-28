import _ from "lodash";
import { col, coldata } from "@/config/database.config";
async function readBookmarkData() {
  const cl = await col.toArray();
  var rtrn: any = {};
  for (let i = 0; i < cl.length; i++) {
    const dt = await coldata.where({ idcol: cl[i].id }).toArray();
    rtrn[cl[i].name] = dt;
  }
  return rtrn;
}

async function addBookmark(data: any, colname: string = "Tonton Nanti") {
  // const mksure = await coldata.toArray();

  // if (mksure) {
  // console.log("nama kolom" + colname);

  const fndCol = await col.where({ name: colname }).toArray();
  // console.log(fndCol);

  const dup = await coldata
    .where({ idcol: fndCol[0].id, dataid: data.id })
    .toArray();

  // const dup = _.find(readBf[colname], { id: data?.id });
  if (dup.length > 0) {
    return {
      state: false,
      message: `Anime ${
        data.title.english || data.title.native
      } sudah ditambahkan di Collection ${colname}!`,
    };
  } else {
    await coldata.add({
      idcol: fndCol[0].id,
      dataid: data.id,
      data: data,
    });
    return {
      state: true,
      message: `Anime ${
        data.title.english || data.title.native
      } ditambahkan ke collection ${colname}!`,
    };
  }
  // } else {
  //   const dt = {
  //     [colname]: [data],
  //   };
  //   saveStorage("bookmark", dt);
  //   return {
  //     state: true,
  //     message: `Anime ${
  //       data.title.english || data.title.native
  //     } ditambahkan ke collection ${colname}!`,
  //   };
  // }
}

async function deleteBookmark(id: number, colname: string = "Tonton Nanti") {
  const mksure = await coldata.toArray();
  // var readBf = await readStorage("bookmark");
  if (mksure) {
    const fndCol = await col.where("name").equals(colname).toArray();
    await coldata.where({ idcol: fndCol[0].name, dataid: id }).delete();
    // const gtBf = _.pullAllBy(readBf[colname], [{ id: id }], "id");
    // readBf[colname] = gtBf;
    // saveStorage("bookmark", readBf);
    return {
      state: true,
      message: `Berhasil menghapus Anime`,
      // newData: readBf,
    };
  } else {
    return {
      state: false,
      message: "Gagal menghapus Anime!",
    };
  }
}

async function createNewList(name: string) {
  // const readBf = await readStorage("bookmark");
  const mksure = await col.toArray();
  if (mksure) {
    const checkbfr = await col.where("name").equals(name).count();
    if (checkbfr) {
      return {
        state: false,
        message: "Nama List sudah ada",
      };
    } else if (!/^(?=.*[^\W_])[\w ]*$/.test(name)) {
      return {
        state: false,
        message:
          "Nama Collection tidak boleh mengandung Karakter selain Huruf dan angka",
      };
    } else {
      await col.add({
        name: name,
      });
      // readBf[name] = [];
      // saveStorage("bookmark", readBf);
      return {
        state: true,
        message: "List berhasil dibuat!",
      };
    }
  } else {
    return {
      state: false,
      message: "Gagal menambahkan List!",
    };
  }
}

async function deleteCollection(name: string) {
  const mksure = await col.toArray();
  if (mksure) {
    const gt = await col.where({ name: name }).toArray();
    col.where({ name: name }).delete();
    coldata.where({ idcol: gt[0].id }).delete();
    return {
      state: true,
      message: `Berhasil menghapus Collection ${name}!`,
    };
  } else {
    return {
      state: false,
      message: "Gagal Menghapus Collection!",
    };
  }
}

async function editNameCollection(from: string, to: any) {
  const mksure = await col.toArray();
  if (mksure) {
    const dup = await col.where({ name: to }).count();
    if (dup > 0) {
      return {
        state: false,
        message: "Nama List sudah ada",
      };
    } else if (!/^(?=.*[^\W_])[\w ]*$/.test(to)) {
      return {
        state: false,
        message:
          "Nama Collection tidak boleh mengandung Karakter selain Huruf dan angka",
      };
    } else {
      const gt = await col.where({ name: from }).toArray();
      col.update(gt[0].id, {
        name: to,
      });
      return {
        state: true,
        message: `Berhasil mengedit Collection ${name}!`,
      };
    }
  } else {
    return {
      state: false,
      message: "Gagal Menghapus Collection!",
    };
  }
}

async function whereAnimeAdded(id: string) {
  const dtcCol = await coldata.where({ dataid: id }).toArray();
  let hasIn: string[] = [];
  for (let i = 0; i < dtcCol.length; i++) {
    const cld = await col.where({ id: dtcCol[i].idcol }).toArray();
    for (let j = 0; j < cld.length; j++) {
      hasIn.push(cld[j].name);
    }
  }
  return hasIn;
}

async function bookmarkList() {
  const dsd = await col.toArray();
  var rtrn = [];
  for (let i = 0; i < dsd.length; i++) {
    rtrn.push(dsd[i].name);
  }
  return rtrn;
}

async function findByAnimeListByColName(name: string) {
  const cl = await col.where({ name: name }).toArray();
  return await coldata.where({ idcol: cl[0].id }).toArray();
}

export {
  readBookmarkData,
  findByAnimeListByColName,
  addBookmark,
  deleteBookmark,
  bookmarkList,
  createNewList,
  whereAnimeAdded,
  deleteCollection,
  editNameCollection,
};
