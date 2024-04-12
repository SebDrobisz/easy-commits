function getProjectName(matricule) {
    return `web2-${matricule}-projet`;
}

const groupSelectEl = document.querySelector("#group-select");
const ueSelectEl = document.querySelector("#ue-select");
// groupSelectEl.addEventListener("change", () => {
//     console.log(groupSelectEl.value);
// });

function loadPae() {
    fetchPAE().then(d => {
        data = d.pae;
        ues().forEach(ue => {
            const groups = ueGroups(ue);

            const optionUEEl = document.createElement("option");
            optionUEEl.textContent = ue;
            optionUEEl.setAttribute('value', ue);
            ueSelectEl.appendChild(optionUEEl);

            groups.forEach((group) => {
                const optionEl = document.createElement("option");
                optionEl.textContent = group;
                optionEl.setAttribute('value', group);
                groupSelectEl.appendChild(optionEl);
            });
        });
    });
}

const loadBtnEl = document.querySelector("#load-btn");
loadBtnEl.addEventListener("click", () => {
    document.querySelector("#resume-table>tbody").textContent = '';
    const ue = ueSelectEl.value;
    const group = groupSelectEl.value;
    
    const students = getMatricules(ue, group);

    students.forEach(e => {
        const projectName = `web2-${e}-projet`;
        findProject("2023-2024/web2/projet", projectName)
            .then(p => {
                if (!p) {
                    console.log(`projet ${projectName} n'a pas été trouvé`);
                } else {
                    getCommitsData(p.id, e);
                }
            })
        
    });
});

const tableEl = document.querySelector("tbody");
const template = document.querySelector("#template-row");
let index = 1;

function getCommitsData(projectId, student) {
    getCommits(projectId, student)
        .then(commits => addData(student, commits));
}

function addData(student, commits) {
    const {committed_date, title} = commits[0];
    const date = new Date(committed_date)
        .toLocaleString('fr-BE', { });

    aRow = template.content.cloneNode(true);
    aRow.querySelector(".index").textContent = index++;
    aRow.querySelector(".student").textContent = student;
    aRow.querySelector(".nbCommits").textContent = commits.length;
    aRow.querySelector(".date").textContent = date;
    aRow.querySelector(".title").textContent = title;
    aRow.querySelector(".title").setAttribute("href", commits[0].web_url);
    tableEl.appendChild(aRow);
}


// token

document.querySelector("#token-input").addEventListener("focusout", () => {
    getToken();

    loadPae();
});

function initTokenInput() {
    if ("token" in localStorage) {
        tokenElement().value = localStorage.getItem("token");
    }
    tokenElement().addEventListener("focusout", () => {
        localStorage.setItem("token", tokenElement().value);
    });
}

initTokenInput();