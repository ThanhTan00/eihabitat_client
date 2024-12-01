import { EditAvatarPart, EditInfoForm } from "../Components";

export const EditProfilePage = () => {
  return (
    <div className="ml-40 w-[90vw] flex justify-around">
      <div className="w-[90%]">
        <div className=" py-10 flex justify-around">
          <EditAvatarPart />
        </div>
        <div className="flex justify-around">
          <EditInfoForm />
        </div>
      </div>
    </div>
  );
};
