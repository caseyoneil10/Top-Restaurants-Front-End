// Test comment
import axios from 'axios'
import {useState, useEffect} from 'react'
import Restaurants from './components/restaurants'

const App = () => {

		const apiUrl = "https://still-coast-01389.herokuapp.com/restaurants"
		// const apiUrl = "http://localhost:3000/restaurants"

		// -------------------
		// Hooks
		// -------------------
		const [newName, setNewName] = useState()
		const [newAddress, setNewAddress] = useState()
		const [newType, setNewType] = useState()
		const [newChef, setNewChef] = useState()
		const [newImage, setNewImage] = useState()
		const [newRank, setNewRank] = useState()
  const [newWebsite, setNewWebsite] = useState()
		const [restaurant, setRestaurant] = useState([])
		const [newShow, setNewShow] = useState(false)
		const [newShowRestaurant, setNewShowRestaurant] = useState(false)
		const [newShowSearch, setNewShowSearch] = useState(false)
		const [query, setQuery] = useState("")

		// -------------------
		// Handlers
		// -------------------
		const handleNewName = (event) => {
			setNewName(event.target.value)
		}
		const handleNewAddress = (event) => {
			setNewAddress(event.target.value)
		}
		const handleNewType = (event) => {
			setNewType(event.target.value)
		}
		const handleNewChef = (event) => {
			setNewChef(event.target.value)
		}
		const handleNewRank = (event) => {
			setNewRank(event.target.value)
		}
		const handleNewImage = (event) => {
			setNewImage(event.target.value)
		}
		const handleNewWebsite = (event) => {
			setNewWebsite(event.target.value)
		}

		const handleNewRestaurant = (event) => {
			event.preventDefault()
			event.target.reset()
			axios.post(
				`${apiUrl}`, {
					name: newName,
					address: newAddress,
					type: newType,
					chef: newChef,
					image: newImage,
					rank: newRank,
					website: newWebsite,
					show: newShow,
				}
			).then(() => {
				axios.get(`${apiUrl}`).then((response) => {
					setRestaurant(response.data)
					setNewShowRestaurant(false)
				})
			})
		}
		const handleDelete = (restaurantData) => {
			axios
				.delete(`${apiUrl}/${restaurantData._id}`)
				.then(() => {
					axios
						.get(`${apiUrl}`)
						.then((response) => {
							setRestaurant(response.data)
						})
				})
		}

		const handleRestaurantUpdate = (event, restaurantData) => {
			event.preventDefault()
			console.log("hello World");
			axios
				.put(
					`${apiUrl}/${restaurantData._id}`, {
						name: newName,
						address: newAddress,
						type: newType,
						chef: newChef,
						image: newImage,
						rank: newRank,
						website: newWebsite,
						show: newShow,
					}
				)
				.then(() => {
					axios
						.get(`${apiUrl}`)
						.then((response) => {
							setRestaurant(response.data)
							setNewName()
							setNewAddress()
							setNewType()
							setNewImage()
							setNewChef()
							setNewRank()
							setNewWebsite()
							setNewShow(false)
						})
				})
		}
		const show = (event, restaurantData) => {
			event.preventDefault()
			axios
				.put(
					`${apiUrl}/${restaurantData._id}`, {
						name: restaurantData.name,
						address: restaurantData.address,
						type: restaurantData.type,
						chef: restaurantData.price,
						image: restaurantData.image,
						rank: restaurantData.rank,
						website: restaurantData.website,
						show: !restaurantData.show,
					}
				)
				.then(() => {
					axios
						.get(`${apiUrl}`)
						.then((response) => {
							setRestaurant(response.data)
						})
				})
		}

		const showNewRestaurant = () => {
			setNewShowRestaurant(!newShowRestaurant)
		}
		const showNewSearch = () => {
			setNewShowSearch(!newShowSearch)
		}

		const handleCancelEdit = () => {
			setNewName()
			setNewAddress()
			setNewType()
			setNewImage()
			setNewChef()
			setNewRank()
			setNewWebsite()
		}


	// -------------------
	// Google Maps API
	// -------------------
	// get route from backend
	// const googleApi = process.env.REACT_APP_GOOGLEAPI
	const googleApi = "AIzaSyClQ8tspAMi43cFoURpHZ937ZxdeVYsQU0"
	const googleUrl =
		`https://www.google.com/maps/embed/v1/place?key=${googleApi}&q=`
		// -------------------
		// Use Effect
		// -------------------
		useEffect(() => {
			axios.get(`${apiUrl}`).then((response) => {
				setRestaurant(response.data)
			})
		}, [])

	return (
		<div className="container">
			<h1>Top Restaurants in The World</h1>
			<button className="button-primary" onClick={showNewRestaurant}>Add a new Restaurant to The List</button>
			<button className="button-primary" onClick={showNewSearch}>Search Restaurants</button>
			{newShowRestaurant ?
			<form className="newRestaurant" onSubmit={handleNewRestaurant}>
				<input type="text" required placeholder='Restaurant Name' onChange={handleNewName}></input>
				<input type="text" required placeholder='Address' onChange={handleNewAddress}></input>
				<input type="text" required placeholder='Type of Food' onChange={handleNewType}></input>
				<input type="text" required placeholder='Image Link' type="text" onChange={handleNewImage}></input>
				<input required type="number" min="1" placeholder='Rank' onChange={handleNewRank}></input>
				<input type="text" required placeholder='Chef' onChange={handleNewChef}></input>
				<input type="text" required placeholder='Website URL' onChange={handleNewWebsite}></input>
				<input type='submit' value='Submit'></input>
				<button className="button" value= "cancel" onClick={showNewRestaurant}>CANCEL</button>
			</form> : null }
			<br/>
			{newShowSearch ?
			<input className="search" placeholder="Search Here" onChange={(event) => {setQuery(event.target.value)}}/> : null}

			{restaurant.filter((posts) => {
					if (query === '') {
						return posts
					} else if (posts.address.toLowerCase().includes(query.toLowerCase())) {
						return posts
					} else if (posts.name.toLowerCase().includes(query.toLowerCase())){
						return posts
					}
			}).map((restaurants) => {
					return<Restaurants restaurants={restaurants}
					key={restaurants._id}
					handleDelete={handleDelete} handleNewRestaurant={handleNewRestaurant}
					handleRestaurantUpdate={handleRestaurantUpdate}
					handleNewName={handleNewName}
					handleNewAddress={handleNewAddress}
					handleNewRank={handleNewRank}
					handleNewType={handleNewType}
					handleNewImage={handleNewImage}
					handleNewChef={handleNewChef}
					handleNewWebsite={handleNewWebsite}
					googleApi={googleApi}
					googleUrl={googleUrl}
					handleCancelEdit={handleCancelEdit}
					show={show}/>
			})}
	</div>
	)
}




export default App;
