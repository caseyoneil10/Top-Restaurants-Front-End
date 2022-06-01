const Restaurants = (props) => {
			return  (
				<main>
					<div>
						<div>
							<h1>{props.restaurants.name}</h1>
							<h2># {props.restaurants.rank} In The World</h2>
							<h2>{props.restaurants.address}</h2>
							<h3>{props.restaurants.type}</h3>
							<h4>{props.restaurants.chef}</h4>
							<img src={props.restaurants.image}/>
						</div>
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
							props.handleRestaurantUpdate(event, props.restaurants)}}>
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
