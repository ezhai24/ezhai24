import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

import { useViewport } from "@/hooks/useViewport";
import { routes } from "@/utils/routes";

const sections = [
  { label: "home", href: routes.home },
  { label: "projects", href: routes.projects },
  { label: "work", href: routes.work },
  { label: "stack", href: routes.stack },
  { label: "contact", href: routes.contact },
];

export const Navigation = () => {
  const { width } = useViewport();

  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  const goToSection = (href: string) => {
    if (typeof window !== "undefined") {
      document.querySelector(href)?.scrollIntoView();

      if (href === routes.home) {
        history.pushState("", document.title, window.location.pathname);
      } else {
        window.location.hash = href;
      }

      document.body.style.overflow = "unset";
    }

    if (width < 800) {
      setIsNavModalOpen(false);
    }
  };

  const openNavModal = () => {
    setIsNavModalOpen(true);
    // This component is rendered client and server side by Next but we only
    // have access to window client-side. Set the initial value of `width`
    // when we're sure we're on the client-side pass.
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  const closeNavModal = () => {
    setIsNavModalOpen(false);
    document.body.style.overflow = "unset";
  };

  if (width >= 800) {
    return (
      <nav className="fixed top-6 z-40 flex w-full justify-center">
        <div className="bg-pink flex flex-row gap-8 rounded-full border-2 px-8 py-2">
          {sections.map(({ label, href }) => (
            <div
              key={href}
              onClick={() => goToSection(href)}
              className="hover:cursor-pointer hover:underline"
            >
              {label}
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isNavModalOpen && (
          <motion.div
            key="navModal"
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: 0 }}
            className="bg-pink fixed z-50 w-screen"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-screen flex-col items-center justify-center"
            >
              <div
                onClick={closeNavModal}
                className="absolute top-6 rounded-full border-2 px-6 py-2 hover:cursor-pointer"
              >
                <IoClose />
              </div>
              {sections.map(({ label, href }) => (
                <div
                  key={href}
                  onClick={() => goToSection(href)}
                  className="my-4 hover:cursor-pointer hover:underline"
                >
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-6 z-40 flex w-full justify-center">
        <div
          onClick={openNavModal}
          className="bg-pink rounded-full border-2 px-6 py-2 text-lg hover:cursor-pointer"
        >
          <IoMenu />
        </div>
      </div>
    </>
  );
};
