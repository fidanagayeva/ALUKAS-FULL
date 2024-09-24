import HomeSwiper from "../_components/HomeSwiper";
import ShopCard from "../_components/ShopHomeCard";
import Layout from "../_featured/layout/layout";
import PopularCards from "../_components/PopularCtgCards";
import Chevron from "../_components/Chevron";
import TrendyCollection from "../_components/TrendyCollection";
import FindStoreSection from "../_components/FindStoreSection";
import AutumnCollection from "../_components/AutumnCollection";
import FeaturedProducts from "../_components/FeaturedProducts";
import TwoHome from "../_components/TwoHome";
import CustomerReview from "../_components/CustomerReview";
import ReadJournal from "../_components/ReadJournal";
import Instagram from "../_components/Instagram";


export default function HomePage() {
  return (
    <div>
      <Layout>
      <HomeSwiper />
      <ShopCard />
      <PopularCards />
      <TrendyCollection/>
      <FindStoreSection />
      <AutumnCollection/>
      <TwoHome/>
      <FeaturedProducts/>
      <CustomerReview/>
      <ReadJournal/>
      <Instagram/>
      <Chevron/>
      </Layout>
    </div>
  );
}
