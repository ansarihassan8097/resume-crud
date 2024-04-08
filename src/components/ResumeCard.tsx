'use client';

import { deleteResumeAction } from '@/app/create-resume/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { MdOutlineAutoDelete } from 'react-icons/md';

export default function ResumeCard({ resume }: { resume: any }) {
  const handleDelete = async (id: string) => {
    await deleteResumeAction(id);
  };
  return (
    <Card className='bg-white shadow-md rounded-lg flex flex-col justify-between cursor-pointer hover:scale-105 transition duration-150 ease-out hover:ease-in'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>
            {resume.firstName} - {resume.lastName}
          </CardTitle>
          <div
            className='text-2xl'
            onClick={() => {
              handleDelete(resume.id);
            }}
          >
            <MdOutlineAutoDelete />
          </div>
        </div>
        <CardDescription>{resume.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{resume.latestCompany}</p>
      </CardContent>
      <CardFooter>
        <p>{new Date(resume.dateOfJoining).toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
}
