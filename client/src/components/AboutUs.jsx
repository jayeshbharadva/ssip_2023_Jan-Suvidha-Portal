import React from "react";

function About() {
  return (
    <div id="aboutus">
      <section className="bg-[#ffffff]">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-[#19514F]">
              About Us
              {/* Understand User Flow. */}
              <strong className="font-extrabold text-green-800 sm:block">
                {/* Increase Conversion. */}
              </strong>
            </h1>

            <p className="mx-auto mt-6 w-full text-justify leading-relaxed text-[#000000]">
            Here, in this portal, users will find schemes and scholarships that they can apply for based on criteria such as caste, occupation, and income. The portal filters and displays related schemes so that users can easily apply. Information and application procedures are also provided.
             </p>
             <p className="mx-auto mt-6 w-full text-justify leading-relaxed text-[#000000]">
             The government provides various schemes for the welfare of the people. However, due to a lack of knowledge and information, many people cannot benefit from these schemes. This portal ensures that users can maximize the benefits of the schemes they are eligible for and apply for them to gain the maximum advantage. </p>

            
            {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-green-800 px-12 py-3 text-sm font-medium text-[#8EE4AF] shadow hover:bg-[#379683] hover:text-green-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/get-started"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm bg-[#8EE4AF] font-medium text-green-700 shadow hover:text-green-950 focus:outline-none focus:ring active:text-green-800 sm:w-auto"
                href="/about"
              >
                Learn More
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
