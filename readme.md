# Using UI5 Webcomponents w/o any framework

This is a pure "academic" project to get a better understanding of how to use [UI5 webcomponents](https://sap.github.io/ui5-webcomponents/) without any framework such as React, Angular or Vue.

Currently I have the following versions
| Folder                                     | Content description                                                                                     |
|--------------------------------------------|---------------------------------------------------------------------------------------------------------|
| [Blog Series](blog-series/)                | Blog content for [SCN](https://community.sap.com/)
| [Initial Version](Initial%20version/)      | First try getting things working. Mix of HTML tags and JavaScript. Declaration and logic mixed up in JS |
| [HTML Template](html%20template%20version/)| Use template tag to define row and cells in HTML. JS only contains logic. Kudos to [Peter Müssig](https://github.com/petermuessig)|
| [HTML Template with WebPack](html%20template%20with%20%20webpack)| Bundle html template version with [Webpack](https://github.com/webpack)|


## How to run the project(s)

```sh
git clone
cd FOLDER
npm install
npm run start
```

npm run start will start a [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) instance and open index.html in your browser.
[Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) is added as dev dependency only.

## Next steps

I will further explore ui5 webcomponents and create blog posts on [SCN](https://community.sap.com/)

## Built with

 - [UI5 Webcomponents](https://sap.github.io/ui5-webcomponents/)
 - [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/)
 - [Webpack](https://webpack.js.org/)

## Contribution

Feel free to ask questions on SCN or provide PRs. Any kind of contribution is welcome :blue_heart: