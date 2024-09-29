/* eslint-disable @typescript-eslint/no-var-requires */
const app = require("./App");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
