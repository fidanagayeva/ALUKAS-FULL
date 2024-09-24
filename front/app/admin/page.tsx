import Layout from "../_featured/layout/layout";
import Admin from "../_components/Admin";
import Chevron from "../_components/Chevron";
import ContactAdmin from "../_components/ContactAdmin";

const admin = () => {
  return (
    <Layout>
     <Admin/>
     <ContactAdmin/>
     <Chevron/>
    </Layout>
  )
}

export default admin

