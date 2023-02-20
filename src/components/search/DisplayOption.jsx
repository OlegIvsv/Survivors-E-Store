import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayOptionSelector, setDisplayOption } from '../../redux/search/searchSlice';

export function DisplayOption() {

  const dispatch = useDispatch();
  const currentDisplay = useSelector(displayOptionSelector);

  const setDisplay = (value) => {
    dispatch(setDisplayOption({ display: value }));
  };

  return (
    <div className="ml-4 pt-1">
      <button onClick={() => setDisplay('rows')} 
         className={`display-btn ${currentDisplay === 'rows' ? 'text-x-blue' : ''} rounded-l border-r-2`}>
        <i class="text-xl bi bi-view-stacked"></i>
      </button>
      <button onClick={() => setDisplay('cells')}
        className={`display-btn ${currentDisplay === 'cells' ? 'text-x-blue' : ''} rounded-r border-l-2`}>
        <i class="text-xl bi bi-grid"></i>
      </button>
    </div>
  );
}
