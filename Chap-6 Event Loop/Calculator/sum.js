const sumRequestHandler = (req, res) => {
  console.log("1. In sum request handler", req.url);

  const body = [];
  let result;
  req.on("data", (chunk) => {
    body.push(chunk);
    console.log("2. chunk came");
  });
  req.on("end", () => {
    console.log("3. end event came");
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody);
    const bodyObject = Object.fromEntries(params);
    const result = Number(bodyObject.num1) + Number(bodyObject.num2);
    console.log("Result of sum:", result);
  });
  console.log("4. Sending the response");
  res.setHeader("Content-Type", "text/html");
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
};

exports.sumRequestHandler = sumRequestHandler;
