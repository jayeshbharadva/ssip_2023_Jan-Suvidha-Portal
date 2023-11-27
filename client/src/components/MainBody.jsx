import React from "react";


function MainBody() {
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
    <div>
      <section className="bg-[#7CE6B7]">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-[#19514F]">
              Welcome to 
              {/* <strong className="font-medium text-[#ffffff] sm:block">
                One portal for all schemes
              </strong> */}
            </h1>
            <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
              Jan Suvidha Portal
              {/* <strong className="font-medium text-[#ffffff] sm:block">
                One portal for all schemes
              </strong> */}
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
            All the schemes that you qualify for can be found here.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-[#19514F] px-12 py-3 text-sm font-medium text-[#ffffff] shadow hover:bg-[#379683] hover:text-[#ffffff] focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                onClick={() => handleScroll("schemetable")} // Replace with the correct ID or name of your target element
              >
                Get Started
              </a>
              <a
                className="block w-full rounded px-12 py-3 text-sm bg-[#ffffff] font-medium text-[#7CE6B7] shadow hover:text-green-950 focus:outline-none focus:ring active:text-green-800 sm:w-auto"
                onClick={() => handleScroll("aboutus")}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainBody;
