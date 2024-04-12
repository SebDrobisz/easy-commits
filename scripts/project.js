async function findProject(path, name) {
    const groupId = await getGroupID(path);

    const requestPathname = `/groups/${groupId}/search`;
    const url = requestURL(requestPathname)
    url.searchParams.set("scope", "projects");
    url.searchParams.set("search", name);

    const request = new Request(url, getInit("GET"));

    const response = await fetch(request);
    const data = await response.json();
    
    if (data.length == 0) {
        throw new Error(`Projet ${name} not found`);
    }
    
    return data[0];
}
