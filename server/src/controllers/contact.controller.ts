import e, { NextFunction, Request, Response } from 'express';
import { Prisma, PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const contactCreateSchema = z.object({
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

export async function handleCreateContact(req: Request, res: Response, next: NextFunction) {
    try {
        const contactData = contactCreateSchema.parse(req.body);
        await prisma.contact.create({
            data: contactData
        });
        res.status(201).json({
            message: "Contact created successfully"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).json({
                    message: `Account already exists`
                });
            }
            else if (error.code === 'P2025') {
                res.status(400).json({
                    message: `${error.meta?.cause}`
                })
            }
        }
        else if (error instanceof ZodError) {
            res.status(400).json({
                message: error.errors[0].message
            });
        }
        else {
            res.sendStatus(500);
        }
    }
}


export async function handleGetAllContacts(req: Request, res: Response) {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    try {
        const contacts = await prisma.contact.findMany({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
        });

        const totalContacts = await prisma.contact.count();

        res.status(200).json({
            contacts,
            totalContacts
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).json({
                    message: `Account already exists`
                });
            }
            else if (error.code === 'P2025') {
                res.status(400).json({
                    message: `${error.meta?.cause}`
                })
            }
        }
        else if (error instanceof ZodError) {
            res.status(400).json({
                message: error.errors[0].message
            });
        }
        else {
            res.sendStatus(500);
        }
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).json({
                    message: `Account already exists`
                });
            }
            else if (error.code === 'P2025') {
                res.status(400).json({
                    message: `${error.meta?.cause}`
                })
            }
        }
        else if (error instanceof ZodError) {
            res.status(400).json({
                message: error.errors[0].message
            });
        }
        else {
            res.sendStatus(500);
        }
    }
}

export async function handleDeleteContact(req: Request, res: Response) {
    const { id } = req.params;
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).json({
                    message: `Account already exists`
                });
            }
            else if (error.code === 'P2025') {
                res.status(400).json({
                    message: `${error.meta?.cause}`
                })
            }
        }
        else if (error instanceof ZodError) {
            res.status(400).json({
                message: error.errors[0].message
            });
        }
        else {
            res.sendStatus(500);
        }
    }
}