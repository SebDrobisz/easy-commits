async function searchGroup(name) {
    //console.log(`Recherche du groupe : ${name}`);
    let hasNextPage=true;
    let currentPage= 1;

    // Question : Est-ce qu'un id peut être rétribué ; est-ce qu'il y a un autoincrement ?
    // Si oui, un tri est suffisant pour retrouver un groupe parent. Inutile de rechercher toutes les pages
    while (hasNextPage) { 
        hasNextPage = false;
        const requestPathname = `/groups`;
        const url = requestURL(requestPathname);
        url.searchParams.set("search", name);
        url.searchParams.set("order_by", "id");
        url.searchParams.set("page", currentPage);

        const request = new Request(url, getInit('GET'));
        const response = await fetch(request);
        
        if (!response.ok && response.status === 401) {
            throw new Error("Unauthorized");
        }

        const data = await response.json();
        const group = data.find(e => e.full_path == name);

        if (group) {
            return group;
        }

        hasNextPage = currentPage < +(response.headers.get("x-total-pages"));
        currentPage++
    }
    
    throw new Error("Group not found");
}

async function getGroupID(name) {
    return (await searchGroup(name)).id;
}