import '../index.css';
import Select from 'react-select';
import { Tag } from '../types/Tag';
import { useState } from 'react';

type Props = {
  tags: Tag[];
  onSelectTag: (Tag: string) => void;
};

const TagDropdown: React.FC<Props> = ({ tags, onSelectTag }): JSX.Element => {
  
  const [selectedTag, setSelectedTag] = useState<OptionType | null>(null);

  const handleChange = (option: OptionType | null) => {
    setSelectedTag(option);
    onSelectTag(option?.value);
    if (option === null) {
      onSelectTag('');
    } 
    console.log('Selected value:', option?.value);
  };
  return (
    <div>
      <h2>Filter By Tag</h2>
      <Select options={tags} value={selectedTag} onChange={handleChange} isClearable />
    </div>
  );
};

export default TagDropdown;
