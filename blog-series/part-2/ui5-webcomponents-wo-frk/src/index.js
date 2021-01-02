// @ts-check
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";

const ui5Button = document.querySelector('ui5-button')

ui5Button.addEventListener('click', addData)

async function addData() {
    const response = await fetch('https://services.odata.org/V4/Northwind/Northwind.svc/Products')
    const products = await response.json()

    const table = document.querySelector('ui5-table')
    const template = document.querySelector('#productrow')

    products.value.forEach(product => {
        // @ts-ignore
        const clone = template.content.cloneNode(true)
        const tableCells = clone.querySelectorAll('ui5-table-cell')

        for (const cell of tableCells) {
            cell.innerHTML = product[cell.dataset.attribute]
        }
        table.append(clone)
    });
}


