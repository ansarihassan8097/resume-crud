'use server';

import { prisma } from '@/PrismaClient/prismaClient';
import { ResumeForm } from './CreateResume';
import { revalidatePath } from 'next/cache';

export async function createResumeAction(values: ResumeForm) {
  const res = await prisma.createResume.create({
    data: {
      ...values,
    },
  });

  revalidatePath('/');

  return res;
}

export async function getResumeAction() {
  const res = await prisma.createResume.findMany();
  return res;
}

export async function searchByNameAction(name: string) {
  const resume = await prisma.createResume.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: name,
          },
        },
        {
          lastName: {
            contains: name,
          },
        },
      ],
    },
  });
  if (!resume) throw new Error('cannot find resume');
  return resume;
}

export async function deleteResumeAction(id: string) {
  const res = await prisma.createResume.delete({
    where: {
      id: id,
    },
  });
  revalidatePath('/');
  return res;
}
