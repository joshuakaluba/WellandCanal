import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Stars from '../constants/Stars';
import favourites from '../services/favourites';

export default class FavouriteButton extends React.Component {
	static propTypes = {
		bridge_id: PropTypes.number.isRequired
	};

	state = {
		id: 0,
		image: Stars.regular
	};

	async componentWillMount() {
		let id = this.props.bridge_id;

		const currentFavourites = await favourites.getSplitFavourites();

		let img = this.state.image;

		if (currentFavourites.includes(`${id}`)) {
			img = Stars.favoutite;
		}

		this.setState({ image: img, id: id });
	}

	render() {
		return (
			<Image
				style={[styles.button]}
				source={{
					uri: this.state.image
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		width: 25,
		marginLeft: 'auto',
		height: 25,
		resizeMode: 'contain'
	}
});
