import app from './index';

const PORT = parseInt(process.env.PORT ?? '8080');

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
