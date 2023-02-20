import React, { useState } from 'react'
import { FilterBase } from './FilterBase'
import SliderUnstyled from '@mui/base/SliderUnstyled';
import { useSearchParams } from 'react-router-dom';

const Slider = React.forwardRef(function (props, ref){
  return (<SliderUnstyled
    {...props}
    ref={ref}
    slotProps={{
      thumb: { className: 'ring-x-red ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute' },
      root: { className: 'w-full relative inline-block h-2 cursor-pointer' },
      rail: { className:'bg-x-dark-green h-2 w-full rounded-full block absolute' },
      track: { className: 'bg-x-red h-2 absolute rounded-full' }
    }}
  />);
});

export default function PriceFilter({minPrice = 0, maxPrice = 100}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

    const setFromText = (value, index) => {
        value = Number.parseInt(value) || (index === 0 ? minPrice : maxPrice);
        console.log(value)
        if(value > maxPrice)
            value = maxPrice;
        if(value < minPrice)
            value = minPrice;

        const newPriceRange = [...priceRange]
        newPriceRange[index] = value;
        setPriceRange(newPriceRange.sort((a,b) => a - b));
    };

    const applyToSearchParams = () => {
        searchParams.set('minPrice', priceRange[0]);
        searchParams.set('maxPrice', priceRange[1]);
        setSearchParams(searchParams);
    }

    return (
      <FilterBase title="Price">
        <div className='px-3 pb-5'>
          <div>
            <Slider
              step={1}
              value={priceRange}
              max={maxPrice}
              min={minPrice}
              onChange={(_, val) => setPriceRange(val)}
            />
          </div>
          <div className='flex flex-row justify-between w-max-full mt-2'>
          <input
            type="text" value={priceRange[0]} onChange={e => setFromText(e.target.value, 0)}
            className="w-1/4 price-input"
          />
          <input
            type="text" value={priceRange[1]} onChange={e => setFromText(e.target.value, 1)}
            className="w-1/4 price-input"
          />
          <button className='btn btn-sm text-x-red hover:scale-105 hover:font-bold' onClick={applyToSearchParams}>
            OK
          </button>
          </div>
        </div>
      </FilterBase>
    );
}




