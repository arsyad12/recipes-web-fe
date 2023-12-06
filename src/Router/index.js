import { createBrowserRouter } from "react-router-dom"
import DetailRecipe from "../Pages/DetailRecipe";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SearchRecipe from "../Pages/SearchRecipe";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/search",
		element: <SearchRecipe />,
	},
	{
		path: "/detail/:slug",
		element: <DetailRecipe />,
	},
	{
		path: "/user/login",
		element: <Login />
	},
	{
		path: "/user/register",
		element: <Register />

	}
]);

export default router