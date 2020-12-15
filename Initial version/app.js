import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";

let products = []

fetch("./data/products.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        products = data
    });

function importData() {
    const table = document.getElementById('table')

    products.forEach(product => {
        const tableRow = document.createElement('ui5-table-row')

        for (const [key, value] of Object.entries(product)) {
            const tableCell = document.createElement('ui5-table-cell')
            tableCell.innerHTML = value
            tableRow.appendChild(tableCell)
        }
        table.appendChild(tableRow)
    });
}

const ui5Button = document.getElementById('ui5Button')
ui5Button.addEventListener('click', importData)