"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
        username,
      });

      // Send the email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Change the UI to show the verification form
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError(
        err.errors?.[0]?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        // Verification failed
        setError("Verification failed. Please try again.");
        return;
      }

      // If we get here, the user's email has been verified
      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError(
        err.errors?.[0]?.message || "Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider) => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error(err);
      setError(`Error signing up with ${provider}`);
    }
  };

  return (
    <div className="w-screen h-screen text-white flex justify-center items-center bg-[url('https://l1ydo07ih8.ufs.sh/f/tRac1gz0giWLaIKiEn9qiQ0EBTv3ClzpZdUWNnI4ew1uH2MS')] bg-contain bg-bottom bg-no-repeat">
      <div className="w-[90%] h-screen flex justify-center items-center flex-col">
        <div className="w-full h-2/5 flex justify-end items-center flex-col p-10 ">
          <svg
            width="100"
            height="120"
            viewBox="0 0 48 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.4791 51.0294L42.033 33.556C41.6671 32.3816 40.7519 31.4492 39.5846 31.0603C39.1943 30.9307 38.7875 30.8648 38.3758 30.8648H29.0225C27.9532 30.8648 27.0928 29.9858 27.1157 28.9167C27.1341 28.0542 27.7346 27.3243 28.546 27.0312C30.6716 26.2632 32.595 24.9802 34.1406 23.2725C36.4616 20.7081 37.7391 17.3896 37.7391 13.9286C37.7391 6.24816 31.491 0 23.8106 0C16.1302 0 9.88199 6.24816 9.88199 13.9286C9.88199 17.3903 11.161 20.7095 13.4827 23.274C15.0319 24.9854 16.9606 26.2696 19.092 27.0366C19.9008 27.3276 20.5005 28.0532 20.522 28.9126C20.5488 29.9828 19.6885 30.8648 18.6179 30.8648H9.4738C8.76412 30.8648 8.06949 31.0618 7.46508 31.4334C7.0397 31.6955 6.67448 32.0328 6.37944 32.436C6.20041 32.6816 6.05002 32.948 5.93473 33.2273C5.89534 33.3226 5.85882 33.4207 5.82731 33.5188L0.185703 50.9922C-0.097881 51.8716 -0.0556298 52.8219 0.305296 53.6676C0.362585 53.8015 0.427752 53.9333 0.499365 54.0593C0.570977 54.1846 0.64975 54.3078 0.734252 54.4231C0.776504 54.4811 0.820903 54.5391 0.866735 54.595C0.958399 54.7074 1.05794 54.8155 1.16034 54.9158C1.31718 55.069 1.48904 55.2094 1.66879 55.3326C1.79053 55.4164 1.91943 55.4937 2.0512 55.5632C2.1844 55.6334 2.32333 55.6956 2.46225 55.7486C2.60548 55.8031 2.75372 55.8496 2.90052 55.8861C3.20344 55.9613 3.51639 56 3.83148 56H43.8204C45.0335 56 46.1872 55.4164 46.9062 54.4396C47.6259 53.4628 47.84 52.1874 47.4791 51.0294Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M35.6249 13.9285C35.6249 20.0285 31.0031 25.0485 25.07 25.678L24.6854 43.6104C24.6754 44.0687 24.3009 44.4353 23.8426 44.4353C23.385 44.4353 23.0112 44.0708 22.9997 43.6132L22.5514 25.678C16.6162 25.0506 11.9922 20.0292 11.9922 13.9278C11.9922 7.40181 17.2822 2.11182 23.8082 2.11182C30.3342 2.11182 35.6249 7.40252 35.6249 13.9285ZM17.1203 10.9566C17.9983 9.036 19.2035 7.84795 20.5907 7.23137C21.9864 6.61121 23.6628 6.52599 25.5491 6.99362C27.5249 7.48345 29.1963 8.98014 30.1688 10.8829C31.1427 12.7863 31.3618 14.9855 30.5856 16.8167C29.5085 19.3582 27.512 20.9788 26.2029 21.7357C25.7919 21.9735 25.5784 22.4762 25.7553 22.9166C25.9322 23.357 26.4335 23.5704 26.8503 23.3427C28.4365 22.4762 30.8649 20.5641 32.1682 17.4869C33.1829 15.093 32.8528 12.3559 31.6991 10.1002C30.5448 7.84294 28.5095 5.95667 25.9623 5.32505C23.8025 4.79011 21.7193 4.84812 19.8924 5.6602C18.057 6.47586 16.5768 8.00908 15.557 10.2419C14.3088 12.9747 14.654 15.8993 16.0311 18.0656C17.4118 20.2376 19.8531 21.6705 22.7397 21.3354C25.4488 21.021 26.9649 19.7929 27.7927 18.3792C28.4709 17.2213 28.6506 15.9731 28.7466 15.3085C28.7616 15.204 28.7745 15.1137 28.7874 15.0407C28.9392 14.1548 28.6434 12.7899 27.8915 11.6549C27.1052 10.4668 25.7589 9.43846 23.7602 9.41697C21.788 9.39549 20.5384 10.2813 19.8502 11.4271C19.2007 12.5085 19.0854 13.7545 19.1735 14.5272C19.3826 16.3555 21.0712 17.2134 22.3974 17.2578C23.2468 17.2864 24.0775 16.836 24.631 16.213C25.0399 15.7525 25.3471 15.1409 25.403 14.4506C25.441 13.9772 24.9662 13.6815 24.5028 13.7853C24.0438 13.8884 23.771 14.3804 23.5425 14.7936L23.5368 14.8044C23.4845 14.8982 23.4208 14.9877 23.3456 15.0722C23.0484 15.4066 22.6796 15.5477 22.4547 15.5405C21.6326 15.5133 20.9587 15.0106 20.8807 14.3324C20.8255 13.8519 20.9079 13.004 21.3225 12.3123C21.6992 11.6849 22.3838 11.1206 23.7409 11.1357C25.0729 11.15 25.9279 11.8045 26.4578 12.6037C27.0222 13.4559 27.1553 14.3833 27.093 14.7499C27.0737 14.8624 27.0558 14.9827 27.0365 15.1094C26.9333 15.7926 26.8016 16.6691 26.3096 17.5099C25.7689 18.4337 24.7427 19.3718 22.5421 19.6267C20.388 19.8766 18.554 18.8282 17.482 17.1425C16.4064 15.4524 16.1213 13.143 17.1203 10.9566Z"
              fill="#FF725E"
            />
            <path
              d="M21.2848 42.6902C21.2841 42.678 21.2841 42.6658 21.2834 42.6537L21.0414 32.9774H9.47384C8.72836 32.9774 8.06738 33.4587 7.83822 34.1683L2.19662 51.6417C1.83856 52.7517 2.66568 53.8882 3.83224 53.8882H43.8212C44.9799 53.8882 45.807 52.7646 45.4618 51.6582L40.0157 34.1848C39.7916 33.4665 39.127 32.9774 38.3751 32.9774H26.6128L26.4058 42.6451C26.4051 42.6673 26.4044 42.6887 26.4037 42.7109C27.6469 43.084 28.4654 43.7171 28.4654 44.4361C28.4654 45.5833 26.3815 46.5128 23.8106 46.5128C21.2397 46.5128 19.1558 45.5833 19.1558 44.4361C19.1558 43.7035 20.0037 43.0604 21.2848 42.6902ZM32.2866 34.6961H30.2643L41.0677 52.1695H43.09L32.2866 34.6961ZM6.87217 42.7546L7.4243 41.0438L23.3967 52.1695H20.389L6.87217 42.7546Z"
              stroke="white"
            />
            <path
              d="M45.4618 51.6582L40.0157 34.1848C39.7916 33.4665 39.127 32.9774 38.3751 32.9774H26.6128L26.4058 42.6451C26.4051 42.6673 26.4044 42.6887 26.4037 42.7109C27.6469 43.084 28.4654 43.7171 28.4654 44.4361C28.4654 45.5833 26.3815 46.5128 23.8106 46.5128C21.2397 46.5128 19.1558 45.5833 19.1558 44.4361C19.1558 43.7042 20.0037 43.0611 21.2856 42.6909C21.2848 42.6787 21.2848 42.6665 21.2841 42.6544L21.0421 32.9781H9.47384C8.72836 32.9781 8.06738 33.4594 7.83822 34.169L2.19662 51.6424C1.83856 52.7524 2.66568 53.8889 3.83224 53.8889H43.8212C44.9799 53.8882 45.807 52.7646 45.4618 51.6582ZM20.389 52.1695L6.87217 42.7546L7.4243 41.0438L23.3967 52.1695H20.389ZM41.0684 52.1695L30.265 34.6961H32.2873L43.0907 52.1695H41.0684Z"
              fill="#2C8683"
            />
          </svg>

          <p className="text-2xl font-black">Sign up</p>
        </div>

        {!pendingVerification ? (
          <>
            <div className="w-full flex justify-around items-start flex-col space-y-4">
              <div className="w-full flex gap-2">
                <input
                  className="w-1/2 h-14 border border-1 border-[#33436A] bg-[#1e2636] rounded-xl outline-0 p-4"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
                <input
                  className="w-1/2 h-14 border border-1 border-[#33436A] bg-[#1e2636] rounded-xl outline-0 p-4"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                />
              </div>
              <input
                className="w-full h-14 border border-1 border-[#33436A] bg-[#1e2636] rounded-xl outline-0 p-4"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
              <input
                className="w-full h-14 border border-1 border-[#33436A] bg-[#1e2636] rounded-xl outline-0 p-4"
                placeholder="Email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                type="email"
              />
              <input
                className="w-full h-14 border border-1 border-[#33436A] bg-[#1e2636] rounded-xl outline-0 p-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Add this div for Clerk CAPTCHA */}
              <div id="clerk-captcha" className="w-full"></div>
            </div>

            <div className="w-full flex justify-around items-start flex-col mt-6 space-y-4">
              <button
                className="w-full h-14 bg-[#FF725E] border border-1 border-[#33436A] rounded-xl outline-0 p-4 flex justify-center items-center"
                onClick={onSignUpPress}
                disabled={
                  isLoading ||
                  !emailAddress ||
                  !password ||
                  !firstName ||
                  !lastName ||
                  !username
                }
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                ) : (
                  <p>Sign up</p>
                )}
              </button>
              <div className="w-full h-14 flex justify-between items-center">
                <button
                  className="w-[30%] h-full bg-[#33436A] rounded-xl flex justify-center items-center"
                  onClick={() => handleSocialSignUp("oauth_google")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.9996 19.6363V28.9309H36.916C36.3488 31.9199 34.6468 34.4509 32.0941 36.1527L39.8831 42.1964C44.4213 38.0075 47.0395 31.8547 47.0395 24.5456C47.0395 22.8438 46.8868 21.2073 46.6031 19.6366L23.9996 19.6363Z"
                      fill="white"
                    />
                    <path
                      d="M10.5494 28.5681L8.79263 29.9128L2.57434 34.7564C6.52342 42.589 14.6174 48 23.9991 48C30.4789 48 35.9116 45.8618 39.8826 42.1965L32.0936 36.1528C29.9554 37.5928 27.2281 38.4656 23.9991 38.4656C17.7591 38.4656 12.4575 34.2547 10.5592 28.5819L10.5494 28.5681Z"
                      fill="white"
                    />
                    <path
                      d="M2.57436 13.2437C0.938084 16.4726 0 20.1163 0 23.9999C0 27.8834 0.938084 31.5271 2.57436 34.7561C2.57436 34.7778 10.5599 28.5597 10.5599 28.5597C10.08 27.1197 9.79624 25.5926 9.79624 23.9996C9.79624 22.4067 10.08 20.8795 10.5599 19.4395L2.57436 13.2437Z"
                      fill="white"
                    />
                    <path
                      d="M23.9996 9.55636C27.5342 9.55636 30.676 10.7781 33.1851 13.1345L40.0577 6.2619C35.8904 2.37833 30.4797 0 23.9996 0C14.6179 0 6.52342 5.38908 2.57434 13.2437L10.5597 19.44C12.4578 13.7672 17.7596 9.55636 23.9996 9.55636Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  className="w-[30%] h-full bg-[#33436A] rounded-xl flex justify-center items-center"
                  onClick={() => handleSocialSignUp("oauth_apple")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 41 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.5839 37.4071C38.858 39.0841 37.9988 40.6278 37.0033 42.047C35.6463 43.9817 34.5352 45.321 33.6789 46.0647C32.3516 47.2854 30.9294 47.9105 29.4065 47.9461C28.3132 47.9461 26.9947 47.635 25.4599 47.0039C23.9201 46.3757 22.5051 46.0647 21.2112 46.0647C19.8542 46.0647 18.3988 46.3757 16.8421 47.0039C15.2831 47.635 14.0271 47.9639 13.0668 47.9964C11.6064 48.0587 10.1508 47.4157 8.69779 46.0647C7.77042 45.2558 6.61046 43.8692 5.22087 41.9048C3.72995 39.8071 2.50422 37.3745 1.54395 34.6013C0.515539 31.6058 0 28.7052 0 25.897C0 22.6802 0.695089 19.9057 2.08734 17.5808C3.18153 15.7133 4.63718 14.2401 6.45905 13.1587C8.28092 12.0772 10.2495 11.5261 12.3694 11.4909C13.5293 11.4909 15.0505 11.8497 16.9408 12.5548C18.8258 13.2624 20.0361 13.6212 20.5667 13.6212C20.9635 13.6212 22.308 13.2016 24.5874 12.3652C26.7428 11.5895 28.562 11.2684 30.0524 11.3949C34.0908 11.7208 37.1247 13.3127 39.1425 16.1808C35.5307 18.3692 33.7441 21.4343 33.7797 25.3663C33.8123 28.429 34.9233 30.9777 37.107 33.0013C38.0966 33.9406 39.2017 34.6665 40.4313 35.182C40.1646 35.9553 39.8832 36.696 39.5839 37.4071ZM30.322 0.960823C30.322 3.36137 29.445 5.60276 27.6969 7.67736C25.5873 10.1437 23.0357 11.5688 20.2687 11.3439C20.2334 11.0559 20.213 10.7528 20.213 10.4343C20.213 8.12979 21.2162 5.6635 22.9978 3.64696C23.8872 2.62596 25.0185 1.77701 26.3903 1.09978C27.7591 0.43266 29.0539 0.0637274 30.2716 0.000549316C30.3072 0.321465 30.322 0.642432 30.322 0.960823Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  className="w-[30%] h-full bg-[#33436A] rounded-xl flex justify-center items-center"
                  onClick={() => handleSocialSignUp("oauth_facebook")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_17_61)">
                      <path
                        d="M24 0C10.7453 0 0 10.7453 0 24C0 35.255 7.74912 44.6995 18.2026 47.2934V31.3344H13.2538V24H18.2026V20.8397C18.2026 12.671 21.8995 8.8848 29.9194 8.8848C31.44 8.8848 34.0637 9.18336 35.137 9.48096V16.129C34.5706 16.0694 33.5866 16.0397 32.3645 16.0397C28.4294 16.0397 26.9088 17.5306 26.9088 21.4061V24H34.7482L33.4013 31.3344H26.9088V47.8243C38.7926 46.3891 48.001 36.2707 48.001 24C48 10.7453 37.2547 0 24 0Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_17_61">
                        <rect width="48" height="48" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col space-y-4">
            <p className="text-center">
              We've sent a verification code to your email address. Please enter
              it below.
            </p>
            <input
              className="w-full h-14 border border-1 border-[#33436A] bg-[#1e2636] rounded-xl outline-0 p-4"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className="w-full h-14 bg-[#FF725E] border border-1 border-[#33436A] rounded-xl outline-0 p-4 flex justify-center items-center"
              onClick={onVerifyPress}
              disabled={isLoading || !code}
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
              ) : (
                <p>Verify Email</p>
              )}
            </button>
          </div>
        )}

        <div className="w-full flex justify-center items-end p-6 mt-6">
          <Link href="/login" className="underline opacity-65 text-sm">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
