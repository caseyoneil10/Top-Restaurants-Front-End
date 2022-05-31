import axios from 'axios'
import {useState, useEffect} from 'react'
import Restaurants from './components/restaurants'

const App = () => {

	// const apiUrl = "https://still-coast-01389.herokuapp.com/restaurants"
	const apiUrl = "http://localhost:3000/restaurants"

	// -------------------
	// Hooks
	// -------------------
	const [newName, setNewName] = useState()
	const [newAddress, setNewAddress] = useState()
	const [newType, setNewType] = useState()
	const [newPrice, setNewPrice] = useState()
	const [newImage, setNewImage] = useState()
	const [newHours, setNewHours] = useState()
	const [newRank, setNewRank] = useState()
	const [restaurant, setRestaurant] = useState([])
	const [newShow, setNewShow] = useState(false)

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
    const handleNewPrice = (event) => {
        setNewPrice(event.target.value)
    }
    const handleNewHours = (event) => {
        setNewHours(event.target.value)
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
				price: newPrice,
				image: newImage,
				hours: newHours,
				rank: newRank,
				show: newShow,
			}
    	).then(() => {
		axios.get(`${apiUrl}`).then((response) => {
			setRestaurant(response.data)
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
			price: newPrice,
			image: newImage,
			hours: newHours,
			rank: newRank,
			show: newShow,
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
			
	const show = (event, restaurantData) => {
	event.preventDefault()
		axios
		.put(
			`${apiUrl}/${restaurantData._id}`,
			{
				name: restaurantData.name,
				address: restaurantData.address,
				type: restaurantData.type,
				price: restaurantData.price,
				image: restaurantData.image,
				hours: restaurantData.hours,
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
		</div>
		<form onSubmit={handleNewRestaurant}>
			<input placeholder='Restaurant Name' onChange={handleNewName}></input>
			<input placeholder='Address' onChange={handleNewAddress}></input>
			<input placeholder='Type of Food' onChange={handleNewType}></input>
			<input placeholder='Image Link' onChange={handleNewImage}></input>
			<input placeholder='Hours' onChange={handleNewHours}></input>
			<input placeholder='Rank' onChange={handleNewRank}></input>
			<input placeholder='Price' onChange={handleNewPrice}></input>
			<input type='submit' value='Submit'></input>
		</form>

		{restaurant.map((restaurants) => {
				return<Restaurants restaurants={restaurants} handleDelete={handleDelete} handleNewRestaurant={handleNewRestaurant}
				handleRestaurantUpdate={handleRestaurantUpdate}
				handleNewName={handleNewName}
				handleMNewAddress={handleNewAddress}
				handleNewRank={handleNewRank}
				handleNewType={handleNewType}
				handleNewImage={handleNewImage}
				handleNewPrice={handleNewPrice}
				handleNewHours={handleNewHours}
				show={show}/>
		})}
	</>
	)
}




export default App;
