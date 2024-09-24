import Layout from '../_featured/layout/layout';
import Wishlist from '../_components/Wishlist';
import Chevron from '../_components/Chevron';

export default function wishlist() {
  return (
    <div>
      <Layout>
        <Wishlist />
        <Chevron/>
      </Layout>
    </div>
  );
}
