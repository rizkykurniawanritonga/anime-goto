import * as lclFrg from "localforage";
import _, { gt } from "lodash";
lclFrg.config({
  name: "storage-anime.in",
});
function readStorage(name: string) {
  //   var dt;
  return lclFrg.getItem(name).then(function (v: any) {
    return JSON.parse(v);
  });
}

function saveStorage(name: string, data: any) {
  return lclFrg.setItem(name, JSON.stringify(data));
}

async function addBookmark(data: any, colname: string = "Tonton Nanti") {
  const readBf = await readStorage("bookmark");
  if (readBf) {
    const dup = _.find(readBf[colname], { id: data?.id });
    if (dup) {
      return {
        state: false,
        message: `Anime ${
          data.title.english || data.title.native
        } sudah ditambahkan di Collection ${colname}!`,
      };
    } else {
      var fndArC: object[] = readBf[colname];
      if (fndArC) {
        readBf[colname].push(data);
        saveStorage("bookmark", readBf);
      } else {
        var dt = readBf;
        dt[colname] = [data];
        console.log(dt);
        saveStorage("bookmark", dt);
      }
      return {
        state: true,
        message: `Anime ${
          data.title.english || data.title.native
        } ditambahkan ke collection ${colname}!`,
      };
    }
  } else {
    const dt = {
      [colname]: [data],
    };
    saveStorage("bookmark", dt);
    return {
      state: true,
      message: `Anime ${
        data.title.english || data.title.native
      } ditambahkan ke collection ${colname}!`,
    };
  }
}

async function deleteBookmark(id: number, colname: string = "Tonton Nanti") {
  var readBf = await readStorage("bookmark");
  if (readBf) {
    const gtBf = _.pullAllBy(readBf[colname], [{ id: id }], "id");
    readBf[colname] = gtBf;
    saveStorage("bookmark", readBf);
    return {
      state: true,
      message: `Berhasil menghapus Anime`,
      newData: readBf,
    };
  } else {
    return {
      state: false,
      message: "Gagal menghapus Anime!",
    };
  }
}

async function createNewList(name: string) {
  const readBf = await readStorage("bookmark");
  if (readBf) {
    if (readBf[name]) {
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
      readBf[name] = [];
      saveStorage("bookmark", readBf);
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
  const readBf = await readStorage("bookmark");
  if (readBf) {
    const rmv = _.omit(readBf, [name]);
    saveStorage("bookmark", rmv);
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
  const readBf = await readStorage("bookmark");
  if (readBf) {
    if (readBf[to]) {
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
      const gtbf = readBf[from];
      const rmv = _.omit(readBf, [from]);
      rmv[to] = gtbf;
      saveStorage("bookmark", rmv);
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
  const readBf = await readStorage("bookmark");
  let hasIn: string[] = [];
  let dt = _.forOwn(readBf, function (value, key) {
    const fnd = _.some(value, ["id", id]);
    if (fnd) hasIn.push(key);
  });
  return hasIn;
}

async function bookmarkList() {
  const readBf = await readStorage("bookmark");
  return _.keys(readBf);
}

export {
  readStorage,
  saveStorage,
  addBookmark,
  deleteBookmark,
  bookmarkList,
  createNewList,
  whereAnimeAdded,
  deleteCollection,
  editNameCollection,
};
