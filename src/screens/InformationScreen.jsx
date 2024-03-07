// frontend/src/screens/InformationScreen.jsx
import React, { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import SectionMsg from "../components/SectionMsg";

const InformationScreen = () => {
  const [sectionMsg, setSectionMsg] = useState("Information");

  return (
    <main className="flex flex-col relative flex-auto  w-full overflow-hidden">
      <BackgroundImage />

      <div className="max-w-7xl flex-1 w-full mx-auto p-8 flex flex-col gap-4 z-20">
        <SectionMsg sectionMsg={sectionMsg} />

        <div className="flex flex-1 gap-8">
          <div
            className="flex-1 relative bg-gray-100 p-4 rounded-3xl shadow-md border border-gray-300 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 240px)" }}
          >
            {/* Text Content Starts Here */}
            <div className="text-black space-y-4">
              <p>Welcome to DobKonektor!</p>
              <p>
                DobKonektor is an app designed to help you connect with others
                who share something as intimate as your birthdate. By joining
                DobKonektor, you're instantly part of three unique rooms.
                Imagine you were born on June 24, 1994. You'd have access to the
                "1994" room, connecting you with everyone born in the same year
                - it's like stepping into a generational gathering. You'd also
                join the "June 24" room, meeting people across various ages who
                share your birthdate. And then there's the most exclusive space,
                the "June 24, 1994" room, where you meet those who entered the
                world on the exact same day as you. It's fascinating to think
                you might share more than just a birthday with these
                individuals. Discovering those connections is now in your hands.
                Other features of this app include the ability to create time
                capsules, allowing users to send messages to their future
                selves. Additionally, to maintain freshness and relevance, only
                posts from the last 24 hours are displayed. Last but not least,
                users can generate invitation codes to invite friends to join
                DobKonektor, an exclusive platform accessible by invitation
                only.
              </p>
              {/* Additional paragraphs */}
              <p>
                Currently, this web application is in its beta phase, which
                means you might encounter some bugs. As the sole developer
                behind this ambitious project, it may take me a while to address
                these issues. However, I am dedicated to continuously improving
                the application (accessibility, code refactoring, testing, etc).
                I'm also full of ideas for new features that I can't wait to
                implement! I'm also considering adding more languages, starting
                with French. If you're enthusiastic about DobKonektor, your
                support would be greatly appreciated! Your donations will
                significantly contribute, enabling me to invest in more robust
                server and database solutions, professional design, mailing
                solutions for implementing a password reset function, and much
                more. Also feel free to contact me to discuss your business' web
                projects.
              </p>
              <div className="flex flex-col sm:flex-row justify-around items-center sm:items-start w-full">
                <div className="mb-4 mx-2 sm:mb-0 w-full">
                  <a
                    href="https://www.paypal.com/paypalme/Philippe1944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 w-full text-center"
                  >
                    SUPPORT ME
                  </a>
                </div>
                <div className="mb-4 mx-2 sm:mb-0 w-full">
                  <a
                    href="https://www.linkedin.com/in/philippe-charpentier/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 w-full text-center"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className=" mx-2 w-full">
                  {" "}
                  {/* No margin-bottom here for the last item */}
                  <a
                    href="https://philippecharpentier.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 w-full text-center"
                  >
                    My Page
                  </a>
                </div>
              </div>

              {/* <p>
                Should you want to reach out, here are some other ways to
                contact me:
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-start">
                
                
              </div> */}

              {/* Additional content */}
              <p>
                A word to the tech enthusiasts: I chose the solid MERN stack for
                this project, combining React for the frontend with Node.js and
                Express.js for the backend, all supported by a MongoDB Atlas
                database. For state management and API calls, Redux Toolkit and
                RTK Query were my go-to solutions. Admittedly, design is not my
                forte, which is why TailwindCSS has been a lifesaver. Its
                approach might be a topic of debate for some due to concerns
                about code bloat, but I genuinely appreciate how it helps
                visualize the app's design through its class names. ForDevOps, I
                run my Express and socket.IO servers in a Docker container and I
                use Nginx as a reverse proxy web server to serve static files
                from the React build and to proxy request to the backend. The
                whole setup is hosted on a Hostinger KVM2 VPS.
              </p>
              <p>
                The journey to develop DobKonektor involved months of planning,
                identifying key features, and strategizing their implementation.
                Countless hours were dedicated to learning through tutorials,
                particularly valuing the insights from creators like{" "}
                <a
                  className="text-blue-800"
                  href="https://www.traversymedia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brad Traversy
                </a>{" "}
                (the G.O.A.T in my opinion), Kyle from{" "}
                <a
                  className="text-blue-800"
                  href="https://www.youtube.com/@WebDevSimplified/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Web Dev Simplified
                </a>
                ,{" "}
                <a
                  className="text-blue-800"
                  href="https://www.youtube.com/@DaveGrayTeachesCode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dave Gray
                </a>
                ,{" "}
                <a
                  className="text-blue-800"
                  href="https://www.youtube.com/@CodingAddict"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  John Smilga
                </a>
                . And{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800"
                  href="https://www.youtube.com/watch?v=jotpVtFwYBk"
                >
                  Sanjeev Thiyagarajan
                </a>{" "}
                for his exceptional guidance on Docker and deployment
                techniques. A special shoutout to{" "}
                <a
                  className="text-blue-800"
                  href="https://www.lewagon.com/montreal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Le Wagon Montreal
                </a>{" "}
                for kickstarting my coding journey.
              </p>
              <p className="font-bold">
                Using ChatGPT 4 has completely transformed the coding process
                for this app, acting like a virtual senior developer for tasks
                ranging from basic functions to intricate problem-solving. This
                partnership has greatly enhanced my productivity and broadened
                my knowledge in web development. As a heartfelt thank you to{" "}
                <span className="text-red-700">the first 20 people</span> who
                are enthusiastic enough to support my project with a donation
                exceeding 200 EUR, I'm excited to offer (upon request) an
                exclusive collection of these enlightening conversations (For
                now, it's simply a zip file containing a few text documents, so
                don't expect anything too elaborate! Nonetheless, I assure you
                it will still be fascinating). Moreover, for those exceptionally
                generous donors contributing more than 500 EUR, I'm thrilled to
                provide a personal Zoom session to explore deep tech topics or
                any other subject of interest.
              </p>
              <p>
                DobKonektor is more than an app; it's the gateway to a community
                bursting with stories waiting to be shared. Your support and
                feedback are invaluable, helping shape a future where
                connections go beyond birthdates, celebrating the shared
                experiences that truly bring us together.
              </p>
              <p>
                Join the DobKonektor adventure, where each connection is a step
                toward uncovering shared stories and making new discoveries.
              </p>

              {/* Photo credit */}
              <a
                href="https://www.pexels.com/photo/shallow-focus-of-clear-hourglass-1095601/"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                credits = Photo by Jordan Benton
              </a>
            </div>
          </div>

          <SlidingMenu />
          <AsideMenu />
        </div>
      </div>
    </main>
  );
};

export default InformationScreen;
