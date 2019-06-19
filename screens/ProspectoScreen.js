import React from 'react';
import {
	Alert,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input } from 'react-native-elements'
import { white, lightdark, dark, red, gray, black } from '../helpers/colors'
import {
	alterarProspectoNoAsyncStorage,
} from '../actions'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import { SITUACAO_MENSAGEM } from '../helpers/constants';
import LOButton from '../components/LOButton';

class ProspectoScreen extends React.Component {

	state = {
		nome: '',
		ddd: '',
		telefone: '',
		email: '',
	}

	componentDidMount = () => {
		const {
			prospectoSelecionado,
		} = this.props

		if (prospectoSelecionado) {
			this.setState({
				nome: prospectoSelecionado.nome,
				ddd: prospectoSelecionado.ddd,
				telefone: prospectoSelecionado.telefone,
				email: prospectoSelecionado.email ? prospectoSelecionado.email : '',
			})
		}
	}

	ajudadorDeSubmissao = () => {
		const {
			nome,
			ddd,
			telefone,
			email,
		} = this.state
		let {
			prospectoSelecionado,
		} = this.props

		let camposComErro = ''
		mostrarMensagemDeErro = false
		if (nome === '') {
			mostrarMensagemDeErro = true
			if (camposComErro === '') {
				camposComErro = 'Nome'
			}
		}

		if (ddd === '' || ddd.length !== 2) {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'DDD'
		}

		if (telefone === '' || telefone.length !== 9) {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'Telefone'
		}

		if (mostrarMensagemDeErro) {
			Alert.alert('Erro', `Campos invalidos: ${camposComErro}`)
		} else {
			let prospecto = {}
			if (prospectoSelecionado) {
				prospecto = prospectoSelecionado
			} else {
				prospecto.novo = true
				prospecto.id = Date.now() + ''
				prospecto.rating = null
				prospecto.online = false
				prospecto.situacao_id = SITUACAO_MENSAGEM
			}
			prospecto.nome = nome
			prospecto.ddd = ddd
			prospecto.telefone = telefone
			prospecto.email = email
			this.props.alterarProspectoNoAsyncStorage(prospecto)
			this.props.navigation.navigate('Prospectos')
		}
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			title: 'Novo Prospecto',
			headerTitleStyle: {
				flex: 1,
				textAlign: 'center',
				alignSelf: 'center',
				color: white,
			},
			headerTintColor: white,
		}
	}

	render() {
		const {
			nome,
			ddd,
			telefone,
			email,
		} = this.state
		return (
			<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>

				<KeyboardAwareScrollView style={{ flex: 1, padding: 20 }}
					enableOnAndroid enableAutomaticScroll={true} extraScrollHeight={80}
					keyboardShoulfPersistTaps='always'
				>

					<Input
						containerStyle={{ borderWidth: 1, borderColor: gray, borderRadius: 6 }}
						inputContainerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
						underlineColorAndroid="transparent"
						keyboardAppearance='dark'
						placeholder=""
						placeholderTextColor={'#ddd'}
						autoCorrect={false}
						label="NOME"
						inputStyle={{ color: white, marginLeft: 5 }}
						labelStyle={{ marginTop: 5, color: white }}
						value={nome}
						onChangeText={texto => this.setState({ nome: texto })}
						returnKeyType='next'
						onSubmitEditing={() => this.inputDDD.focus()}
					/>
					<View style={{ flexDirection: 'row', flex: 1 }}>
						<View style={{ marginRight: 6 }}>
							<Input
								containerStyle={{ borderWidth: 1, borderColor: gray, borderRadius: 6, marginTop: 10, paddingHorizontal: 15 }}
								inputContainerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
								underlineColorAndroid="transparent"
								keyboardType='phone-pad'
								keyboardAppearance='dark'
								placeholder=""
								placeholderTextColor={'#ddd'}
								autoCorrect={false}
								label="DDD"
								maxLength={2}
								inputStyle={{ color: white, marginLeft: 5 }}
								labelStyle={{ marginTop: 5, color: white }}
								value={ddd}
								onChangeText={texto => this.setState({ ddd: texto })}
								ref={(input) => { this.inputDDD = input; }}
								returnKeyType={'next'}
								onSubmitEditing={() => this.inputTelefone.focus()}
							/>
						</View>

						<View style={{ flex: 1 }}>
							<Input
								containerStyle={{ borderWidth: 1, borderColor: gray, borderRadius: 6, marginTop: 10 }}
								inputContainerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
								underlineColorAndroid="transparent"
								keyboardType='phone-pad'
								keyboardAppearance='dark'
								placeholder=""
								placeholderTextColor={'#ddd'}
								autoCorrect={false}
								label="TELEFONE"
								inputStyle={{ color: white, marginLeft: 5 }}
								labelStyle={{ marginTop: 5, color: white }}
								value={telefone}
								onChangeText={texto => this.setState({ telefone: texto })}
								ref={(input) => { this.inputTelefone = input; }}
								returnKeyType={'next'}
								onSubmitEditing={() => this.inputEmail.focus()}
							/>
						</View>

					</View>

					<Input
						containerStyle={{ borderWidth: 1, borderColor: gray, borderRadius: 6, marginVertical: 10 }}
						inputContainerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
						underlineColorAndroid="transparent"
						keyboardType='email-address'
						keyboardAppearance='dark'
						placeholder=""
						placeholderTextColor={'#ddd'}
						autoCorrect={false}
						label="EMAIL"
						inputStyle={{ color: white, marginLeft: 5 }}
						labelStyle={{ marginTop: 5, color: white }}
						value={email}
						onChangeText={texto => this.setState({ email: texto })}
						ref={(input) => { this.inputEmail = input; }}
						returnKeyType={'go'}
						onSubmitEditing={() => this.ajudadorDeSubmissao()}
					/>

					<LOButton
						title='Salvar'
						OnPress={() => { this.ajudadorDeSubmissao() }}
					/>

				</KeyboardAwareScrollView>
			</LinearGradient>

		)
	}
}

const mapStateToProps = ({ prospectos }, { navigation }) => {
	let prospectoSelecionado = null
	let prospecto_id = null
	if (navigation.state.params) {
		prospecto_id = navigation.state.params.prospecto_id
	}
	if (prospecto_id) {
		prospectoSelecionado = prospectos.find(prospecto => prospecto.id === prospecto_id)
	}
	return {
		prospectoSelecionado,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		alterarProspectoNoAsyncStorage: prospecto => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectoScreen)
