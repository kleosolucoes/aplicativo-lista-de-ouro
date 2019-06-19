import React from 'react';
import {
	View,
	Text,
	Alert,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings'
import { white, lightdark, dark, gray, red, black } from '../helpers/colors'
import { connect } from 'react-redux'
import { alterarProspectoNoAsyncStorage } from '../actions'
import {LinearGradient} from 'expo'
import LOButton from '../components/LOButton';

class QualificarProspectoScreen extends React.Component {

	alterarProspecto = () => {
		if (this.state.rating > 0) {
			const { prospecto, alterarProspectoNoAsyncStorage, navigation } = this.props
			prospecto.rating = this.state.rating
			alterarProspectoNoAsyncStorage(prospecto)
			navigation.goBack()
		} else {
			Alert.alert('Aviso', 'Selecione uma qualificação')
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			alterarProspecto: this.alterarProspecto
		})
	}

	state = {
		rating: 0,
	}

	static navigationOptions = ({ navigation, }) => {
		const { params = {} } = navigation.state
		return {
			// title: 'Qualificar',
			headerStyle: {
				backgroundColor: black,
				borderBottomWidth: 0,
			},
			headerTitleStyle: {
				flex: 1,
				textAlign: 'center',
				alignSelf: 'center',
			},
			headerLeftContainerStyle: {
				padding: 10,
			},
			headerTintColor: white,
		}
	}


	render() {
		const { prospecto } = this.props

		return (
			<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
			<View style={styles.container}>
				<Text style={{ textAlign: "center", color: gray, fontSize: 18 }}>
					Qualifique a consolidação de acordo com o nível de interesse
				</Text>

				<View>
					<Text style={styles.name}>
						{prospecto && prospecto.nome}
					</Text>

					<AirbnbRating
						showRating={false}
						defaultRating={prospecto.rating}
						onFinishRating={(valor) => this.setState({ rating: valor })}
					/>
				</View>

				<LOButton 
					title="Qualificar"
					OnPress={() => this.alterarProspecto()}
				/>

			</View>
			</LinearGradient>
		)
	}
}

function mapStateToProps({ prospectos }, { navigation }) {
	const prospecto_id = navigation.state.params.prospecto_id + ''
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QualificarProspectoScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		justifyContent: "space-between",
		paddingBottom: 15,
	},
	name: {
		textAlign: "center",
		fontSize: 27,
		color: white,
		paddingVertical: 6,
	},
	button: {
		backgroundColor: red,
		height: 45,
		borderRadius: 6,
		justifyContent: 'center',
		marginHorizontal: 12,
	},
})