// import Layout from "@/layout/";
import userRouter from "./userRoute";
import adminRouter from "./adminRoute";

export default role => {
  if (role === "user") {
    return userRouter;
  } else if (role === "admin") {
    return adminRouter;
  }
};
