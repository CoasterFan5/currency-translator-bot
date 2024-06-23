import { createRequire } from "node:module";
// https://github.com/prisma/prisma/issues/5030#issuecomment-1398076317
import type { PrismaClient as ImportedPrismaClient } from "@prisma/client";

const require = createRequire(import.meta.url ?? __filename);

const { PrismaClient: RequiredPrismaClient } = require("@prisma/client");

const _PrismaClient: typeof ImportedPrismaClient = RequiredPrismaClient;

export class PrismaClient extends _PrismaClient {}

export const prisma = new PrismaClient();
