import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <img className="h-10" src={logo} alt="logo" />

              <p className="mt-4 max-w-xs text-gray-400/80">
                Refine your interview skills: AI-guided insights for confident
                career leaps and success.
              </p>

              <ul className="mt-8 flex gap-6">
                <li>
                  <Link className="text-gray-400 transition hover:opacity-75">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="text-2xl" />
                  </Link>
                </li>

                <li>
                  <Link className="text-gray-400 transition hover:opacity-75">
                    <span className="sr-only">Instagram</span>

                    <FaInstagram className="text-2xl" />
                  </Link>
                </li>

                <li>
                  <Link className="text-gray-400 transition hover:opacity-75">
                    <span className="sr-only">Twitter</span>

                    <FaTwitter className="text-2xl" />
                  </Link>
                </li>

                <li>
                  <Link className="text-gray-400 transition hover:opacity-75">
                    <span className="sr-only">GitHub</span>

                    <FaGithub className="text-2xl" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              <div>
                <p className="font-medium text-gray-400">Services</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link className="text-gray-500 transition hover:opacity-75">
                      {" "}
                      1on1 Coaching{" "}
                    </Link>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      {" "}
                      Company Review{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      {" "}
                      Accounts Review{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      {" "}
                      HR Consulting{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      {" "}
                      SEO Optimisation{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-400">Company</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Meet the Team{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Accounts Review{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-400">Helpful Links</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Contact{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      FAQs{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Live Chat{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-400">Legal</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Accessibility{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Returns Policy{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Refund Policy{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Hiring Statistics{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            &copy; 2024. PrepAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
