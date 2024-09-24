import Shop from '../_components/ShopImg';
import Layout from '../_featured/layout/layout';
import Chevron from '../_components/Chevron';
import PopularCards from '../_components/PopularCtgCards';

export default function ShopPage() {
  return (
    <div>
        <Layout>
        <Shop />
        <PopularCards/>
        <Chevron/>
        </Layout>
    </div>
  );
}  
