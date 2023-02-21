import { useDispatch, useSelector } from 'react-redux';
import { displayOptionSelector, setDisplayOption } from '../../redux/search/searchSlice';
import { DisplayOptions } from './enums/displayOptions';

export function DisplayOption() {

  const dispatch = useDispatch();
  const currentDisplay = useSelector(displayOptionSelector);

  const setDisplay = (value) => {
    dispatch(setDisplayOption({ display: value }));
  };

  return (
    <div className="ml-4 pt-1">
      <button
        onClick={() => setDisplay(DisplayOptions.Rows)}
        className={`display-btn ${
          currentDisplay === DisplayOptions.Rows ? "text-x-blue" : ""
        } rounded-l border-r-2`}
      >
        <i class="text-xl bi bi-view-stacked"></i>
      </button>
      <button
        onClick={() => setDisplay(DisplayOptions.Cells)}
        className={`display-btn ${
          currentDisplay === DisplayOptions.Cells ? "text-x-blue" : ""
        } rounded-r border-l-2`}
      >
        <i class="text-xl bi bi-grid"></i>
      </button>
    </div>
  );
}
