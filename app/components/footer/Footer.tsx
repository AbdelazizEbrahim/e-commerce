import { MdFacebook } from "react-icons/md";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { AiFillTikTok, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href={"#"}>Phones</Link>
            <Link href={"#"}>Laptops</Link>
            <Link href={"#"}>Desktops</Link>
            <Link href={"#"}>Watches</Link>
            <Link href={"#"}>Tvs</Link>
            <Link href={"#"}>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href={"#"}>Contact Us</Link>
            <Link href={"#"}>Shipping Policy</Link>
            <Link href={"#"}>Return & Exchanges</Link>
            <Link href={"#"}>FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">At Bahir E-Commerce, we strive 
                to provide quality products at unbeatable prices. 
                Our platform is designed to make online shopping 
                seamless and secure for everyone. Discover a wide 
                range of items tailored to meet your needs. Shop with 
                confidence, anytime, anywhere
            </p>
            <p>&copy; {new Date().getFullYear()} Bahir E-Shop All Rights Reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href={'#'}><MdFacebook size={24}/></Link>
              <Link href={'#'}><AiFillTwitterCircle size={24}/></Link>
              <Link href={'#'}><AiFillTikTok size={24}/></Link>
              <Link href={'#'}><AiFillYoutube size={24}/></Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
