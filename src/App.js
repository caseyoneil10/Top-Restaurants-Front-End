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
	{restaurant.map((restaurants) => {
			return<Restaurants restaurants={restaurants}/>
	})}

</>

)



}




export default App;
