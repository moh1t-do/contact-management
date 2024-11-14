import Router, { Request, Response } from 'express';
import contactsRouter from './contact.route';

const router = Router();

// health check
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ health: "ok" });
});

// contacts
router.use('/contacts', contactsRouter);

router.route('/contacts/:id').put((req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    res.send("Hello World");
});

export default router;