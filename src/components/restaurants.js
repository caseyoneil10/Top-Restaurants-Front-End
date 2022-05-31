const Restaurants = (props) => {
			return  (
				<main>
				<div>
				<ul>
					<li>{props.restaurants.name}</li>
					<li>{props.restaurants.address}</li>
					<li>{props.restaurants.type}</li>
					<li>{props.restaurants.chef}</li>
					<li>{props.restaurants.rank}</li>
					<img src={props.restaurants.image}/>
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
					<input onChange={props.handleNewName} defaultValue={props.restaurants.name}></input>
					<input defaultValue={props.restaurants.address} onChange={props.handleNewAddress}></input>
					<input defaultValue={props.restaurants.type} onChange={props.handleNewType}></input>
					<input defaultValue={props.restaurants.image} onChange={props.handleNewImage}></input>
					<input defaultValue={props.restaurants.rank} onChange={props.handleNewRank}></input>
					<input defaultValue={props.restaurants.chef} onChange={props.handleNewChef}></input>
					<input type='submit' value='Submit'></input>
					</form> : null }

				</div>
				</main>
		)
}


export default Restaurants
