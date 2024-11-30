
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
