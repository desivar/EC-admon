const testRoutes = require('./routes/testRoutes.js');
console.log('Type of testRoutes:', typeof testRoutes);
console.log('testRoutes object:', testRoutes);
app.use('/api/test', testRoutes);
