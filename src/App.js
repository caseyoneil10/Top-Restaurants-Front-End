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
	const [restaurant, setRestaurant] = useState([])
	const [newShow, setNewShow] = useState(false)
	const [newShowRestaurant, setNewShowRestaurant] = useState(false)

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

	const handleNewRestaurant = (event) => {
    	event.preventDefault()
			event.target.reset()
    	axios.post(
        `${apiUrl}`,
			{
				name: newName,
				address: newAddress,
				type: newType,
				chef: newChef,
				image: newImage,
				rank: newRank,
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
	axios
		.put(
		`${apiUrl}/${restaurantData._id}`,
		{
			name: newName,
			address: newAddress,
			type: newType,
			chef: newChef,
			image: newImage,
			rank: newRank,
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
			setNewShow(false)
		})
	})
	}

	const show = (event, restaurantData) => {
	event.preventDefault()
		axios
		.put(
			`${apiUrl}/${restaurantData._id}`,
			{
				name: restaurantData.name,
				address: restaurantData.address,
				type: restaurantData.type,
				chef: restaurantData.price,
				image: restaurantData.image,
				rank: restaurantData.rank,
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

	// -------------------
	// Use Effect
	// -------------------
	useEffect(() => {
			axios.get(`${apiUrl}`).then((response) => {
				setRestaurant(response.data)
			})
		}, [])

	return (
		<>
		<div>
		<h1>Top Restaurants in The World</h1>
		<button onClick={showNewRestaurant}>Add a new Restaurant to The List</button>
		</div>
		{newShowRestaurant ?
		<form onSubmit={handleNewRestaurant}>
			<input placeholder='Restaurant Name' onChange={handleNewName}></input>
			<input placeholder='Address' onChange={handleNewAddress}></input>
			<input placeholder='Type of Food' onChange={handleNewType}></input>
			<input placeholder='Image Link' onChange={handleNewImage}></input>
			<input placeholder='Rank' onChange={handleNewRank}></input>
			<input placeholder='Chef' onChange={handleNewChef}></input>
			<input type='submit' value='Submit'></input>
		</form> : null }

		{restaurant.map((restaurants) => {
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
				show={show}/>
		})}
	</>
	)
}




export default App;
