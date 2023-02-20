import React from 'react';
import { DisplayOption } from './DisplayOption';
import { SortingOption } from './SortingOption';


export function OptionsPanel() {
  return (
    <div className="flex flex-row justify-end px-4 py-1 bg-x-green">
      <div className='basis-1/3 md:basis-2/4 my-auto'>
        <div className='md:hidden flex-1'>
          <SortingOption mini={true} />
        </div>
        <div className='hidden md:block flex-1'>
          <SortingOption />
        </div>
      </div>
      <div className='basis-2/3 md:basis-1/4'>
        <DisplayOption />
      </div>
    </div>
  );
}
