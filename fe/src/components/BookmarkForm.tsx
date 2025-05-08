import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import z from 'zod';

type Props = {
  onAddBookmark: (NewBookmark: boolean) => void;
};

const formSchema = z.object({
  title: z.string().max(20).min(3),
  url: z.string().url().max(255),
  tag: z.string().max(255).min(2),
});
type FormFields = z.infer<typeof formSchema>;

const BookmarkForm: React.FC<Props> = ({ onAddBookmark }): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await new Promise((resolve) => {
        axios.post('/api/bookmarks', formData, config).then((response) => resolve(response.data));
      });
      console.log(data);
      onAddBookmark(true);
    } catch (error) {
      setError('root', {
        message: 'Invalid Bookmark',
      });
    }
  };

  return (
    <>
      <h2>Input Values</h2>
      <div>
        <form className="bookmark-form" onSubmit={handleSubmit(onSubmit)}>
          <input {...register('title')} type="text" name="title" maxLength={120} placeholder="Title" />
          <br />
          {errors.title && <div className="text-red-500">{errors.title.message}</div>}
          <input {...register('url')} type="text" name="url" placeholder="Url" className='mt-2' />
          <br />
          {errors.url && <div className="text-red-500">{errors.url.message}</div>}
          <input {...register('tag')} type="text" name="tag" placeholder="Tag" className='mt-2' />
          <br />
          {errors.tag && <div className="text-red-500">{errors.tag.message}</div>}
          <button disabled={isSubmitting} type="submit" className='mt-4'>
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
          {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        </form>
      </div>
    </>
  );
};

export default BookmarkForm;
