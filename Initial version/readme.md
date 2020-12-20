# Using UI5 Webcomponents w/o any framework

This is a pure "academic" project to get a better understanding of how to use [UI5 webcomponents](https://sap.github.io/ui5-webcomponents/) without any framework such as React, Angular or Vue.

## Initial version
This version is something I hacked together during SAP TechEd 2020. I wanted to get a first understanding how ui5 web components can be used.
The [blog post](https://blogs.sap.com/2020/12/02/beyond-sapui5-and-sap-fiori-elements-appendix-to-teched-session-iis114/?source=social-Global-SAPdevs-TWITTER-MarketingCampaign-Developers-Fiori-spr-4273717682&campaigncode=CRM-XB20-MKT-DGEALL) from [Marius Obert](https://github.com/IObert) made me curios but I am not much familiar with react, angular or vue. In 2020 I started re-learning the basic and more advanced concepts of HTML and JS to get a better understanding of web development these days. I am more a hands-on person #HandsOnSAPDev and I get an itch to start building stuff once I understand (or think I understand :wink:) the basic concepts.

What we will do in this first blog is to create simple webapp that will contain a ui5 table and button.
The button will trigger displaying data in our table.

At the end it should look like the table example provided on the official documentation [UI5 Webcomponents table](https://sap.github.io/ui5-webcomponents/playground/components/Table/)

### Get started

So let's get our hands dirty by initializing our project using [npm](https://www.npmjs.com/):
```sh
mkdir ui5-webcomponents-wo-frk
cd ui5-webcomponents-wo-frk
npm init
```

We will create an html and a javascript file to keep things separate. Things meaning describing the content of the webapp and the actual logic.

Before that we should actually know how we can create a ui5 webcomponent. Looking at the [official documentation](https://sap.github.io/ui5-webcomponents/playground/docs/how-to-use/#create) there are two ways to create a ui5 web components instance:
* Using html tags defined by the webcomponent
* Using the js dom api [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

Alright let's do that and create our html file. To speed things up I copied the table from the official documentation :wink: .

Nothing fancy here. We declare a table and create the columns. No table rows or cells yet to actually display any product data.

```html
<html>

<head>
    <title>UI5 Webcomponents w/o Framework</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
    <div>
        <ui5-table id="productsTable" no-data-text="No Data" show-no-data>
            <ui5-table-column slot="columns" style="width: 12rem">
                <span style="line-height: 1.4rem">Product</span>
            </ui5-table-column>

            <ui5-table-column slot="columns" min-width="800" popin-text="Supplier">
                <span style="line-height: 1.4rem">Supplier</span>
            </ui5-table-column>

            <ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin>
                <span style="line-height: 1.4rem">Dimensions</span>
            </ui5-table-column>

            <ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin>
                <span style="line-height: 1.4rem">Weight</span>
            </ui5-table-column>

            <ui5-table-column slot="columns">
                <span style="line-height: 1.4rem">Price</span>
            </ui5-table-column>
        </ui5-table>
    </div>
    <div>
        <ui5-button id="ui5Button" design="Emphasized">Populate data</ui5-button>
    </div>
</body>

</html>
```

Yes we did it! We used the ui5 web components successfully in our html page. Or did we?
Well we are not there yet. Just because there is a tag does not mean the browser knows what to with it.
We have to let the browser know the tag and how what should be rendered (UI5 and fiori style please).

UI5 Webcomponents are delivered as [ES6 Modules](https://www.javascripttutorial.net/es6/es6-modules/). In order to use the modules we actually need to get them.
So we run:
```sh
npm install @ui5/webcomponents
```

Now we have the ui5 webcomponents in the node_modules folder. Great. Hmmm opening the page in your favourite web browser still shows only errors in the console.
What we have to do is that the needed ui5 webcomponents are actually loaded. Looking at the [documentation](https://sap.github.io/ui5-webcomponents/playground/components/Table/) we find the following statements.

```js
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js"; // (for ui5-table-column)
import "@ui5/webcomponents/dist/TableRow.js"; // (for ui5-table-row)
import "@ui5/webcomponents/dist/TableCell.js"; // (for ui5-table-cell) 
```

Perfect know we know what to do but we are still not clear where to put this code.
Reading again this [tutorial](https://www.javascripttutorial.net/es6/es6-modules/) we realize that we have to create a JavaScript file in which we place the import statements.
We want to keep the JavaScript files in a different folder so we create one real quick
```sh
mkdir src
```

We also create a new file index.js and add the import statements in there. Nothing else. In addition we have to load the JavaScript in our html document.
```diff
<body>
<script type="module" src="./index.js"></script>
</body>
```

Finally! We are ready to see our beautiful ui5 table any seconds now...

!ADD IMAGE HERE

WHAAAATTTT? 
## How to run the project

npm run start will start a [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) instance and open index.html in your browser.
[Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) is added as dev dependency only.

```bash
git clone
cd "initial version"
npm install
npm run start
```