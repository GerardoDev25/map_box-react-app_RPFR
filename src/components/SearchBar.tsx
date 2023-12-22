import { ChangeEvent, useRef } from 'react';

export const SearchBar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounceRef = useRef<any>();

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // todo search or exec consult
      console.log(event.target.value);
    }, 300);
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        className='form-control'
        placeholder='search place'
        onChange={onQueryChanged}
      />
    </div>
  );
};
