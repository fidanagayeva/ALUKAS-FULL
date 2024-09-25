import Shop from '../_components/ShopImg';
import Layout from '../_featured/layout/layout';
import Chevron from '../_components/Chevron';
import PopularCards from '../_components/PopularCtgCards';
// import { Filter } from '../_components/Filter';
import { FilterShop } from '../_components/FilterShop';

export default function ShopPage() {
  return (
    <div>
        <Layout>
        <Shop />
        <PopularCards/>
        <div className='flex gap-1'>
        {/* <Filter/> */}
        <FilterShop/>
        </div>
        <Chevron/>
        </Layout>
    </div>
  );
}  
