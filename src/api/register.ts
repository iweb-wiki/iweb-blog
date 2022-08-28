import { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { signToken } from "@/utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
	console.log("🚀 ~ file: register.ts ~ line 8 ~ req", req.body)
	switch (req.method) {
		case 'POST':
			try {
				const prisma = new PrismaClient();
				const user = await prisma.user.create({
					data: {
						email: req.body.email,
						passwordHash: bcrypt.hashSync(req.body.password, 8),
						name: req.body.name,
						avatarUrl: req.body.avatarUrl
					}
				});
				res.status(201)
					.setCookie('token', await signToken(user.id))
					.json({ ...user, passwordHash: undefined })
				await prisma.$disconnect()
			} catch (e: any) {
				console.log("🚀 ~ file: register.ts ~ line 24 ~ e", e)
				res.status(500).json({
					result: false,
					message: typeof e.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase() : e
				})
			}
			break;
		default:
			res.status(405).json({ error: 'Method not allowed' })
	}
}