import React, { useState } from 'react';
import { ChangeEvent, KeyboardEvent} from 'react';
import useTagsStore from '../states/tags';
import axios from 'axios';

const CategoriesTagInput= ({initialTags, id}:{initialTags:string[], id?:string}) => {
  const tags=useTagsStore((state)=>state.tags);
  const setTags=useTagsStore((state)=>state.addTags);
  const [input, setInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      setTags([...tags, input.trim()]);
      setInput('');
      if(id){
        axios.put(`http://localhost:3000/notes/categories/${id}`, {categories: [input.trim()]})
    }
    }
    
  };

  const removeTag = (indexToRemove: number) => {
    if(id){
        const removedTag=tags[indexToRemove]
        axios.patch(`http://localhost:3000/notes/categories/${id}`, {categories:[removedTag]})
    }
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <div key={index}>
          {tag}
          <span  onClick={() => removeTag(index)}> ×</span>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag"
        />
    </div>
  );
};



export default CategoriesTagInput;
