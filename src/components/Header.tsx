import Link from 'next/link';
import { Button } from './ui/button';
import { IoAdd } from 'react-icons/io5';

export default function Header() {
  return (
    <div className='flex justify-between'>
      <h1
        className='text-lg font-semibold
      text-slate-100'
      >
        Resume App
      </h1>
      <Button asChild>
        <Link href='/create-resume'>
          <IoAdd className='mr-2 text-xl' />
          Create Resume
        </Link>
      </Button>
    </div>
  );
}
