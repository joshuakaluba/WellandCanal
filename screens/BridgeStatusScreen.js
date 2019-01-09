import React, { Component } from 'react';
import {
	DeviceEventEmitter,
	ScrollView,
	View,
	StyleSheet,
	RefreshControl,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import { Icon } from 'expo';

import SearchBar from '../components/SearchBar';
import BridgeList from '../components/BridgeList';
import Colors from '../constants/Colors';
import ajax from '../services/ajax';
import favourites from '../services/favourites';

const noData = 'No data currently available. Please refresh';

class BridgeStatusScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		onPress = () => {
			params.handleRefresh();
		};

		return {
			title: 'Bridge Status',
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
		DeviceEventEmitter.emit('resetSearchBar', { name: 'John', age: 23 });

		await this.resetScreen();
	}

	state = {
		bridges: [],
		originalBridges: [],
		noOutputText: noData,
		searchTerm: '',
		activeSearchTerm: '',
		loading: false
	};

	async componentWillMount() {
		this.props.navigation.setParams({
			handleRefresh: this.refreshHandler.bind(this)
		});

		await this.resetScreen();

		DeviceEventEmitter.addListener('bridgeStatusRefresh', data => {
			console.log('await this.resetScreen();');
			this.resetScreen();
		});
	}

	async resetScreen() {
		try {
			this.startLoading();

			let bridges = await ajax.fetchWellandCanalBridgeStatus();

			this.setState({
				bridges,
				originalBridges: bridges,
				searchTerm: '',
				noOutputText: noData,
				activeSearchTerm: ''
			});

			this.endLoading();
		} catch (error) {
			this.setState({
				bridges: [],
				originalBridges: [],
				noOutputText: error.message,
				searchTerm: '',
				activeSearchTerm: '',
				loading: false
			});
		}
	}

	searchBridges = async searchTerm => {
		searchTerm = searchTerm.toLowerCase();

		const filtered = this.state.originalBridges.filter(function(bridge) {
			const locationFound =
				bridge.location.toLowerCase().indexOf(searchTerm) > -1;
			const nameFound = bridge.name.toLowerCase().indexOf(searchTerm) > -1;
			return locationFound || nameFound;
		});

		this.setState({
			bridges: filtered,
			searchTerm: searchTerm
		});
	};

	handleFavPress = async item => {
		await favourites.handleFavouritesClick(item);
		await this.resetScreen();

		DeviceEventEmitter.emit('favChangeRefresh');
	};

	render() {
		const bridgesToDisplay =
			this.state.searchTerm.length > 0
				? this.state.bridges
				: this.state.originalBridges;

		return (
			<View style={styles.container}>
				<ActivityIndicator
					size="small"
					color={Colors.activityIndicator}
					animating={this.state.loading}
				/>
				<View style={[styles.box, styles.header]}>
					<SearchBar
						searchBridges={this.searchBridges}
						initialSearchTerm={this.state.activeSearchTerm}
					/>
				</View>
				<View style={[styles.box, styles.body]}>
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
							bridges={bridgesToDisplay}
							noOutputText={this.state.noOutputText}
							resetScreen={this.resetScreen}
							onItemPress={this.handleFavPress}
						/>
					</ScrollView>
				</View>
			</View>
		);
	}
}
export default BridgeStatusScreen;

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
	header: {
		flex: 1,
		marginTop: 'auto'
	}
});
