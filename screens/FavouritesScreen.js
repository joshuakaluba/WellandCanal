import React, { Component } from 'react';
import {
	ScrollView,
	View,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl,
	StyleSheet
} from 'react-native';
import { AdMobBanner } from 'expo';
import { Icon } from 'expo';
import { DeviceEventEmitter } from 'react-native';
import ajax from '../services/ajax';
import favourites from '../services/favourites';
import Colors from '../constants/Colors';
import BridgeList from '../components/BridgeList';
import AdmobIds from '../constants/AdmobIds';

const noFavs =
	"There are currently no stored favourites. Please add favourites from the 'Brige Status' page";

class FavouritesScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		onPress = () => {
			params.handleRefresh();
		};

		return {
			title: 'My Favourites',
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

	async refreshHandler() {
		await this.resetScreen();
	}

	state = {
		bridges: [],
		loading: false,
		noOutputText: noFavs,
		refreshControlLoading: false
	};

	async componentWillMount() {
		this.props.navigation.setParams({
			handleRefresh: this.refreshHandler.bind(this)
		});

		DeviceEventEmitter.addListener('favChangeRefresh', () => {
			console.log('await this.resetScreen();');
			this.resetScreen();
		});

		await this.resetScreen();
	}

	async resetScreen() {
		try {
			this.setState({
				bridges: []
			});

			this.startLoading();

			let bridges = await ajax.fetchWellandCanalBridgeStatus();
			const myfavourites = await favourites.getSplitFavourites();

			let filteredBridges = bridges.filter(function(bridge) {
				return myfavourites.includes(`${bridge.bridge_id}`);
			});

			this.setState({
				bridges: filteredBridges,
				noOutputText: noFavs
			});

			this.endLoading();
		} catch (error) {
			this.setState({
				bridges: [],
				noOutputText: error.message,
				loading: false
			});
		}
	}

	bannerError() {
		console.log('An error');
		return;
	}

	handleFavPress = async item => {
		await favourites.handleFavouritesClick(item);
		await this.resetScreen();

		DeviceEventEmitter.emit('bridgeStatusRefresh');
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.box, styles.body]}>
					<ActivityIndicator
						size="small"
						color={Colors.activityIndicator}
						animating={this.state.loading}
					/>

					<ScrollView
						style={{ marginBottom: 25 }}
						refreshControl={
							<RefreshControl
								refreshing={this.state.loading}
								onRefresh={this.resetScreen.bind(this)}
							/>
						}
					>
						<BridgeList
							bridges={this.state.bridges}
							noOutputText={this.state.noOutputText}
							onItemPress={this.handleFavPress}
						/>
					</ScrollView>
				</View>
				<View style={[styles.box, styles.footer]}>
					<AdMobBanner
						style={styles.bottomBanner}
						bannerSize="fullBanner"
						adUnitID={AdmobIds.favouritesBannerId}
						testDeviceID="EMULATOR"
						didFailToReceiveAdWithError={this.bannerError}
					/>
				</View>
			</View>
		);
	}
}
export default FavouritesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	box: {
		flex: 1
	},
	body: {
		flex: 10
	},
	footer: {
		flex: 1.5,
		marginTop: 'auto'
	},
	bottomBanner: {
		position: 'absolute',
		bottom: 0
	}
});
