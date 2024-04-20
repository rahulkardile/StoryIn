import { IoEarth, IoLocation } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="mt-3 w-screen">
      <p className="mt-2 border border-gray-200" />
    <div className="flex flex-row justify-evenly items-start mb-20 mt-6">
         <section className="flex gap-1  flex-col text-sm">
        <h3 className="text-lg font-normal ">COMPANY</h3>
        <ul>About</ul>
        <ul>Careers</ul>
        <ul>Investors</ul>
        <ul>Press</ul>
        <ul>Sustainability</ul>
      </section>
      <section className="flex gap-1  flex-col text-sm">
        <h3 className="text-lg font-normal ">EXPLORE</h3>
        <ul>Search</ul>
        <ul>Narrators</ul>
        <ul>Authors</ul>
        <ul>Storytel Originals</ul>
        <ul>Book series</ul>
        <ul>Books</ul>
      </section>
      <section className="flex gap-1 text-sm flex-col">
        <h3 className="text-lg font-normal ">USEFUL LINKS</h3>
        <ul>Contact and help</ul>
        <ul>Redeem Giftcard</ul>
      </section>
      <section className="flex gap-4 text-sm flex-col">
        <h3 className="text-lg font-normal ">LANGUAGE AND REGION</h3>
        <ul className="flex gap-1 items-center"><IoEarth /> English</ul>
        <ul className="flex gap-1 items-center"> <IoLocation /> India</ul>
      </section>
    </div>

    <div className="flex flex-row justify-evenly items-center mb-20 mt-6">
    <span>Privacy Policy
</span>
    <span>Terms of Use</span>
    <span>Cookies</span>
    <span>card</span>
    <span>Follow us</span>
    </div>
     
    </footer>
  );
};

export default Footer;
