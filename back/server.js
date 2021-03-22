const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}/ 서버 실행 중!`);
});
