import { useEffect, useState } from 'react';
import './App.css';
import BookmarkForm from './components/BookmarkForm.tsx';
import BookmarkTable from './components/BookmarkTable.tsx';
import TagDropdown from './components/TagDropdown.tsx';
import { Bookmark } from './types/Bookmark.ts';
import axios from 'axios';
import { Tag } from './types/Tag.ts';

function App(): JSX.Element {
  const [bookmarks, setbookmarks] = useState<Bookmark[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTag, setSelectedTag] = useState<string>('');

  const handleAddBookmark = (newBookmark: boolean) => {
    fetchBookmarks(selectedTag);
  };

  const handleOnSelectTag = (Tag: string) => {
    setSelectedTag(Tag)
    fetchBookmarks(Tag);
  };


  // Fetch data from API
  const fetchBookmarks = async (Tag:string) => {    
    try {
      const res = await axios.get<Bookmark[]>('/api/bookmarks?tag='+Tag);
      setbookmarks(res.data);
      const uniqueTags: Tag[] = [];
      res.data.forEach(el => {
        const tag:Tag = { value: el.tag, label: el.tag };
        if(!uniqueTags.find(e => e.value === el.tag)){
          uniqueTags.push(tag)
          console.log(uniqueTags);          
        }
        setTags(uniqueTags);
      });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch bookmarks', err);
      setLoading(false);
      setError('Failed to fetch bookmarks');
    }
  };

  useEffect(() => {
    fetchBookmarks(selectedTag);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Bookmarks</h1>
      <BookmarkForm onAddBookmark={handleAddBookmark}/>
      <TagDropdown tags={tags} onSelectTag={handleOnSelectTag} />
      <BookmarkTable bookmarks={bookmarks} />
    </>
  );
}

export default App;
