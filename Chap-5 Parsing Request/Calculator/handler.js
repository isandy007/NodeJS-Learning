const { sumRequestHandler } = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html lang="en">
        <head>
          <title>Calculator practice set</title>
        </head>
        <body>
          <h1>Welcome to Calculator</h1>
          <a href="/calculator"> Go to the Calculator</a>
        </body>
      </html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html lang="en">
        <head>
          <title>Calculator practice set</title>
        </head>
        <body>
          <h1>Here is the Calculator</h1>
          <form action="/calculate-result" method="POST">
            <input type="text" name="num1" placeholder="Enter first number" />
            <input type="text" name="num2" placeholder="Enter second number" />
            <button type="submit">Sum</button>
          </form>
        </body>
      </html>`);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }

  res.write(`
      <html lang="en">
        <head>
          <title>Calculator practice set</title>
        </head>
        <body>
          <h1>404 page does not exist</h1>
          <a href="/"> Go to Home</a>
        </body>
      </html>`);
  return res.end();
};
exports.requestHandler = requestHandler;
