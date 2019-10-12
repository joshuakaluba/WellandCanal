import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class PrimaryButton extends React.Component {

    static propTypes = {
        onPress: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    componentWillMount() {
        this.setState({
            title: this.props.title.toUpperCase()
        });
    }

    state = {
        title: ''
    };

    render() {
        return (
            <Button
                title={this.state.title}
                textStyle={styles.textStyle}
                disabled={this.props.disabled ? this.props.disabled : false}
                onPress={this.props.onPress}
                icon={this.props.icon ? { name: this.props.icon } : {}}
                loading={this.props.loading ? this.props.loading : false}
                titleStyle={styles.titleStyle}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        margin: 30
    },
    buttonStyle: {
        backgroundColor: '#000',
        height: 45,
        borderColor: 'transparent',
        marginTop: 5,
        borderWidth: 0,
        borderRadius: 5
    },
    titleStyle: {
        fontWeight: '700',
        color: '#000'
    },
    textStyle: {
        color: '#fff'
    }
});