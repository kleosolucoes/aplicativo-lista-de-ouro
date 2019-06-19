import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	NetInfo,
	Platform
} from 'react-native';
import { Icon, Card, CheckBox } from 'react-native-elements'
import { Drawer, Header, Title, Left, Body, Right, Fab, Button } from 'native-base'
import SideBar from '../components/SideBar'
import { createBottomTabNavigator } from 'react-navigation'
import AddButton from '../components/AddButton'
import { white, red, dark, lightdark, black } from '../helpers/colors'
import ListaDeProspectos from '../components/ListaDeProspectos'
import { LinearGradient } from 'expo'
import { connect } from 'react-redux'
import {
	SITUACAO_MENSAGEM,
	SITUACAO_LIGAR,
	SITUACAO_VISITAR,
	SITUACAO_FECHAMENTO,
	SITUACAO_REMOVIDO,
	SITUACAO_ARENA,
	SITUACAO_FECHADO,
} from '../helpers/constants'
import styles from '../components/ProspectoStyle';
import {
	alterarProspectoNoAsyncStorage,
	alterarAdministracao,
	alterarUsuarioNoAsyncStorage,
	pegarProspectosNoAsyncStorage,
	pegarUsuarioNoAsyncStorage,
	adicionarProspectosAoAsyncStorage,
} from '../actions'
import {
	sincronizarNaAPI,
	recuperarHistoricoNaoSincronizado,
	limparHistoricos,
} from '../helpers/api'

class ProspectosScreen extends React.Component {

	state = {
		carregando: true,
		enviou: false,
		naoEnviou: false,
		ligou: false,
		naoLigou: false,
		pendente: false,
		active: false,
		sincronizando: false,
	}

	closeDrawer = () => {
		this.drawer._root.close()
	};
	openDrawer = () => {
		this.drawer._root.open()
	};

	componentDidMount() {
		this.props.navigation.setParams({
			sincronizar: this.sincronizar
		})
		this.props
			.pegarProspectosNoAsyncStorage()
			.then(() => this.setState({ carregando: false }))
		this.props
			.pegarUsuarioNoAsyncStorage()
	}

	novoProspecto = () => {
		this.props.navigation.navigate('NovoProspecto')
		this.setState(state => ({ active: state.active = false }))
	}
	importarProspecto = () => {
		this.props.navigation.navigate('ImportarProspectos')
		this.setState(state => ({ active: state.active = false }))
	}

	alterarProspecto = (tipo) => {
		const {
			alterarProspectoNoAsyncStorage,
			alterarAdministracao,
			administracao,
		} = this.props
		let prospecto = administracao.prospectoSelecionado

		administracao.ligueiParaAlguem = false
		administracao.mandeiWhatsapp = false
		administracao.prospectoSelecionado = null
		alterarAdministracao(administracao)

		if (tipo === 'remover') {
			prospecto.situacao_id = SITUACAO_REMOVIDO
		}
		if (tipo === 'sim') {
			prospecto.situacao_id = SITUACAO_LIGAR
		}
		prospecto.ligueiParaAlguem = false
		administracao.mandeiWhatsapp = false
		alterarProspectoNoAsyncStorage(prospecto)

		if (tipo === 'remover') {
			Alert.alert('Removido', 'removido!')
		} else {
			Alert.alert('Sucesso!', 'OK!')
		}
	}

