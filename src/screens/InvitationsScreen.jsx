import React, { useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import SectionMsg from "../components/SectionMsg";
import { useGenerateInvitationCodeMutation } from "../slices/couponsApiSlice";
import { toast } from "react-toastify";

const InvitationsScreen = () => {
  const [sectionMsg, setSectionMsg] = useState("Invitations");
  // Placeholder state for generated invitation code
  const [invitationCode, setInvitationCode] = useState("");

  const [generateInvitationCode] = useGenerateInvitationCodeMutation();

  const generateCode = async () => {
    try {
      const res = await generateInvitationCode();
      if (res?.data?.label) {
        // console.log(res.data.label);
        setInvitationCode(res.data.label);
      }
      // console.log(res);
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message);
        setInvitationCode(`${res?.error?.data?.coupon.label} still active`);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <main className="flex flex-col relative flex-auto w-full overflow-hidden">
      <BackgroundImage />

      <div className="max-w-7xl flex-1 w-full mx-auto p-8 flex flex-col gap-4 z-20">
        <SectionMsg sectionMsg={sectionMsg} />

        <div className="flex flex-1 gap-8">
          <div
            className="flex-1 relative bg-gray-100 p-4 rounded-3xl shadow-md border border-gray-300 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 240px)" }}
          >
            {/* Invitation Codes Section */}
            <div className="bg-white p-6 mb-4 rounded-xl shadow-md">
              <header>
                <h3 className="text-sm font-semibold">Invitation Codes</h3>
              </header>
              <p className="text-gray-700 my-2">
                You can create an invite code to bring your friends on board
                DobKonektor. This code can be used up to 10 times, letting you
                invite 10 friends with just one code. Plus, every new member
                gets 100,000 tokens to start posting or creating capsules
                immediately.
              </p>
              <button
                onClick={generateCode}
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Generate code
              </button>
              {invitationCode && (
                <div className="mt-2 text-gray-600">
                  Your code is:{" "}
                  <span className="font-semibold">{invitationCode}</span>
                </div>
              )}
            </div>

            {/* Members I have invited Section */}
            <div className="bg-white p-6 mb-4 rounded-xl shadow-md hidden">
              {/* To be added in a future release */}
              <header>
                <h3 className="text-sm font-semibold">
                  Members you have invited
                </h3>
              </header>
            </div>
          </div>

          <SlidingMenu />
          <AsideMenu />
        </div>
      </div>
    </main>
  );
};

export default InvitationsScreen;
