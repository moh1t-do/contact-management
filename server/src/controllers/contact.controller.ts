import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const contactSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Invalid phone number"),
    company: z.string().min(1, "Company is required"),
    jobTitle: z.string().min(1, "Job Title is required"),
});

const contactUpdateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    jobTitle: z.string().optional()
});

export async function handleCreateContact(req: Request, res: Response) {
    try {
        const contactData = contactSchema.parse(req.body);
        const newContact = await prisma.contact.create({
            data: contactData
        });
        res.status(201).json({
            message: "Contact created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error
        });
    }
}

export async function handleGetAllContacts(req: Request, res: Response) {
    try {
        const contacts = await prisma.contact.findMany();
        if (contacts.length == 0) {
            res.status(404).json({ message: "No contacts found" });
        }
        else {
            res.status(200).json({
                contacts
            });
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({
            error
        })
    }
}

export async function handleUpdateContact(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const contactData = contactUpdateSchema.parse(req.body);
        await prisma.contact.update({
            where: {
                id: id
            },
            data: contactData
        });
        res.status(200).json({
            message: "Contact updated successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            error
        });
    }
}

export async function handleDeleteContact(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    try {
        await prisma.contact.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: "Contact deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error
        });
    }
}