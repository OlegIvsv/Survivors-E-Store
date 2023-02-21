import { useSelector } from 'react-redux';
import { displayOptionSelector } from '../../redux/search/searchSlice';
import { DisplayOptions } from './enums/displayOptions';
import { Pagination } from './Pagination';
import { ProductCell, ProductRow } from './Product';

export function SearchResultList({products}) {
  
  const display = useSelector(displayOptionSelector);

  return (
    <div className="basis-3/4 p-1">
      <div className="flex flex-row flex-wrap">
        {products.map((product, index) => {
          if (display === DisplayOptions.Cells)
            return (
              <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 py-2">
                <ProductCell key={index} product={product} />
              </div>
            );
          return (
            <div className="w-full px-3 py-1 h-60">
              <ProductRow key={index} product={product} />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center py-4">
        <Pagination numberOfPages={10} />
      </div>
    </div>
  );
}
