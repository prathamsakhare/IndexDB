
let request = indexedDB.open("recordsDB", 1)

request.onupgradeneeded = function(){

}

request.onerror = function(){
    console.log("Unable to access database : ", request.error)
}

request.onsuccess = function(){
    let db = request.result
}
