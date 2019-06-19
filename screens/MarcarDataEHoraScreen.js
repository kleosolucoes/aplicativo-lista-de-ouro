import React from 'react';
import {
	View,
	Text,
	Alert,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo'
import { white, dark, red, lightdark, gray, black } from '../helpers/colors'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { alterarProspectoNoAsyncStorage } from '../actions'
import { SITUACAO_LIGAR, SITUACAO_VISITAR, SITUACAO_FECHAMENTO } from '../helpers/constants'

class MarcarDataEHoraScreen extends React.Component {

	alterarProspecto = () => {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation, situacao_id } = this.props
		if (this.state.dataParaOAgendamento === null ||
			this.state.horaParaOAgendamento === null) {
			Alert.alert('Erro', 'Selecione a data e hora')
		} else {
			prospecto.data = this.state.dataParaOAgendamento
			prospecto.hora = this.state.horaParaOAgendamento
			if (this.state.local) {
				prospecto.local = this.state.local
			}
			prospecto.situacao_id = situacao_id
			alterarProspectoNoAsyncStorage(prospecto)
			let textoMarcouUmaApresentacao = ''
			switch (situacao_id) {
				case SITUACAO_LIGAR:
					textoMarcouUmaApresentacao = 'Visita marcada!'
					break;
				case SITUACAO_VISITAR:
					textoMarcouUmaApresentacao = 'Visita marcada!'
					break;
				case SITUACAO_FECHAMENTO:
					textoMarcouUmaApresentacao = 'Você remarcou, agora seu prospecto está na etapa "Fechamento"'
					break;
			}
			Alert.alert('Sucesso', textoMarcouUmaApresentacao)
			if (situacao_id === SITUACAO_VISITAR) {
				navigation.navigate('Prospectos')
			} else {
				navigation.goBack()
			}
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			alterarProspecto: this.alterarProspecto
		})
	}

	state = {
		selecionarDataMostrando: false,
		selecionarHoraMostrando: false,
		dataParaOAgendamento: null,
		horaParaOAgendamento: null,
		local: '',
		date: new Date(),
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			title: 'Marcar Data e Hora',
			headerTitleStyle: {
				flex: 1,
				textAlign: 'center',
				alignSelf: 'center',
				color: white,
			},
			headerTintColor: white,
			headerLeftContainerStyle: {
				padding: 10,
			},
		}
	}


	render() {
		const { prospecto } = this.props

		return (
			<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.container}
					keyboardShoulfPersistTaps='always'
					enableOnAndroid enableAutomaticScroll={true} extraScrollHeight={80} >


					<View style={{ paddingHorizontal: 10, borderWidth: 1, borderColor: gray, borderRadius: 6 }}>
						<Text style={{ fontSize: 16, color: white, fontWeight: "bold", marginTop: 6 }}>DATA</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<DatePicker
								style={{ flex: 1, }}
								date={this.state.dataParaOAgendamento}
								mode="date"
								placeholder=" "
								format="DD/MM/YYYY"
								minDate={this.state.date}
								confirmBtnText="Confirmar"
								cancelBtnText="Cancelar"
								showIcon={false}
								customStyles={{
									dateInput: {
										borderWidth: 0,
										alignItems: "flex-start",

									},
									dateText: {
										color: white,
										fontSize: 18,
										marginLeft: 4,
									}
								}}
								onDateChange={(date) => {
									this.setState({ dataParaOAgendamento: date })
								}}
							/>
						</View>
					</View>
					<View style={{ paddingHorizontal: 10, borderWidth: 1, borderColor: gray, borderRadius: 6, marginVertical: 10 }}>
						<Text style={{ fontSize: 16, color: white, fontWeight: "bold", marginTop: 6 }}>HORA</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<DatePicker
								style={{ flex: 1 }}
								date={this.state.horaParaOAgendamento}
								mode="time"
								placeholder=" "
								is24Hour={true}
								confirmBtnText="Confirmar"
								cancelBtnText="Cancelar"
								showIcon={false}
								customStyles={{
									dateInput: {
										borderWidth: 0,
										alignItems: 'flex-start',
									},
									dateText: {
										color: white,
										fontSize: 18,
										marginLeft: 4,
									}
								}}
								onDateChange={(date) => {
									this.setState({ horaParaOAgendamento: date })
								}}
							/>
						</View>
					</View>

					<View style={{ paddingHorizontal: 10, borderWidth: 1, borderColor: gray, borderRadius: 6 }}>
						<Text style={{ fontSize: 16, color: white, fontWeight: "bold", marginTop: 6 }}>LOCAL</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
							<TextInput
								keyboardAppearance='dark'
								placeholder=""
								style={{ color: white, fontSize: 18, marginLeft: 4, minHeight: 40, flex: 1 }}
								value={this.local}
								onChangeText={(text) => this.setState({ local: text })}
							/>
						</View>
					</View>

					<View style={styles.containerButton}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => this.alterarProspecto()}
						>
							<Text style={{ textAlign: "center", fontSize: 16, color: white }}>Marcar</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</LinearGradient>
		)
	}

}

function mapStateToProps({ prospectos }, { navigation }) {
	const prospecto_id = navigation.state.params.prospecto_id
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id),
		situacao_id: navigation.state.params.situacao_id
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarcarDataEHoraScreen)

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
	},
	containerButton: {
		paddingVertical: 10,
		marginTop: 10,
	},
	button: {
		backgroundColor: red,
		height: 45,
		borderRadius: 6,
		justifyContent: 'center',
		shadowOffset: { width: 5, height: 5, },
		shadowColor: 'rgba(0,0,0,0.3)',
		shadowOpacity: 1.0,
	},
})