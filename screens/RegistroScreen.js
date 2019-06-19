import React from 'react';
import { StyleSheet } from 'react-native';
import {
	Alert,
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	NetInfo,
	ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input } from 'react-native-elements'
import { dark, white, black, blue, lightdark, gray } from '../helpers/colors';
import { Icon } from 'native-base';
import {
	registrarNaAPI,
} from '../helpers/api'
import {
	alterarUsuarioNoAsyncStorage,
} from '../actions'
import { connect } from 'react-redux'
import LOButton from '../components/LOButton';
import { LinearGradient } from 'expo'

class RegistroScreen extends React.Component {

	static navigationOptions = {
		headerTitle: 'Registro',
		headerTintColor: white,
	}

	state = {
		carregando: false,
		nome: 'leo',
		ddd: '61',
		telefone: '998510703',
		email: 'falecomleonardopereira@gmail.com',
		senha: '123',
	}

	ajudadorDeSubmissao = () => {
		const {
			nome,
			ddd,
			telefone,
			email,
			senha,
		} = this.state
		let camposComErro = ''
		let mostrarMensagemDeErro = false

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

		if (email === '') {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'Email'
		}

		if (senha === '') {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'Senha'
		}

		if (mostrarMensagemDeErro) {
			Alert.alert('Erro', `Campos invalidos: ${camposComErro}`)
		} else {
			try {
				NetInfo.isConnected
					.fetch()
					.then(isConnected => {
						if (isConnected) {
							this.setState({ carregando: true })
							const dados = {
								nome,
								ddd,
								telefone,
								email,
								senha,
							}
							registrarNaAPI(dados)
								.then(resposta => {
									this.setState({ carregando: false })
									if (resposta.ok) {
										const usuario = {
											email,
											senha,
										}
										this.props.alterarUsuarioNoAsyncStorage(usuario)
											.then(() => {
												Alert.alert('Registro', 'Registrado com sucesso!')
												this.props.navigation.navigate('Prospectos')
											})
									} else {
										Alert.alert('Aviso', resposta.menssagem)
									}
								})
								.catch(error => console.log('error: ', error))
						} else {
							Alert.alert('Internet', 'Verifique sua internet!')
						}
					})
			} catch (err) {
				Alert.alert('Error', err)
			}
		}
	}

	render() {
		const {
			carregando,
			nome,
			ddd,
			telefone,
			email,
			senha,
		} = this.state
		return (
			<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
				<KeyboardAwareScrollView
					contentContainerStyle={styles.container}
					keyboardShoulfPersistTaps='always'
					enableOnAndroid enableAutomaticScroll={true} extraScrollHeight={80} >

					{
						carregando &&
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<ActivityIndicator
								size="large"
								color={blue}
							/>
						</View>
					}

					{
						!carregando &&
						<View>
							<Input
								containerStyle={{ borderWidth: 1, borderColor: gray, borderRadius: 6 }}
								inputContainerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
								underlineColorAndroid="transparent"
								keyboardAppearance='dark'
								onSubmitEditing={() => this.inputDDD.focus()}
								returnKeyType="next"
								placeholder=""
								placeholderTextColor={'#ddd'}
								autoCorrect={false}
								label="NOME"
								inputStyle={{ color: white, marginLeft: 5 }}
								labelStyle={{ marginTop: 5, color: white }}
								value={nome}
								onChangeText={texto => this.setState({ nome: texto })}
								returnKeyType={'next'}
								onSubmitEditing={() => this.inputDDD.focus()}

							/>

							<View style={{ marginTop: 8, flexDirection: "row" }}>

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

							<View style={{ marginTop: 8 }}>
								<Input
									containerStyle={{ borderWidth: 1, borderColor: gray, borderRadius: 6, marginVertical: 10 }}
									inputContainerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
									underlineColorAndroid="transparent"
									keyboardType='email-address'
									keyboardAppearance='dark'
									autoCapitalize="none"
									placeholder=""
									placeholderTextColor={'#ddd'}
									autoCorrect={false}
									label="EMAIL"
									inputStyle={{ color: white, marginLeft: 5 }}
									labelStyle={{ marginTop: 5, color: white }}
									value={email}
									onChangeText={texto => this.setState({ email: texto })}
									ref={(input) => { this.inputEmail = input; }}
									returnKeyType={'next'}
									onSubmitEditing={() => this.inputSenha.focus()}
								/>
							</View>

							<Input
								containerStyle={{ borderWidth: 1, borderColor: gray, borderRadius: 6, marginVertical: 10 }}
								inputContainerStyle={{ borderWidth: 0, borderColor: 'transparent' }}
								underlineColorAndroid="transparent"
								keyboardType='visible-password'
								secureTextEntry={true}
								keyboardAppearance='dark'
								placeholder=""
								placeholderTextColor={'#ddd'}
								autoCorrect={false}
								label="SENHA"
								inputStyle={{ color: white, marginLeft: 5 }}
								labelStyle={{ marginTop: 5, color: white }}
								value={senha}
								onChangeText={texto => this.setState({ senha: texto })}
								ref={(input) => { this.inputSenha = input; }}
								returnKeyType={'go'}
								onSubmitEditing={() => this.ajudadorDeSubmissao()}
							/>

							<LOButton
								title='Registrar'
								OnPress={() => this.ajudadorDeSubmissao()}
							/>
						</View>
					}

				</KeyboardAwareScrollView>
			</LinearGradient>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario)),
	}
}

export default connect(null, mapDispatchToProps)(RegistroScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	logo: {
		alignSelf: 'center',
		width: 205,
		height: 120,
	},
})

