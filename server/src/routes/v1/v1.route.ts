import Router, { Request, Response } from 'express';
import contactsRouter from './contact.route';

const router = Router();

// health check
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ health: "ok" });
});

// contacts
router.use('/contacts', contactsRouter);

export default router;