$(document).ready(function () {
    $("#userTable").tablesort();
});
moment.locale('pl')
let now = moment('20210417T224614');

const handleDelete = (id) => {
    console.log(id);
}

const renderTableContent = (data) => {
    let rows = data.map(user => {
        let entryTime = moment(user.lastEntry.entryTime).format('DD.MM.YYYY HH:mm')
        let diffrence = now.diff(user.lastEntry.entryTime)
        let inWork = moment.utc(diffrence).format('HH:mm')
        if(diffrence > 43200000) {
            className="error"
        } else {
            className=""
        }

        let tds = `
        <td>${user.name}</td>
        <td>${user.lastEntry.doors}</td>
        <td>${entryTime}</td>
        <td >${inWork}</td>
        <td>
            <button class="ui icon red button" onclick="handleDelete('${user._id}')">
                <i class="icon close"></i>
            </button>
        </td>
        `

        return `<tr class="${className}">${tds}</tr>`
    }).join('')

    return rows;
}

let tableRoot = document.getElementById('root');
document.getElementById('nowTime').innerHTML = moment(now).format('DD.MM.YYYY HH:mm:ss')
tableRoot.innerHTML = renderTableContent(dataJSON);