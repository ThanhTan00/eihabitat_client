import { useEffect, useState } from "react";
import { UserUpdate } from "../../../../Model/User";
import { getMyInfo, updateUserProfile } from "../../../../API/UserApi";
import { Gender } from "../../../../Model/Enums/Gender";
import { toast } from "react-toastify";

export const EditInfoForm = () => {
  const [userData, setUserData] = useState<UserUpdate | null>(null);

  useEffect(() => {
    const findUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await getMyInfo(accessToken);

          if (response.data) {
            setUserData(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    findUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (userData) {
        const updateUserRequest: UserUpdate = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileName: userData.profileName,
          bio: userData.bio,
          address: userData.address,
          phone: userData.phone,
          dateOfBirth: userData.dateOfBirth,
          gender: userData.gender as Gender,
        };
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        const userResponse = await updateUserProfile(
          updateUserRequest,
          accessToken
        );

        console.log(userResponse);
        if (userResponse?.code === 1000) {
          console.log("User updated successfully:", userResponse);
          toast.success("User updated successfully!");
        }
      }
    } catch (error) {
      toast.error("Failed to save user.");
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="w-[50%] border rounded-xl">
      <form onSubmit={handleSubmit} className="p-5">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-md font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
              id="grid-first-name"
              type="text"
              value={userData?.firstName}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  firstName: event.target.value,
                })
              }
            />

            <p className="text-red-500 text-xs italic hidden">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide font-bold text-gray-700 text-md mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
              id="grid-last-name"
              type="text"
              value={userData?.lastName}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  lastName: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-md font-bold mb-2"
              htmlFor="grid-profileName"
            >
              Profile Name
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
              id="grid-profileName"
              type="text"
              value={userData?.profileName}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  profileName: event.target.value,
                })
              }
            />
            <p className="text-gray-600 text-xs italic">
              Your profile name has to be unnique
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-md font-bold mb-2"
              htmlFor="grid-bio"
            >
              Bio
            </label>
            <textarea
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
              id="grid-bio"
              value={userData?.bio}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  bio: event.target.value,
                })
              }
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block tracking-wide text-md font-bold mb-2"
              htmlFor="grid-address"
            >
              Address
            </label>
            <textarea
              className="appearance-none block w-full texts-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
              id="grid-address"
              value={userData?.address}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  address: event.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-md font-bold mb-2"
              htmlFor="grid-phone"
            >
              Phone Number
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
              id="grid-phone"
              type="text"
              value={userData?.phone}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  phone: event.target.value,
                })
              }
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-md font-bold mb-2"
              htmlFor="grid-gender"
            >
              Gender
            </label>
            <div className="relative">
              <select
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
                id="gender"
                value={userData?.gender || ""}
                onChange={(event) =>
                  setUserData({
                    ...userData,
                    gender: event.target.value as Gender,
                  })
                }
              >
                <option value="">Select Gender</option>
                {Object.values(Gender).map((genderValue) => (
                  <option key={genderValue} value={genderValue}>
                    {genderValue}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-md font-bold mb-2"
              htmlFor="grid-dob"
            >
              Date Of Birth
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-[#083555]"
              id="grid-dob"
              type="date"
              value={
                userData?.dateOfBirth
                  ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
                  : ""
              }
              onChange={(event) =>
                setUserData({
                  ...userData,
                  dateOfBirth: new Date(event.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-end py-5">
          <button
            className="w-[50%] shadow bg-[#083555] text-white font-medium focus:shadow-outline focus:ring text-white py-2 px-4 rounded hover:scale-105 duration-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
