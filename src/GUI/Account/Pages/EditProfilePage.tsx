import { EditAvatarPart, EditInfoForm } from "../Components";

export const EditProfilePage = () => {
  return (
    <>
      <div className="py-10 px-5 flex justify-around">
        <EditAvatarPart />
      </div>
      <div className="px-5 flex justify-around">
        <EditInfoForm />
      </div>
    </>
  );
};
