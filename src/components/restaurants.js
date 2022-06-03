const Restaurants = (props) => {
	return  (
		<>
			{/* Displaying restaurant cards */}
			<div className="card">
				<h2>{props.restaurants.name}</h2>
				<h3># {props.restaurants.rank} In The World</h3>
				<h4>{props.restaurants.address}</h4>
				<h5>Style of Food: {props.restaurants.type}</h5>
				<h6>Head Chef: {props.restaurants.chef}</h6>
				<h6><a target="_blank" href={`${props.restaurants.website}`}>Website</a></h6>
				<img src={props.restaurants.image}/>

				{/* Google Maps embedded */}
				{props.restaurants.showMap ? <iframe
					className="map"
					src={`${props.googleUrl} + ${props.restaurants.address} + ${props.restaurants.name}`}>
				</iframe> : null }

				{/* Show Map button toggle */}
				{props.restaurants.showMap || props.restaurants.show ? null : <button onClick={(event) => {
					props.showMap(event, props.restaurants)
				}}>Show Map</button>}

				{/* Edit Info button toggle */}
				{props.restaurants.show ? null :
				<button className="edit" onClick={(event) => {
				props.show(event, props.restaurants)
				}}>Edit Info</button>}

				{/* Close Map Button toggle inside Show Map */}
				{props.restaurants.showMap ? <button className="delete" onClick={(event) => {
					props.showMap(event, props.restaurants)
				}}>Close Map</button> : null }

				{/* Edit Restaurant form */}
				{props.restaurants.show ?
					<form onSubmit={(event) => {
					props.handleRestaurantUpdate(event, props.restaurants)}}>
					<input type="text" onChange={props.handleNewName} defaultValue={props.restaurants.name}></input>
					<input type="text" defaultValue={props.restaurants.address} onChange={props.handleNewAddress}></input>
					<input type="text" defaultValue={props.restaurants.type} onChange={props.handleNewType}></input>
					<input type="text" defaultValue={props.restaurants.image} onChange={props.handleNewImage}></input>
					<input type="number" defaultValue={props.restaurants.rank} onChange={props.handleNewRank}></input>
					<input type="text" defaultValue={props.restaurants.chef} onChange={props.handleNewChef}></input>
					<input type="text" defaultValue={props.restaurants.website} onChange={props.handleNewWebsite}></input>
					<br/>
					<input className="edit" type='submit' value='Submit'></input>

					{/* Cancel button toggle inside Edit */}
					<button onClick={props.handleCancelEdit} className="delete button">Cancel</button>
					
					{/* Delete button toggle inside Edit */}
					<button className="delete" onClick={(event) => {
					props.handleDelete(props.restaurants)
					}}>Delete Restaurant</button>
				</form>
				: null }
			</div>
		</>
	)
}

export default Restaurants
