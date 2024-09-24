import Map from '../_components/ContactMap/index';
import Layout from '../_featured/layout/layout';
import Chevron from '../_components/Chevron';
import Contactus from '../_components/Contactus';

export default function ContactPage() {
  return (
    <div>
      <Layout>
      <Map /> 
      <Contactus/>
      <Chevron/>
      </Layout>
    </div>
  );
}
