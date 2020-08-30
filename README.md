# reactTestClient
### React Client FrontEnd for Testing

Start serving the Client through;
```bash
npm run start
```

This will serve the Client at `localhost:8079`

#### Client React Versions
The Client React Code may be served in one of three ways based
on an optional query parameter, `react`;

1. `localhost:8079/?react=jsx`
We use the `src/jsx/index.jsx` React Code,
where we use the included [Babel CDN](https://unpkg.com/babel-standalone@6/babel.min.js)
to transpile the JSX code on page load.

2. `localhost:8079/?react=babel`
We run the _Babel_ on the `src/jsx` directory to output corresponding transpiled JS files
to the `src/dist` directory;  
`npm run babel`  
We then use the `src/dist/index.js` transpiled JS Code
 
3. `localhost:8079/?react=js`
We use the `src/js/index.js` React Code, written with simple JS.
