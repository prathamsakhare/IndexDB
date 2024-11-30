

// Object stores are the data storage of IndexedDB. It is where data is stored. A database may have multiple object stores. Think of them as tables in RDBMS where we store data based on the type of data we want to store.

let request = indexedDB.open("recordsDB", 1)

request.onupgradeneeded = function(){
    let db = request.result
    if(!db.objectStoreNames.contains("records")){
        db.createObjectStore('records', {keyPath : "id"})
    }
}

request.onerror = function(){
    console.log("Unable to access database : ", request.error)
}

request.onsuccess = function(){
    let db = request.result

    
}
