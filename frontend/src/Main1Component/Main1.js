import './Main1.css';
import About from '../AboutComponent/About.js';
import Contact from '../ContactComponent/Contact.js';
import Product from '../ProductComponent/Product.js';
function Main1() {
  return (
    <div id="main1">
      <br />
      <h1>Who we are ?</h1>
      <hr />
      <p>
        BuliWear is a one stop for all of your baby needs. It provides you The
        Best in Comfort product for your baby. Here you will get clothes and few
        more products for your baby. As you will become a part of our BuliWear
        family we will make sure to provide you our best services and products.
        And for this we just need your support and feedback.
        <br />
        Our platform is capable to handle all of our customers needs by
        providing details about our product and services we offer. Also we get
        there some information like Email address by which we can contact them
        and share a news letters with which has details about new product and
        services and future updates. As this is an official website our
        customers did not have to worry about anything before Signing In.
      </p>
      <Product />
      <About />
      <Contact />
    </div>
  );
}

export default Main1;
