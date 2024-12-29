import authRoutes from './auth';
import insertRouter from './insert';

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/insert', insertRouter);

    return app.use('/', (req, res) => {
        res.send('Server on ...');
    })
}

export default initRoutes;