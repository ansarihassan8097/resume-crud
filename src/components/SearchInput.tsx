'use client';

import { Input } from './ui/input';

import { Button } from './ui/button';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  searchByName: string;
  handleInputChange: Dispatch<SetStateAction<string>>;
  onClick: () => void;
};

export default function SearchInput({
  searchByName,
  handleInputChange,
  onClick,
}: Props) {
  return (
    <div className='flex gap-4 items-center'>
      <Input
        placeholder='Search by name or id'
        value={searchByName}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
      />
      <Button onClick={onClick}>Search</Button>
    </div>
  );
}
