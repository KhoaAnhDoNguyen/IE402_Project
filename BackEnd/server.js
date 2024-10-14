// Import các module cần thiết
const express = require('express');
const app = express();
const port = 3000; 

// Định nghĩa route mặc định (root)
app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

// Bắt đầu server và lắng nghe trên cổng
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
