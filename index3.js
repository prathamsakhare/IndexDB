//++++++++++++++++++++++++++++++++++++++++++++++++++
// Setting The Instance For IndexDB 
//++++++++++++++++++++++++++++++++++++++++++++++++++
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA OBJECT
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
const records = [
    { id: 1, name: "ABC", mobile: "+91 9876543210", category: "Adhar", task : "Name Change", description : "Adhar Update : Name Change", amount : 200, date : "07/11/2024", time : "11:39" },
];
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//Creating The DB 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
const request = window.indexedDB.open("recordsDB", 1);
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
    const objectStore = db.createObjectStore("bikes", { keyPath: "id" });
    objectStore.createIndex("nameIndex", "name", { unique: false });
    objectStore.createIndex("modelIndex", "model", { unique: false });
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
    const recordStore = db.transaction("bikes", "readwrite").objectStore("bikes");
    records.forEach((record) => {
        //console.log(record);
        recordStore.add(record);
    });
    //+++++++++++++++++++++++++++++++++++++
    //Getting The Data
    //+++++++++++++++++++++++++++++++++++++
    const transaction = db.transaction(["bikes"]);
    const store = transaction.objectStore("bikes");
    const nameIndex = store.index("nameIndex");
    const modelIndex = store.index("modelIndex");
    //+++++++++++++++++++++++++++++++++++++
    //Query-1
    //+++++++++++++++++++++++++++++++++++++
    const idQuery = store.get(4);
    const nameQuery = nameIndex.getAll("Kawasaki");
    const makeQuery = modelIndex.get("1000RR");

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
    db.transaction("bikes").objectStore("bikes").get(1).onsuccess = (event) => {
        console.log(event.target.result);
    };
    //+++++++++++++++++++++++++++++++++++++
    //Update
    //+++++++++++++++++++++++++++++++++++++
    const objectStoreUpdate = db.transaction(["bikes"], "readwrite").objectStore("bikes");
    const requestMainUpdate = objectStoreUpdate.get(4);
    requestMainUpdate.onerror = (event) => {
        // Handle errors!
        console.log("error : ", event.target)
    };
    requestMainUpdate.onsuccess = (event) => {
        // Get the old value that we want to update
        const data = event.target.result;
        // update the value(s) in the object that you want to change
        data.name = 'Chapri KTM';
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
    const request = db.transaction(["bikes"], "readwrite").objectStore("bikes").delete(1);
    request.onsuccess = (event) => {
        console.log('Data Deleted!!!!!!!!!');
    };
    transaction.oncomplete = function () {
        db.close();
    }

};