import { createBrowserRouter } from "react-router-dom"
import DetailRecipe from "../Pages/DetailRecipe";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/FormEdit"
import SearchRecipe from '../Pages/SearchRecipe'

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
	{
		path: "/user/register",
		element: <Register />

	},
	{
		path: "/profile",
		element: <Profile />

	},
	{
		path: "/form-edit",
		element: <EditProfile />

	},
	{
		path: "/search",
		element: <SearchRecipe />

	},
]);

export default router