import Dexie from "dexie";

const database = new Dexie("database");
database.version(1).stores({
  coldata: "++id, idcol, dataid, data",
  col: "++id, name",
});

export const col = database.table("col");
export const coldata = database.table("coldata");

export default database;
