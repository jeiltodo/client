import { Link } from '@jeiltodo/icons';
import React from 'react';

interface CustomToolbarProps {
  onLinkClick: () => void;
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({
  onLinkClick,
}) => (
  <div id='toolbar' className='flex justify-between'>
    <div className='ql-formats'>
      <button className='ql-bold'></button>
      <button className='ql-italic'></button>
      <button className='ql-underline'></button>
      <button className='ql-list' value='ordered'></button>
      <button className='ql-list' value='bullet'></button>
      <button className='ql-align'></button>
      <select className='ql-color'></select>
    </div>
    <div className='ql-formats'>
      <Link onClick={onLinkClick} className='cursor-pointer' />
    </div>
  </div>
);
