const fs = require("fs");

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Request and response</title></head>");
    res.write("<body><h1> Enter your details bellow</h1>");
    res.write('<form action="/submit-user-data" method="POST">');
    res.write(
      '<input type="text" name="username" placeholder="Enter your name"> <br>',
    );
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name= "gender" value="male" />');
    res.write('<label for="female">Female</label>');
    res.write(
      '<input type="radio" id="female" name= "gender" value="female" /> <br>',
    );
    res.write('<input type="submit" value="submit"/>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-user-data" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      fs.writeFile("user.text", JSON.stringify(bodyObject), (err) => {
        console.log("data written to file");
      });
      res.statusCode = 302;
      res.setHeader("Location", "/");
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Request and response</title></head>");
    res.write("<body><h1> Request and response from server</h1></body>");
    res.write("</html>");
    res.end();
  }
};

module.exports = userRequestHandler;
