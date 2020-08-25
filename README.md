For traceroute
https://www.npmjs.com/package/nodejs-traceroute

yarn add react-lighthouse-viewer

```js
import React from "react";
import { render } from "react-dom";
import ReportViewer from "react-lighthouse-viewer";

import jsonReport from "./report.json";

const App = () => <ReportViewer json={jsonReport} />;
render(<App />, document.getElementById("root"));
```
