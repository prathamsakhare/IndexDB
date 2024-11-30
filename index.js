function Geeks() {
//   var request = window.indexedDB.open("newDatabase", 1);
  var DBDeleteReq = window.indexedDB.deleteDatabase("recordsDB");
  DBDeleteReq.onsuccess = function (event) {
    console.log("Database deleted successfully");
  };
  console.log(DBDeleteReq);
  console.log(window.indexedDB.databases());
}
