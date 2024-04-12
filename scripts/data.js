let data;

async function fetchPAE() {
    const requestPathname = '/projects/41281/repository/files/pae.json/raw';
    const url = requestURL(requestPathname);

    const request = new Request(url, getInit('GET'));
    const response = await fetch(request);

    if (!response.ok && response.status === 401) {
        throw new Error("Unauthorized");
    }

    return await response.json();
}

function getMatricules(ue, group=undefined) {
    return data
        .filter(d => 
            (d[0] == ue)
                && (group ? d[1] === group : true))  
        .map(d => d[2]);
}

function ues() {
    return new Set(data.map(d => d[0]));
}

function ueGroups(ue) {
    return new Set(data.filter(d => d[0] == ue).map(d => d[1]))
}

// const students = [
//     "62371",
//     "62294",
//     "63020"
// ];
