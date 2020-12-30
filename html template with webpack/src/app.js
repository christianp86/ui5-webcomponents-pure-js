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
    const template = document.querySelector('#productrow')

    products.forEach(product => {
        const clone = template.content.cloneNode(true)
        const tableCells = clone.querySelectorAll('ui5-table-cell')
        let counter = 0
        for (const [key, value] of Object.entries(product)) {
            tableCells[counter].innerHTML = value
            counter++
        }
        table.appendChild(clone)
    });
}

const ui5Button = document.getElementById('ui5Button')
ui5Button.addEventListener('click', importData)