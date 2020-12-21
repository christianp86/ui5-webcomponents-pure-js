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
    
</body>

</html>
```

Yes we did it! We used the ui5 web components successfully in our html page. Or did we?
![where-is-my-ui5-table](./images/1%20where%20is%20my%20ui5%20table.png)

Well we are not there yet. Just because there is a tag does not mean the browser knows what to with it.
We have to let the browser know the tag and how what should be rendered (UI5 and fiori style please).

UI5 Webcomponents are delivered as [ES6 Modules](https://www.javascripttutorial.net/es6/es6-modules/). In order to use the modules we actually need to get them.
So we run:
```sh
npm install @ui5/webcomponents
```

Now we have the ui5 webcomponents in the node_modules folder. Great. Hmmm opening the page in your favourite web browser still shows only errors in the console.
!ADD IMAGE HERE
What we have to do is that the needed ui5 webcomponents are actually loaded. Looking at the [documentation](https://sap.github.io/ui5-webcomponents/playground/components/Table/) we find the following statements.

```js
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
```

Perfect now we know what to do but we are still not clear where to put this code.
Reading again this [tutorial](https://www.javascripttutorial.net/es6/es6-modules/) we realize that we have to create a JavaScript file in which we place the import statements.
We want to keep the JavaScript files in a different folder so we create one real quick
```sh
mkdir src
```

We also create a new file index.js and add the import statements in there. Nothing else. In addition we have to load the JavaScript in our html document.
```html
<body>
...
</table>
<script type="module" src="./src/index.js"></script>
</body>
```

Finally! We are ready to see our beautiful ui5 table any seconds now...

![where-is-my-ui5-table](./images/2-where-is-my-ui5-table.png)

WHAAAATTTT?

This error tells us we can't just load js files who are importing ES6 modules when simply opening the html file in a browser.
So I guess we need a local web server to run our ui5 webcomponents app. NPM to the rescue!
At the time of hacking this stuff together I was looking how to get easy to use webserver which supports ES6 modules. The one I used previously in non openUI5 projects did not work (or I would have to do some config stuff which I did not want to mess around with).

There a many options to choose from but I found the [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) and it worked out of the box. That's all I wanted :relaxed: for now.

To use t we will install it as a dev dependency
```sh
npm i --save-dev @web/dev-server
```

Let's the package.json and add an npm command to start the server
```json
...
"scripts": {
    "start": "wds --node-resolve --watch --open"
  },
...
```

Now all that's left todo is to run the command and see the "magic happen" :satisfied:
```sh
npm run start
```

![there-is-my-ui5-table](./images/3-there-is-my-ui5-table.png)

Jippie we finally see our empty table :wink: . It seems like a bit of effort but once you got the basics setup you are prepared for implementing the real thing.
And we already learned a lot on our little journey
 * How to install ui5 webcomponents
 * Getting additional information from UI5 webcomponents documentation
 * How to import the ES6 modules in JavaScript
 * How to load JavaScript files in HTML when ES6 modules are used
 * How to serve a webapp with ES6 modules using a local dev server

 Not too bad I would say. We will continue this journey in the next blog post where we will finally add some data the table :sparkles:.

 If you can't wait for my next blog post just visit the [GitHub Repository](https://github.com/christianp86/ui5-webcomponents-pure-js)

 P.S. This is my first every blog post on the SAP community. Feel free to provide feedback via the comments. Or just like it in case you enjoyed reading.