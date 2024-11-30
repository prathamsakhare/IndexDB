//++++++++++++++++++++++++++++++++++++++++++++++++++
// Setting The Instance For IndexDB 
//++++++++++++++++++++++++++++++++++++++++++++++++++
var indexedDB = window.indexedDB
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA OBJECT
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
const recordsData = [
    { id: 1, name: "abc", category: "adhar", task : "Name Change	", desc : "", amt : "", date :  "29/11/2024", time : "11.20"},
    { id: 2, name: "xyz", category: "adhar", task : "Name Change	", desc : "", amt : "", date :  "29/11/2024", time : "11.20"},
    { id: 3, name: "lmn", category: "pan", task : "Name Change	", desc : "", amt : "", date :  "29/11/2024", time : "11.20"},
    { id: 4, name: "efg", category: "pan", task : "Name Change	", desc : "", amt : "", date :  "29/11/2024", time : "11.20"},
    
];
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//Creating The DB 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
const request = window.indexedDB.open("CscRecords", 1);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//Error On Creation Of The DB or Some Other Kind Of Error 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
request.onerror = (error) => {
    console('"Why didnt you allow my web app to use IndexedDB?', error);
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//When you create a new database or increase the version number of an existing database.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
request.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface
    const db = event.target.result;
    // Create an objectStore for this database
    const objectStore = db.createObjectStore("records", { keyPath: "id" });
    objectStore.createIndex("nameIndex", "name", { unique: false });
    objectStore.createIndex("categoryIndex", "category", { unique: false });


};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//On Success
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
request.onsuccess = (event) => {
    //DB Instance
    db = event.target.result;
    //+++++++++++++++++++++++++++++++++++++
    //Create
    //+++++++++++++++++++++++++++++++++++++
    const recordsObjectStore = db.transaction("records", "readwrite").objectStore("records");
    recordsData.forEach((record) => {
        //console.log(bike);
        recordsObjectStore.add(record);
    });
    //+++++++++++++++++++++++++++++++++++++
    //Geeting The Data
    //+++++++++++++++++++++++++++++++++++++
    const transaction = db.transaction(["records"]);
    const store = transaction.objectStore("records");
    const nameIndex = store.index("nameIndex");
    const categoryIndex = store.index("categoryIndex");
    //+++++++++++++++++++++++++++++++++++++
    //Query-1
    //+++++++++++++++++++++++++++++++++++++
    const idQuery = store.get(4);
    const nameQuery = nameIndex.getAll("efg");
    const makeQuery = categoryIndex.get("1000RR");

    idQuery.onerror = (event) => {
        // Handle errors!
    };
    idQuery.onsuccess = (event) => {
        console.log(idQuery.result);
    };

    nameQuery.onerror = (event) => {
        // Handle errors!
    };
    nameQuery.onsuccess = (event) => {
        console.log(nameQuery.result);
    };

    makeQuery.onerror = (event) => {
        // Handle errors!
    };
    makeQuery.onsuccess = (event) => {
        console.log(makeQuery.result);
    };
    //+++++++++++++++++++++++++++++++++++++
    //Query-2
    //+++++++++++++++++++++++++++++++++++++
    db.transaction("records").objectStore("records").get(1).onsuccess = (event) => {
        console.log(event.target.result);
    };
    //+++++++++++++++++++++++++++++++++++++
    //Update
    //+++++++++++++++++++++++++++++++++++++
    const objectStoreUpdate = db.transaction(["records"], "readwrite").objectStore("records");
    const requestMainUpdate = objectStoreUpdate.get(4);
    requestMainUpdate.onerror = (event) => {
        // Handle errors!
    };
    requestMainUpdate.onsuccess = (event) => {
        // Get the old value that we want to update
        console.log(event)
        const data = event.target.result;

        console.log("data : ", data)
        // update the value(s) in the object that you want to change
        data.name = 'Royal Enfield';
        // Put this updated object back into the database.
        const requestUpdate = objectStoreUpdate.put(data);
        requestUpdate.onerror = (event) => {
            console.log('Data Has Not Been Updated');
        };
        requestUpdate.onsuccess = (event) => {
            console.log('Data Has Been Updated');
        };
    };
    //+++++++++++++++++++++++++++++++++++++
    //Delet Query
    //+++++++++++++++++++++++++++++++++++++
    const request = db.transaction(["records"], "readwrite").objectStore("records").delete(1);
    request.onsuccess = (event) => {
        console.log('Data Deleted!!!!!!!!!');
    };
    // transaction.oncomplete = function () {
    //     db.close();
    // }

};