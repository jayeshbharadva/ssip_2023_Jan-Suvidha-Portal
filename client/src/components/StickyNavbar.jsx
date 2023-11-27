import React from "react";

function StickyNavbar() {
  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
  
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };
 
  return (
    <header class="bg-[#19514F] fixed top-0 left-0 right-0 text-white">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a
            href="https://www.google.com"
            class="-m-1.5 p-1.5 text-[#ffffff] text-xl font-bold"
          >
            JAN SUVIDHA PORTAL
          </a>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a
           onClick={() => handleScroll("schemetable")}
            class="text-sm text-white font-semibold leading-6 hover:text-[#19514F] hover:bg-[#7CE6B7] transition delay-75 duration-300 ease-in-out rounded-lg py-3 px-2"
          >
            Schemes
          </a>
          <a
            onClick={() => handleScroll("aboutus")}
            class="text-sm text-white font-semibold leading-6 hover:text-[#19514F] hover:bg-[#7CE6B7] transition delay-75 duration-300 ease-in-out rounded-lg py-3 px-2"
          >
            About
          </a>
          <a
            href="/organiztionlogin"
            class="text-sm text-white font-semibold leading-6 hover:text-[#19514F] hover:bg-[#7CE6B7] transition delay-75 duration-300 ease-in-out rounded-lg py-3 px-2"
          >
            Organization Login
          </a>
          <a
            href="/citizenlogin"
            class="text-sm text-white font-semibold leading-6 hover:text-[#19514F] hover:bg-[#7CE6B7] transition delay-75 duration-300 ease-in-out rounded-lg py-3 px-2"
          >
            Citizen Login
          </a>
          <a
           onClick={() => handleScroll("footer")}
            class="text-sm text-white font-semibold leading-6 hover:text-[#19514F] hover:bg-[#7CE6B7] transition delay-75 duration-300 ease-in-out rounded-lg py-3 px-2"
          >
            Contact Us
          </a>
        </div>
      </nav>
      <div class="lg:hidden" role="dialog" aria-modal="true">
        <div class="fixed inset-0 z-10"></div>
        <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="https://www.google.com" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button type="button" class="-m-2.5 rounded-lg p-2.5 text-gray-700">
              <span class="sr-only">Close menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <div class="-mx-3">
                  <button
                    type="button"
                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7  hover:bg-gray-50"
                    aria-controls="disclosure-1"
                    aria-expanded="false"
                  >
                    <svg
                      class="h-5 w-5 flex-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <a
                  href="https://www.google.com"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="https://www.google.com"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="https://www.google.com"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div class="py-6">
                <a
                  href="https://www.google.com"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default StickyNavbar;
