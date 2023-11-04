import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home.css'

const style = {
	h1: { color: 'var(--recipe-color-lavender)', fontSize: '48px', fontWeight: 900 },
	headerL: { width: '70vw', height: '100vh', backgroundColor: 'white', zIndex: '-3', marginTop: '-112px' },
	headerR: { width: '30vw', height: '100vh', backgroundColor: 'var(--recipe-color-yellow)', zIndex: '-2', marginTop: '-112px', position: 'relative' },
	headerBox: { padding: '20px', position: 'absolute', maxWidth: '500px', left: '16vw', top: '35vh', backgroundColor: 'white', borderRadius: '20px' },
	headerImg: { width: '600px', position: 'absolute', zIndex: -1, right: '12vw', top: '20vh' },
	sectionL: { height: '80vh', position: 'relative', minWidth: '450px' },
	sectionR: { height: '80vh', position: 'relative' },
	sectionLable: { color: 'var(--recipe-color-black)', fontSize: '48px', fontWeight: 900, margin: '0 auto' },
	sectionLableContainer: { borderLeft: 'var(--recipe-color-yellow) solid', borderWidth: '7px', padding: '0px 0px 0px 15px', position: 'absolute', top: '5%' },
	sectionTitle: { color: 'var(--recipe-color-black)', fontSize: '48px', fontWeight: 900 },
	newRecipeDecoration: { position: 'absolute', left: 0, top: '25%', zIndex: -1, height: '350px', width: '240px', backgroundColor: 'var(--recipe-color-yellow)', borderRadius: '5px' },
	contentBtn: { width: '180px', height: '53px', fontWeight: 600, color: 'white', backgroundColor: '#efc81a', textAlign: 'center', borderRadius: '36px' },
	popularDecoration: { position: 'absolute', left: '15%', top: '30%', width: '400px', height: '400px', border: 'var(--recipe-color-yellow) solid', borderRadius: '10px' }
}

export default function Home() {

	const [recipeList, setRecipeList] = React.useState([]);
	const [popularRecipe, setPopularRecipe] = React.useState([]);
	const [newRecipe, setNewRecipe] = React.useState([]);


	const initPage = async () => {
		try {
			const list = await axios({ method: 'get', url: `${window.env.BE_URL}/home/list` })
			const popular = await axios({ method: 'get', url: `${window.env.BE_URL}/home/popular` })
			const newRcp = await axios({ method: 'get', url: `${window.env.BE_URL}/home/new` })
			console.log(newRcp)
			setRecipeList(list?.data?.data)
			setPopularRecipe(popular?.data?.data)
			setNewRecipe(newRcp?.data?.data)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {

		initPage()

	}, [])



	return (
		<>
			<Navbar />
			{/* Header  */}
			<header className='d-flex' style={{ marginTop: '-112' }}>
				<div className='headerBox' style={style.headerBox}>
					<h1 style={style.h1}>Discover Recipe <br />& Delicious Food</h1>
					<input style={{ height: '48px' }} type="search" className='form-control' placeholder='Search restaurant, food' />
				</div>
				<div className='headerL' style={style.headerL}></div>
				<div className='headerR' style={style.headerR}></div>
				<img className='headerImg' style={style.headerImg} src="/assets/img/burger.png" alt="burger" />
			</header>
			{/* End Of Header */}

			{/* Popular Recipe Section */}
			{
				popularRecipe?.map((recipe, index) => {
					return (
						<section key={index} className='container' >
							<div className='row'>
								<div className='col-md-6 col-12' style={style.sectionL}>
									<div style={style.sectionLableContainer}>
										<p style={style.sectionLable}>Polular For You !</p>
									</div>
									<div className='decoration' style={style.popularDecoration}> </div>
									<img style={{
										position: 'absolute', left: '5%', top: '25%', width: '400px',
										height: '400px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px'
									}}
										src={recipe.image} alt="food" />
								</div>
								<div className='sectionR col-md-6 col-12' style={style.sectionR}>
									<div style={{ position: 'absolute', top: '30%' }}>
										<h2 style={style.sectionTitle}>
											{recipe.title}
										</h2>
										<hr style={{ borderWidth: '3px', width: '120px' }} />
										<p>
											{recipe.sort_desc}
										</p>
										<Link to={`/detail/${String(recipe.title).split(' ').join('-').toLowerCase()}`}>
											<button className='btn my-2 shadow-sm' style={style.contentBtn}>
												Lihat Resep
											</button>
										</Link>
									</div>
								</div>
							</div>
						</section>
					)
				})
			}
			{/* End of Popular Recipe Section */}

			{/* New Recipe Section */}
			{
				newRecipe?.map((recipe, index) => {
					return (
						<section keys={index} className='container' >
							<div className='row'>
								<div className='col-md-6 col-12' style={style.sectionL}>
									<div style={style.sectionLableContainer}>
										<p style={style.sectionLable}>Polular For You !</p>
									</div>
									<div className='decoration' style={style.newRecipeDecoration}> </div>
									<img style={{
										position: 'absolute', left: '8%', top: '30.6%', width: '400px',
										height: '400px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px'
									}}
										src={recipe.image} alt="food" />
								</div>
								<div className='sectionR col-md-6 col-12' style={style.sectionR}>
									<div style={{ position: 'absolute', top: '30%' }}>
										<h2 style={style.sectionTitle}>
											{recipe.title}
										</h2>
										<hr style={{ borderWidth: '3px', width: '120px' }} />
										<p>
											{recipe.sort_desc}
										</p>
										<Link to={`/detail/${String(recipe.title).split(' ').join('-').toLowerCase()}`}>
											<button className='btn my-2 shadow-sm' style={style.contentBtn}>
												Lihat Resep
											</button>
										</Link>
									</div>
								</div>
							</div>
						</section>
					)
				})
			}
			{/* End of New Recipe Section */}


			<div className='my-5' >
				<div className='container my-5' >
					<div style={{ borderLeft: 'var(--recipe-color-yellow) solid', borderWidth: '7px', padding: '0px 0px 0px 15px' }}>
						<p style={style.sectionLable}>Tummy, Happy!</p>
					</div>
				</div>
				<div className="container">
					<div className='row'>
						{recipeList?.map((recipe, index) => {
							return (
								<>
									<div key={index} className='col-lg-4 col-md-5 col-sm-6 col-xs-12 p-3 '
										style={{ borderRadius: '20px', wordWrap: 'break-word', position: 'relative' }} >
										<Link to={`/detail/${String(recipe.title).split(' ').join('-').toLowerCase()}`}>
											<div style={{ height: '400px' }}>
												<img style={{
													width: '100%', height: '100%',
													minWidth: '5vw',
													objectFit: 'cover',
													objectPosition: 'center', borderRadius: '12px'
												}}
													src={recipe.image} alt="popularFood" />
											</div>

											<button className='btn'
												style={{ top: '350px', left: '40px', backgroundColor: '#00000055', borderRadius: '8px', position: 'absolute' }}>
												<p style={{ textWrap: 'wrap', fontSize: '18px', fontWeight: 600, margin: 'unset', color: 'white' }}>
													{recipe.title}
												</p>
											</button>

										</Link>
									</div >
								</>


							)
						})}


					</div>
				</div>
			</div >


			<Footer />
		</>
	)
}
