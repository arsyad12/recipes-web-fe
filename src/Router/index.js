import { Link, createBrowserRouter } from "react-router-dom"
import DetailRecipe from "../Pages/DetailRecipe";

const router = createBrowserRouter([
	{
	  path: "/",
	  element: (
		<div>
		  <h1>Hello World</h1>
		  <Link to="about">About Us</Link>
		</div>
	  ),
	},
	{
	  path: "/detail/:slug",
	  element: <DetailRecipe/>,
	},
  ]);

export default router