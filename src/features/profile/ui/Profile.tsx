import { useState } from "react";
import { useGetCurrentUserQuery, useUpdateProfileMutation } from "../model/api";

export const Profile = () => {
   const { data: user, refetch } = useGetCurrentUserQuery();
   const [updateProfile] = useUpdateProfileMutation();
   const [username, setUsername] = useState(user?.username || "");
   const [email, setEmail] = useState(user?.email || "");

   const handleSave = async () => {
      await updateProfile({ username, email });
      refetch();
   };

   return (
      <div className="profile-container">
         <h2>{user?.username}</h2>
         <div className="current-plan">Текущий тариф: {user?.plan?.title}</div>
         <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <input value={email} onChange={(e) => setEmail(e.target.value)} />
         <button onClick={handleSave}>Сохранить</button>
      </div>
   );
};
