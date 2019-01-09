import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon, MapView } from 'expo';
import Markers from '../constants/Markers';
import Colors from '../constants/Colors';
import ajax from '../services/ajax';

export default class MapScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		onPress = () => {
			params.handleRefresh();
		};

		return {
			title: 'Map Status.',
			headerRight: (
				<View style={{ marginBottom: -3, marginRight: 10 }}>
					<TouchableOpacity onPress={this.onPress}>
						<Icon.Ionicons
							name={'md-refresh'}
							size={26}
							color={Colors.iconDefault}
						/>
					</TouchableOpacity>
				</View>
			)
		};
	};

	startLoading() {
		this.setState({ loading: true });
	}

	endLoading() {
		this.setState({ loading: false });
	}

	state = {
		bridges: [],
		loading: false
	};

	async componentWillMount() {
		this.props.navigation.setParams({
			handleRefresh: this.resetScreen.bind(this)
		});

		await this.resetScreen();
	}

	async resetScreen() {
		try {
			let bridges = await ajax.fetchWellandCanalBridgeStatus();

			this.setState({
				bridges
			});
		} catch (error) {
			this.setState({
				bridges: [],
				loading: false
			});
		}
	}

	render() {
		var output = {};

		if (this.state.bridges.length > 0) {
			output = (
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: 43.063422,
						longitude: -79.211246,
						latitudeDelta: 0.35,
						longitudeDelta: 0.0421
					}}
				>
					{this.state.bridges.map(item => (
						<MapView.Marker
							key={item.id}
							coordinate={item.coordinates}
							title={`${item.status} | ${item.name}`}
							description={item.location}
						>
							<Image
								style={{
									width: 25,
									height: 25,
									resizeMode: 'contain'
								}}
								source={{
									uri: Markers[item.availability]
								}}
							/>
						</MapView.Marker>
					))}
				</MapView>
			);
		} else {
			output = (
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: 43.063422,
						longitude: -79.211246,
						latitudeDelta: 0.35,
						longitudeDelta: 0.0421
					}}
				/>
			);
		}

		return output;
	}
}
