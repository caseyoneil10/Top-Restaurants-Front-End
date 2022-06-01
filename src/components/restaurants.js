const Restaurants = (props) => {
			return  (
				<>
				<div className="container">
						<div className="card">
							<h2>{props.restaurants.name}</h2>
							<h3># {props.restaurants.rank} In The World</h3>
							<h4>{props.restaurants.address}</h4>
							<h5>Style of Food: {props.restaurants.type}</h5>
							<h6>Head Chef: {props.restaurants.chef}</h6>
							<img src={props.restaurants.image}/>
							<button onClick={(event) => {
							props.handleDelete(props.restaurants)
								}}>Delete Restaurant</button>
								<button onClick={(event) => {
							props.show(event, props.restaurants)
							}}>Edit Info</button>

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
						</div>

				</>
		)
}

export default Restaurants