	marcarDataEHora = () => {
		const {
			alterarProspectoNoAsyncStorage,
			alterarAdministracao,
			administracao,
			navigation,
		} = this.props
		let prospecto = administracao.prospectoSelecionado

		administracao.ligueiParaAlguem = false
		administracao.mandeiWhatsapp = false
		administracao.prospectoSelecionado = null
		alterarAdministracao(administracao)

		prospecto.ligueiParaAlguem = false
		prospecto.mandeiWhatsapp = false
		alterarProspectoNoAsyncStorage(prospecto)

		this.setState({
			ligou: false,
			naoLigou: false,
			pendente: false,
		})

		navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_VISITAR })
	}

	sincronizar = () => {
		try {
			NetInfo.isConnected
				.fetch()
				.then(isConnected => {
					if (isConnected) {
						const {
							usuario,
							navigation,
							adicionarProspectosAoAsyncStorage,
							alterarUsuarioNoAsyncStorage,
						} = this.props
						if (usuario.email) {
							this.setState({ carregando: true })
							let dados = {
								email: usuario.email,
								senha: usuario.senha,
							}
							recuperarHistoricoNaoSincronizado()
								.then(historicos => {
									//dados.historicos = historicos
									dados.historicos = []

									sincronizarNaAPI(dados)
										.then(retorno => {
											let alertTitulo = ''
											let alertCorpo = ''
											if (retorno.ok) {
												if (retorno.resultado.prospectos) {
													const prospectosParaAdicionar = retorno.resultado.prospectos
														.map(prospecto => {
															prospecto.id = prospecto._id
															prospecto.rating = null
															prospecto.situacao_id = 1
															prospecto.online = true
															delete prospecto._id
															return prospecto
														})
													adicionarProspectosAoAsyncStorage(prospectosParaAdicionar)
												}
												limparHistoricos()
												alertTitulo = 'Sincronização'
												alertCorpo = 'Sincronizado com sucesso!'
												this.setState({ carregando: false })
												Alert.alert(alertTitulo, alertCorpo)
											} else {
												alertTitulo = 'Aviso'
												alertCorpo = 'Usuário/Senha não conferem!'
												alterarUsuarioNoAsyncStorage({})
													.then(() => {
														this.setState({ carregando: false })
														Alert.alert(alertTitulo, alertCorpo)
													})
											}
										})
										.catch(err => console.log('err: ', err))
								})
						} else {
							navigation.navigate('Login')
						}
					} else {
						Alert.alert('Internet', 'Verifique sua internet!')
					}
				})
		} catch (err) {
			Alert.alert('Error', err)
		}
	}

	static navigationOptions = () => {
		return {
			header: null,
			gesturesEnabled: false,
		}
	}

	render() {
		const {
			prospectos,
			administracao,
			navigation,
		} = this.props
		const {
			carregando,
			enviou,
			ligou,
			naoLigou,
			pendente,
		} = this.state

		const ListaDeProspectosTelefonar = (props) => (
			<ListaDeProspectos
				title={'Mensagem'}
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_MENSAGEM)}
				navigation={navigation}
			/>
		)

		const ListaDeProspectosApresentar = (props) => (
			<ListaDeProspectos
				title={'Ligar'}
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_LIGAR)}
				navigation={navigation}
			/>)

		const ListaDeProspectosAcompanhar = (props) => (
			<ListaDeProspectos
				title={'Visitar'}
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_VISITAR)}
				navigation={navigation}
			/>)
		const ListaDeProspectosFechamento = (props) => (
			<ListaDeProspectos
				title={'Celula/Culto'}
				prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_ARENA)}
				navigation={navigation}
			/>)
		const Tabs = createBottomTabNavigator(
			{
				Telefonar: {
					screen: ListaDeProspectosTelefonar,
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='whatsapp' type='font-awesome' color={tintColor} />
						),
					}
				},
				Apresentar: {
					screen: ListaDeProspectosApresentar,
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='phone' type='font-awesome' color={tintColor} />
						),
					}
				},
				add: {
					screen: () => null,
					navigationOptions: () => ({
						tabBarButtonComponent: () => (
							<AddButton navigation={navigation} />
						),
					}),
				},
				Acompanhar: {
					screen: ListaDeProspectosAcompanhar,
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='info-circle' type='font-awesome' color={tintColor} />
						),
					}
				},
				Fechamento: {
					screen: ListaDeProspectosFechamento,
					navigationOptions: {
						tabBarIcon: ({ tintColor }) => (
							<Icon name='trophy' type='font-awesome' color={tintColor} />
						),
					}
				},
			},
			{
				tabBarOptions: {
					showIcon: true,
					showLabel: false,
					activeTintColor: red,
					inactiveTintColor: '#eee',
					style: {
						backgroundColor: dark,
					},
					indicatorStyle: {
						backgroundColor: red,
					},
				}
			}
		)

		return (
			<Drawer
				ref={(ref) => { this.drawer = ref; }}
				content={<SideBar closeDrawer={this.closeDrawer} navigation={this.props.navigation} />}
				onClose={() => this.closeDrawer()}
			>
				<Header style={{
					backgroundColor: black, borderBottomWidth: 0,
					paddingTop: Platform.OS === 'ios' ? 10 : 0,
					paddingLeft: 10
				}} iosBarStyle="light-content">
					<Left style={{ flex: 0 }}>
						<TouchableOpacity
							style={{ backgroundColor: 'transparent', margin: 0, borderWidth: 0, paddingHorizontal: 8 }}
							onPress={() => this.openDrawer()}>
							<Icon type="font-awesome" name="bars" color={white} />
						</TouchableOpacity>
					</Left>
					<Body style={{ flex: 1 }}>
						<Title style={{ textAlign: 'center', alignSelf: 'center', justifyContent: "center", color: white, fontWeight: '200', fontSize: 16 }}>BLACK BELT</Title>
					</Body>
					<Right style={{ flex: 0 }}>
						{/* <TouchableOpacity
							style={{ backgroundColor: 'transparent', borderWidth: 0, paddingHorizontal: 8 }}
							onPress={() => this.sincronizar()}>
							<Icon name='download' type='font-awesome' color={white} />
						</TouchableOpacity> */}
					</Right>
				</Header>

				<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
					<View style={{ flex: 1, }}>

						{
							carregando &&
							<View style={{ flex: 1, justifyContent: 'center' }}>
								<ActivityIndicator
									size="large"
									color={red}
								/>
							</View>
						}

						{
							!carregando &&
							!administracao.ligueiParaAlguem && !administracao.mandeiWhatsapp &&
							<Tabs />
						}

						{
							!carregando && !administracao.mandeiWhatsapp &&
							administracao.ligueiParaAlguem &&
							<Card containerStyle={{ backgroundColor: dark, borderColor: red, borderRadius: 6 }}>
								<Text style={{
									color: white, textAlign: 'center', fontWeight: 'bold',
									paddingBottom: 8
								}}
								>
									Atendeu?
								</Text>
								<View style={{ backgroundColor: lightdark, height: 180, marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
									<CheckBox
										title='Sim'
										checked={this.state.ligou}
										onPress={() => this.setState({
											ligou: true,
											naoLigou: false,
											pendente: false,
										})}
										checkedIcon='dot-circle-o'
										uncheckedIcon='circle-o'
										checkedColor={red}
										textStyle={{ color: white }}
										containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
									/>
									<CheckBox
										title='Não'
										checked={this.state.naoLigou}
										onPress={() => this.setState({
											ligou: false,
											naoLigou: true,
											pendente: false,
										})}
										checkedIcon='dot-circle-o'
										uncheckedIcon='circle-o'
										checkedColor={red}
										textStyle={{ color: white }}
										containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
									/>
									<CheckBox
										title='Ligar depois'
										checked={this.state.pendente}
										onPress={() => this.setState({
											ligou: false,
											naoLigou: false,
											pendente: true,
										})}
										checkedIcon='dot-circle-o'
										uncheckedIcon='circle-o'
										checkedColor={red}
										textStyle={{ color: white }}
										containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
									/>
								</View>

								<View style={{ backgroundColor: dark, height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15 }}>
									{
										this.state.ligou &&
										<TouchableOpacity
											style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: red }]}
											onPress={() => { this.marcarDataEHora() }}>
											<Text style={styles.textButton}>Marcar visita</Text>
										</TouchableOpacity>
									}
									{
										this.state.naoLigou &&
										<TouchableOpacity
											style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: red }]}
											onPress={() => { this.alterarProspecto('remover') }}>
											<Text style={styles.textButton}>Remover</Text>
										</TouchableOpacity>
									}
									{
										this.state.pendente &&
										<TouchableOpacity
											style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: red }]}
											onPress={() => { this.alterarProspecto() }}>
											<Text style={styles.textButton}>Ligar depois</Text>
										</TouchableOpacity>
									}
								</View>

							</Card>
						}
						{!carregando && !administracao.ligueiParaAlguem && administracao.mandeiWhatsapp &&

							<Card containerStyle={{ backgroundColor: dark, borderColor: red, borderRadius: 6 }}>
								<Text style={{
									color: white, textAlign: 'center', fontWeight: 'bold',
									paddingBottom: 8
								}}
								>
									Mensagem foi enviada?
								</Text>
								<View style={{ backgroundColor: lightdark, height: 180, marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
									<CheckBox
										title='Sim'
										checked={this.state.enviou}
										onPress={() => this.setState({
											enviou: true,
											ligou: false,
											naoLigou: false,
											pendente: false,
										})}
										checkedIcon='dot-circle-o'
										uncheckedIcon='circle-o'
										checkedColor={red}
										textStyle={{ color: white }}
										containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
									/>
									<CheckBox
										title='Não'
										checked={this.state.pendente}
										onPress={() => this.setState({
											enviou: false,
											ligou: false,
											naoLigou: false,
											pendente: true,
										})}
										checkedIcon='dot-circle-o'
										uncheckedIcon='circle-o'
										checkedColor={red}
										textStyle={{ color: white }}
										containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
									/>
								</View>

								<View style={{ backgroundColor: dark, height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15 }}>
									{
										this.state.ligou &&
										<TouchableOpacity
											style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: red }]}
											onPress={() => { this.marcarDataEHora() }}>
											<Text style={styles.textButton}>Marcar Apresentação</Text>
										</TouchableOpacity>
									}
									{
										this.state.naoLigou &&
										<TouchableOpacity
											style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: red }]}
											onPress={() => { this.alterarProspecto('remover') }}>
											<Text style={styles.textButton}>Remover</Text>
										</TouchableOpacity>
									}
									{
										this.state.enviou &&
										<TouchableOpacity
											style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: red }]}
											onPress={() => { this.alterarProspecto('sim') }}>
											<Text style={styles.textButton}>Salvar</Text>
										</TouchableOpacity>
									}
									{
										this.state.pendente &&
										<TouchableOpacity
											style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: red }]}
											onPress={() => { this.alterarProspecto() }}>
											<Text style={styles.textButton}>Voltar</Text>
										</TouchableOpacity>
									}
								</View>

							</Card>

						}
					</View>
				</LinearGradient>
			</Drawer>
		)
	}
}

function mapStateToProps({ prospectos, usuario, administracao, }) {
	return {
		prospectos,
		usuario,
		administracao,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
		alterarAdministracao: (administracao) => dispatch(alterarAdministracao(administracao)),
		alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario)),
		pegarProspectosNoAsyncStorage: () => dispatch(pegarProspectosNoAsyncStorage()),
		pegarUsuarioNoAsyncStorage: () => dispatch(pegarUsuarioNoAsyncStorage()),
		adicionarProspectosAoAsyncStorage: (prospectos) => dispatch(adicionarProspectosAoAsyncStorage(prospectos)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectosScreen)
