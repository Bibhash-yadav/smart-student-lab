import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white text-center py-6 mt-10">
      <p className="text-sm">Contact: studentstore142@gmail.com</p>

      <div className="flex justify-center gap-6 mt-3 text-xl">
        <FaWhatsapp className="hover:text-green-400 cursor-pointer" />
        <FaInstagram className="hover:text-pink-400 cursor-pointer" />
        <FaFacebook className="hover:text-blue-400 cursor-pointer" />
      </div>
    </div>
  );
}