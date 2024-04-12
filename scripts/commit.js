async function getCommits(projectId, student) {
    let hasNextPage = true;
    let currentPage = 1;
    let retrievedCommits = [];

    while (hasNextPage) { 
        hasNextPage = false;
        const requestPathname = `/projects/${projectId}/repository/commits`;

        const url = requestURL(requestPathname);
        url.searchParams.set("page", currentPage);

        const request = new Request(url, getInit("GET"));

        const response = await fetch(request);

        retrievedCommits = [...retrievedCommits, ...await response.json()];
        
        if (retrievedCommits.length == 0) {
            throw new Error(`${student} -- No commits founded`);
        }

        hasNextPage = currentPage < +(response.headers.get("x-next-page"));
        currentPage += 1;
    }
    
    return retrievedCommits;
}
