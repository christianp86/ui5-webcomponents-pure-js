// @ts-check
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";

const ui5Button = document.querySelector('ui5-button')

ui5Button.addEventListener('click', addData)

async function addData() {
    const response = await fetch('./data/products.json')
    const products = await response.json()

    const table = document.querySelector('ui5-table')

    products.forEach(product => {
        const tableRow = document.createElement('ui5-table-row')

        // @ts-ignore
        for (const [key, value] of Object.entries(product)) {
            const tableCell = document.createElement('ui5-table-cell')
            tableCell.innerHTML = value
            tableRow.append(tableCell)
        }
        table.appendChild(tableRow)
    });
}


