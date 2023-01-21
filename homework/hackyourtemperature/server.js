/*eslint-env node*/

//import exphbs from 'express-handlebars';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
