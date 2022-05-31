const Restaurants = (props) => {
			return  (
				<main>
				<div>
				<ul>
					<li>{props.restaurants.name}</li>
					<li>{props.restaurants.type}</li>
					<li>{props.restaurants.price}</li>
					<li>{props.restaurants.rank}</li>
					<li>{props.restaurants.image}</li>
					<li>{props.restaurants.hours}</li>
					<li>{props.restaurants.address}</li>
				</ul>
					<button onClick={(event) => {
						props.handleDelete(props.restaurants)
					}}>Delete Restaurant</button>
					<button onClick={(event) => {
						props.show(event, props.restaurants)
					}}>Edit Info</button>
				</div>
				<div>
				{props.restaurants.show ? 
				<form onSubmit={(event) => {
						props.handleRestaurantUpdate(event, props.restaurants)
				}}>
					<input placeholder='Restaurant Name' onChange={props.handleNewName}></input>
					<input placeholder='Address' onChange={props.handleNewAddress}></input>
					<input placeholder='Type of Food' onChange={props.handleNewType}></input>
					<input placeholder='Image Link' onChange={props.handleNewImage}></input>
					<input placeholder='Hours' onChange={props.handleNewHours}></input>
					<input placeholder='Rank' onChange={props.handleNewRank}></input>
					<input placeholder='Price' onChange={props.handleNewPrice}></input>
					<input type='submit' value='Submit'></input>
					</form> : null }
					
				</div>
				</main>
		)
}


export default Restaurants
