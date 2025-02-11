import { useEffect } from "react";
import { logout } from "../model/slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCheckAdminAuthQuery } from "../model/adminApi";
import { Center, Loader } from "@mantine/core";
import { adminLogout } from "../model/adminSlice";

export const AdminRequireAuth = ({
   children,
   roles,
}: {
   children: JSX.Element;
   roles?: string[];
}) => {
   // const token = localStorage.getItem("access_token");
   // console.log("token", token);
   const { data, isLoading, isError } = useCheckAdminAuthQuery();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   // const user = true;

   useEffect(() => {
      if (
         isError
         // || (user && roles && !roles.some((r) => user.roles.includes(r)))
      ) {
         dispatch(adminLogout());
         navigate("/login", { state: { from: location } });
      }
   }, [isError, data?.user?.admin, roles, dispatch, navigate, location]);

   if (isLoading)
      return (
         <Center style={{ height: "100vh" }}>
            <Loader size="lg" color="blue" variant="dots" />
         </Center>
      );

   console.log("user", data?.user);
   console.log("user", data?.user?.admin);

   return data?.user?.admin ? children : null;
};
