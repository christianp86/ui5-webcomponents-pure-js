// @ts-check
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";

const ui5Button = document.querySelector('ui5-button')

ui5Button.addEventListener('click', addProductDataInTable)

/** Displays product data in HTML table */
async function addProductDataInTable() {
    const response = await fetch('https://services.odata.org/V4/Northwind/Northwind.svc/Products?$expand=Supplier')
    const products = await response.json()

    const table = document.querySelector('ui5-table')
    const template = document.querySelector('#productrow')

    products.value.forEach(product => {
        // @ts-ignore
        const clone = template.content.cloneNode(true)
        const tableCells = clone.querySelectorAll('ui5-table-cell')

        for (const cell of tableCells) {
            const value = getNestedObjectProp(product, cell.dataset.attribute)
            cell.innerHTML = value
        }
        table.append(clone)
    });
}

/**
 * Returns any property within a nested object
 * @param {Object} object - An object with nested properties
 * @param {string} path - Path to property in . notation e.g. 'foo', 'foo.bar', 'foo.bar.baz',...
 */
const getNestedObjectProp = (object, path) => {
    const pathArr = path.split('.')
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, object);
}


