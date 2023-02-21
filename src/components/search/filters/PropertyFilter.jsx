import { useSearchParams } from 'react-router-dom';
import { FilterBase } from './FilterBase';

/**
 * @param allOptions - array of options in format { name, id }
 * @param title - title 
 * @param searchKey - query parameter name
 */
export default function PropertyFilter({allOptions, title, searchKey}) {
    
    const [searchParams, setSearchParams] = useSearchParams();
    let selectedOptions = searchParams.get(searchKey)?.split(',') ?? [];

    const setOption = (id, event) => {
       /* Add if checked, else remove */
        if (event.target.checked) 
          selectedOptions.push(id);
        else {
          const index = selectedOptions.indexOf(id);
          if (index >= 0) 
            selectedOptions.splice(index, 1);
        }
        /* If filter is emply, remove its key too, else update key */
        if(selectedOptions.length === 0)
          searchParams.delete(searchKey);
        else
          searchParams.set(searchKey, selectedOptions);

        setSearchParams(searchParams);
    }

    const isChecked = (id) => { 
      return selectedOptions.findIndex(val => val == id) >= 0;
    }

    return (
      <FilterBase title={title}>
        <div className="px-3">
          {allOptions.map((option, index) => (
            <label key={index} className="label">
              <span className="label-text">{option.name}</span>
              <input
                type="checkbox"
                className="text-x-red focus:border-none focus:ring-x-red focus:ring-2 rounded-sm"
                defaultChecked={isChecked(option.id)}
                onInput={(e) => setOption(option.id, e)}
              />
            </label>
          ))}
        </div>
      </FilterBase>
    );
}
