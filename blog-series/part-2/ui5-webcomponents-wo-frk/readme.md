# Using UI5 Web Components w/o any framework - Part 2

This is a pure "academic" project to get a better understanding of how to use [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) without any framework such as React, Angular or Vue.
My goal is to create blog series during which we will cover following topics

* [Getting started with UI5 Web Components](https://blogs.sap.com/2020/12/30/using-ui5-web-components-without-any-framework/)
* Enhancing our example using `<template>` tag
* Let´s create a bundle
* I hate todo lists, so we create a shopping list example :wink:
* Additional topics such as i18n, theming and create your own UI5 Web Components

 __WARNING!__
I am using modern JavaScript syntax that might not work with older browsers. Please use a modern browser :wink:

## Enhancing our example from [Part 1](../../part-1/ui5-webcomponents-wo-frk/readme.md)

Welcome back to part 2 of using UI5 Web Components without any framework.
If you might remember in [part 1](https://blogs.sap.com/2020/12/30/using-ui5-web-components-without-any-framework/) we used some DOM manipulation APIs in order to display our table with some data.

![ui5-table-with-data](./images/1-ui5-table-with-data.png)

Well obviously there are more sophisticated solutions available but it's always good to understand the basic concepts.

Before we reach to templating solutions such as [handlebarsjs](https://handlebarsjs.com) or [ejs](https://ejs.co), we go for a little simpler approach. I would like to take the credit of coming up with the idea but the real credit goes to [Peter Muesig](https://github.com/petermuessig) :wink:

So what we want to achieve is to define the complete table structure using HTML tags only. We will use JavaScript only to fill in the data into the table.

## The `<template>` Tag

The html standard provides a way for us to define a content part in our website/webapp that is not rendered/displaid directly. In order to actually display the content defined within our `<template>` tag we will use JavaScript. The benefit of using this approach is that we can be sure that our content is valid. For more details you can continue reading on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

Let's recap on our initial html document. We described ui5 table with table columns only. We did not define any table rows or cells.

```html
<div>
        <ui5-table id="productsTable" no-data-text="No Data" show-no-data>
            <ui5-table-column slot="columns" style="width: 12rem">
                <span style="line-height: 1.4rem">Product</span>
            </ui5-table-column>

            <ui5-table-column slot="columns" min-width="800" popin-text="Supplier">
                <span style="line-height: 1.4rem">Supplier</span>
            </ui5-table-column>
            ...
        </ui5-table>
</div>    
```

Using the `<template>`tag we will now add the table rows and table cells (and ignore why I am using the data-attribute for now).

```html
<template id="productrow">
    <ui5-table-row>
        <ui5-table-cell data-attribute="ProductName"></ui5-table-cell>
        <ui5-table-cell data-attribute="Supplier.CompanyName"></ui5-table-cell>
        <ui5-table-cell data-attribute="QuantityPerUnit"></ui5-table-cell>
        <ui5-table-cell data-attribute="UnitPrice"></ui5-table-cell>
        <ui5-table-cell data-attribute="UnitsInStock"></ui5-table-cell>
    </ui5-table-row>
</template>
```

This looks much nicer compared to how we defined the row in our initial approach.
```js
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
```

So now all the content is described in html but we still have to enable rendering the content within the `<template>` tag.

Because right now our table still looks like this
![ui5-table-without-data](./images/2-ui5-table-without-data.png)


## Create the table rows based on the template

Let's look again at the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

Looking at the sample code there we learn that we have todo the following steps in order to construct each row based on the template.

1. Get the template using your favourite DOM API method of choice (querySelector, getElementById, ...)
2. Create a clone from the template
3. Fill data into the row
4. Append the table row to the table

```js
/** Displays product data in HTML table */
async function addProductDataInTable() {
    const response = await fetch('https://services.odata.org/V4/Northwind/Northwind.svc/Products?$expand=Supplier')
    const products = await response.json()

    const table = document.querySelector('ui5-table')
    const template = document.querySelector('#productrow')

    products.value.forEach(product => {
        const clone = template.content.cloneNode(true)
        const tableCells = clone.querySelectorAll('ui5-table-cell')

        for (const cell of tableCells) {
            const value = getNestedObjectProp(product, cell.dataset.attribute)
            cell.innerHTML = value
        }
        table.append(clone)
    });
}
```

So what is happening in the above code?

Our goal is to show product data in our [UI5 Web Components Table](https://sap.github.io/ui5-webcomponents/playground/components/Table/).
1. We request product data from our beloved [Northwind OData Service](https://services.odata.org/V4/Northwind/Northwind.svc)
2. We get our table and select the template using [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) DOM API method
3. For each product we have to create a row. We use the [forEach](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach) method to iterate over the products.
4. We clone the template using `template.content.cloneNode(true)`
5. The product data must be displaid in the correct table cell. That is why I have used the [data-attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) in the template for each cell.
6. Each cell is mapped to the correct product attribute. The value of the product attribute being displaid in the innerHTML of each cell.
7. Each table row clone is added to the table using [append](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append) method

We register the new function addProductDataInTable to be executed when we click the button.
Et Voilà
![ui5-table-with-odata](./images/3-ui5-table-with-odata.png)

## Summary

Let's quickly summarize what we learned on our little journey with UI5 Web Components using the `<template>` tag
* How the `<template>` works and what we can use it for
* Using the `<template>`tag inside our little UI5 Web Components application
* Filling the table with product data from the Northwind Service

As usual all of this code can be found on [GitHub](https://github.com/christianp86/ui5-webcomponents-pure-js).

In the next blog post we will create a bundle using a bundler such as webpack, snowpack, ... .

Feel free to provide feedback or ask additional questions. Or just leave a like in case you enjoyed reading this blog post.