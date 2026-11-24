const sumRequestHandler = (req, res) => {
  console.log("In sum request handler", req.url);

  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody);
    const bodyObject = Object.fromEntries(params);
    const result = Number(bodyObject.num1) + Number(bodyObject.num2);
    console.log("Result of sum:", result);
    res.write(`
      <html lang="en">
        <head>
          <title>Calculator practice set</title>
        </head>
        <body>
          <h1>Sum of numbers is: ${result}</h1>
        </body>
      </html>`);
    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;
