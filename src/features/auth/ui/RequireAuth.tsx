// import { useEffect } from "react";
// import { useCheckAuthQuery } from "../model/api";

// import { logout } from "../model/slice";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";

// export const RequireAuth = ({
//    children,
//    roles,
// }: {
//    children: JSX.Element;
//    roles?: string[];
// }) => {
//    const { data, isLoading, isError } = useCheckAuthQuery();
//    const dispatch = useDispatch();
//    const navigate = useNavigate();
//    const location = useLocation();

//    useEffect(() => {
//       if (isError) {
//          dispatch(logout());
//          navigate("/auth/signin", { state: { from: location } });
//       }
//    }, [isError, dispatch, navigate, location]);

//    if (isLoading) return <div>Loading...</div>;

//    if (roles && !roles.some((role) => data?.roles.includes(role))) {
//       navigate("/unauthorized");
//       return null;
//    }

//    console.log("data", data);

//    return children;
// };

// RequireAuth.tsx (обновленная версия)
import { useEffect } from "react";
import { useCheckAuthQuery } from "../model/api";
import { logout } from "../model/slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Center, Loader } from "@mantine/core";

export const RequireAuth = ({
   children,
   roles,
}: {
   children: JSX.Element;
   roles?: string[];
}) => {
   const { data, isLoading, isError } = useCheckAuthQuery();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (isError || (!isLoading && !data?.user)) {
         console.log("logout", isError, data, isLoading);
         // dispatch(logout());
         // navigate("/auth/signin", { state: { from: location } });
      }
   }, [isError, data, isLoading, dispatch, navigate, location]);

   if (isLoading) return <Center style={{ height: "100vh" }}>
   <Loader size="lg" color="blue" variant="dots" />
</Center>;

   // if (roles && !roles.some((role) => data?.user?.roles?.includes(role))) {
   //    navigate("/unauthorized");
   //    return null;
   // }

   return data?.user ? children : null;
};
