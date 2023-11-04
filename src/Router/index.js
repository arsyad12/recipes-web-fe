import { createBrowserRouter } from "react-router-dom"
import DetailRecipe from "../Pages/DetailRecipe";
import Home from "../Pages/Home";
import Login from "../Pages/Login";



const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/detail/:slug",
		element: <DetailRecipe />,
	},
	{
		path: "/user/login",
		element: <Login />
	},
]);

export default router