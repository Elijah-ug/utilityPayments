import { Link } from "react-router-dom";
import { FaDiscord, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-gray-300 mt-16 py-6 px-4 text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">

              {/* Left side */}
              <div className="flex gap-6 text-sm">
                  <Link to="https://github.com/Elijah-ug/utilityPayments" className="transition-colors duration-200">
                      <FaGithub/>
                  </Link>
                  <Link to="https://x.com/ElicomElijah" className="transition-colors duration-200">
                      <FaXTwitter/>
                  </Link>
                  <Link to="https://web.telegram.org/a/#1077582621" className="transition-colors duration-200">
                      <FaTelegram/>
                  </Link>
                  <Link to="https://www.linkedin.com/in/mugisha-elijah-88a291239/" className="transition-colors duration-200">
                      <FaLinkedin/>
                  </Link>
                  <Link to="https://discord.com/channels/@me" className="transition-colors duration-200">
                      <FaDiscord/>
                  </Link>
              </div>

              {/* center */}
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} UtilityBlocks. All rights reserved.</p>
        </div>

        {/* Right side */}
        <div className="flex gap-6 text-sm">
          <Link to="#privacy" className="hover:text-amber-300 transition-colors duration-200">Privacy</Link>
          <Link to="#terms" className="hover:text-amber-300 transition-colors duration-200">Terms</Link>
          <Link to="#contact" className="hover:text-amber-300 transition-colors duration-200">Contact</Link>
        </div>

      </div>
    </footer>
  );
}
