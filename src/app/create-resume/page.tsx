import CreateResume from './CreateResume';

export default function Create() {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <h1 className='text-center font-bold text-2xl text-gray-600'>
        Create Resume
      </h1>
      <div className='container max-w-4xl p-4  rounded-lg shadow-lg'>
        <CreateResume />
      </div>
    </div>
  );
}
