'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { createResumeAction } from './actions';
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
  firstName: z.string().min(4, { message: 'Too short' }),
  lastName: z.string().min(4, { message: 'Too short' }),
  email: z.string().email({
    message: 'Invalid email',
  }),

  latestCompany: z.string().min(4),
  dateOfJoining: z.date(),
});

export type ResumeForm = z.infer<typeof formSchema>;

export default function CreateResume() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      latestCompany: '',
      dateOfJoining: new Date(),
    },
  });

  const router = useRouter();

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = async (data: FormValues) => {
    await createResumeAction(data);
    form.reset();
    router.push('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input placeholder='Enter First Name' {...field} />
              </FormControl>
              <FormDescription>This is your public First name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LastName</FormLabel>
              <FormControl>
                <Input placeholder='Enter Last Name' {...field} />
              </FormControl>
              <FormDescription>This is your public Last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter Email' {...field} />
              </FormControl>
              <FormDescription>This is your public email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='latestCompany'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter Company' {...field} />
              </FormControl>
              <FormDescription>This is your public expirence.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dateOfJoining'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Joining</FormLabel>
              <FormControl>
                <Input type='date' {...field.onChange} />
              </FormControl>
              <FormDescription>
                This is your public date of joining.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
