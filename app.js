

const appContainer = document.querySelector('#app'); 


async function main() {
    let json = await getData(); 
    console.log(json); 
    let entryOfToday = getEntryOfToday(json); 
    console.log(entryOfToday.length); 
    
    if (entryOfToday.length === 1) {
        if (isOpen(entryOfToday[0])) {
            appContainer.innerHTML = Templates.open(); 
        } else {
            appContainer.innerHTML = Templates.closed( reopenTime(entryOfToday[0]) ); 
        }
    }
    
}


function isOpen(entry) {
    let timeString = new Date().toLocaleTimeString();
    // timeString = "06:12:45"; // !dev-only
    let isClosed = entry.closing_start < timeString && timeString < entry.closing_end; 
    return !isClosed; 
}

function reopenTime(entry) {
    const [heures, minutes, secondes] = entry.closing_end.split(':');
    return `${heures}h${minutes}`;
}


function getEntryOfToday(json) {
    let todayString = new Date().toLocaleDateString(); 
    // todayString = "11/08/2023"; // !dev-only
    let entryOfToday = json.filter(item => {
        return item.date === todayString; 
    })
    return entryOfToday; 
}

async function getData(src = "data.json") {
    let res = await fetch(src); 
    let json = await res.json(); 
    return json; 
}


const Templates = {
    open: () => { return "Le Poly est ouvert !"}, 
    closed: (reopen_time = "ce soir") => { 
        return `❌Le Poly est fermé jusqu'à ${reopen_time}`
    } 
}