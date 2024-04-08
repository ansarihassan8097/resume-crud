'use client';

import ResumeCard from '@/components/ResumeCard';
import { ResumeForm } from './create-resume/CreateResume';
import { getResumeAction, searchByNameAction } from './create-resume/actions';
import SearchInput from '@/components/SearchInput';
import { useEffect, useState } from 'react';
import { unstable_noStore } from 'next/cache';

type ResponseData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  latestCompany: string;
  dateOfJoining: Date;
  createdAt: Date;
  updatedAt: Date;
}[];

export default function Home() {
  const [resumes, setResumes] = useState<ResponseData>([]);
  const [searchByName, setSearchByName] = useState('');
  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState<ResponseData>([]);

  useEffect(() => {
    setLoading(true);
    const fetchResumes = async () => {
      const response = await getResumeAction();
      setResumes(response);
      setLoading(false);
    };
    fetchResumes();
  }, []);

  const handleSearch = async () => {
    if (!searchByName) return;

    const response = await searchByNameAction(searchByName);

    setFilteredData(response);
  };

  const filtered =
    filteredData.length > 0 ? filteredData : resumes ? resumes : [];

  if (loading) {
    return <h1 className='text-center'>Loading...</h1>;
  }

  return (
    <div className='container mx-auto flex flex-col gap-6'>
      <div>
        <SearchInput
          searchByName={searchByName}
          handleInputChange={setSearchByName}
          onClick={handleSearch}
        />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {filtered?.map((resume: any) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
}
