import { Request, Response } from 'express';

export async function handleCreateContact(req: Request, res: Response) {
    res.json({ message: "Create contact" });
}

export async function handleGetAllContacts(req: Request, res: Response) {
    res.json({ message: "Get all contact" });
}

export async function handleUpdateContact(req: Request, res: Response) {
    res.json({ message: "Update contact" });
}

export async function handleDeleteContact(req: Request, res: Response) {
    res.json({ message: "Delete contact" });
}