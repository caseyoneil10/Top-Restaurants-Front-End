import axios from 'axios'
import {useState, useEffect} from 'react'
import Restaurants from './components/restaurants'



const App = () => {

		const [newName, setNewName] = useState()
		const [newAddress, setNewAddress] = useState()
		const [newType, setNewType] = useState()
		const [newPrice, setNewPrice] = useState()
		const [newImage, setNewImage] = useState()
		const [newHours, setNewHours] = useState()
		const [newRank, setNewRank] = useState()
		const [restaurant, setRestaurant] = useState([])


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
      axios.post(
        'http://localhost:3000/restaurants',
        {
          name: newName,
          address: newAddress,
          type: newType,
          price: newPrice,
          image: newImage,
          hours: newHours,
          rank: newRank,
        }
      ).then(() => {
          axios.get('http://localhost:3000/restaurants').then((response) => {
                setRestaurant(response.data)
          })
      })
  }



		useEffect(() => {
		        axios.get('http://localhost:3000/restaurants').then((response) => {
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
			return<Restaurants restaurants={restaurants}/>
	})}

</>

)



}




export default App;
