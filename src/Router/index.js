import { createBrowserRouter } from "react-router-dom"
import DetailRecipe from "../Pages/DetailRecipe";
import Home from "../Pages/Home";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Home/>,
	},
	{
	  path: "/detail/:slug",
	  element: <DetailRecipe/>,
	},
  ]);

export default router