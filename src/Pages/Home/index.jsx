import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const style = {
	h1: { color: 'var(--recipe-color-lavender)', fontSize: '48px', fontWeight: 900 },
	headerL: { width: '70vw', height: '100vh', backgroundColor: 'white', zIndex: '-3', marginTop: '-112px' },
	headerR: { width: '30vw', height: '100vh', backgroundColor: 'var(--recipe-color-yellow)', zIndex: '-2', marginTop: '-112px', position: 'relative' },
	headerBox: { padding: '20px', position: 'absolute', maxWidth: '500px', left: '16vw', top: '35vh', backgroundColor: 'white', borderRadius: '20px' },
	headerImg: { width: '600px', position: 'absolute', zIndex: -1, right: '12vw', top: '20vh' },
	sectionL: { height: '80vh', position: 'relative' },
	sectionR: { height: '80vh', position: 'relative' },
	sectionLable: { color: 'var(--recipe-color-black)', fontSize: '48px', fontWeight: 900, margin: '0 auto' },
	sectionLableContainer: { borderLeft: 'var(--recipe-color-yellow) solid', borderWidth: '7px', padding: '0px 0px 0px 15px', position: 'absolute', top: '5%' },
	sectionTitle: { color: 'var(--recipe-color-black)', fontSize: '48px', fontWeight: 900 },
	newRecipeDecoration: { position: 'absolute', left: 0, top: '25%', zIndex: -1, height: '350px', width: '240px', backgroundColor: 'var(--recipe-color-yellow)', borderRadius: '5px' },
	contentBtn: { width: '180px', height: '53px', fontWeight: 600, color: 'white', backgroundColor: '#efc81a', textAlign: 'center', borderRadius: '36px' },
	popularDecoration: { position: 'absolute', left: '15%', top: '30%', width: '400px', height: '400px', border: 'var(--recipe-color-yellow) solid', borderRadius: '10px' }
}

export default function Home() {
	return (
		<>
			<Navbar />
			{/* Header  */}
			<header className='d-flex' style={{ marginTop: '-112' }}>
				<div style={style.headerBox}>
					<h1 style={style.h1}>Discover Recipe <br />& Delicious Food</h1>
					<input style={{ height: '48px' }} type="search" className='form-control' placeholder='Search restaurant, food' />
				</div>
				<div style={style.headerL}></div>
				<div style={style.headerR}></div>
				<img style={style.headerImg} src="/assets/img/burger.png" alt="burger" />
			</header>
			{/* End Of Header */}

			{/* Popular Recipe Section */}
			<section className='container' >
				<div className='row'>
					<div className='col-md-6 col-12' style={style.sectionL}>
						<div style={style.sectionLableContainer}>
							<p style={style.sectionLable}>Polular For You !</p>
						</div>
						<div style={style.popularDecoration}> </div>
						<img style={{ position: 'absolute', left: '5%', top: '25%', width: '400px' }}
							src="/assets/img/popularFood.png" alt="food" />
					</div>
					<div className='col-md-6 col-12' style={style.sectionR}>
						<div style={{ position: 'absolute', top: '30%' }}>
							<p style={style.sectionTitle}>Healthy Bone Broth Ramen (Quick & Easy)</p>
							<hr style={{ borderWidth: '3px', width: '120px' }} />
							<p>
								Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That's right!
							</p>
							<button className='btn my-2 shadow-sm' style={style.contentBtn}>
								Learn More
							</button>
						</div>
					</div>
				</div>
			</section>
			{/* End of Popular Recipe Section */}

			{/* New Recipe Section */}
			<section className='container' >
				<div className='row'>
					<div className='col-md-6 col-12' style={style.sectionL}>
						<div style={style.sectionLableContainer}>
							<p style={style.sectionLable}>New Recipe</p>
						</div>
						<div style={style.newRecipeDecoration}> </div>
						<img style={{ width: '400px', position: 'absolute', left: '8%', top: '30.6%' }}
							src="/assets/img/popularFood.png" alt="food" />
					</div>
					<div className='col-md-6 col-12' style={style.sectionR}>
						<div style={{ position: 'absolute', top: '30%' }}>
							<p style={style.sectionTitle}>Healthy Bone Broth Ramen (Quick & Easy)</p>
							<hr style={{ borderWidth: '3px', width: '120px' }} />
							<p>
								Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That's right!
							</p>
							<button className='btn my-2 shadow-sm' style={style.contentBtn}>
								Learn More
							</button>
						</div>
					</div>
				</div>
			</section>
			{/* End of New Recipe Section */}


			<div className='my-5' >
				<div className='container my-5' >
					<div style={{ borderLeft: 'var(--recipe-color-yellow) solid', borderWidth: '7px', padding: '0px 0px 0px 15px' }}>
						<p style={style.sectionLable}>Polular For You !</p>
					</div>
				</div>
				<div className="container">
					<div className='row'>
						<div className='col-md-4 col-xs-12 p-2' style={{ borderRadius: '20px', wordWrap: 'break-word' }} >

							<img style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', objectPosition: 'center', borderRadius: '12px' }}
								src="/assets/img/popularFood.png" alt="popularFood" />

							<button className='btn' style={{ margin: '-100px 0 0 20px', backgroundColor: 'var(--recipe-color-yellow)', borderRadius: '8px' }}>
								<p style={{ textWrap: 'wrap', fontSize: '18px', fontWeight: 600, margin: 'unset', color: 'black'}}>Ayam bakar suka bumi</p>
							</button>

						</div>
					</div>
				</div>
			</div>


			<Footer />
		</>
	)
}
