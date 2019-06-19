import React from 'react';
import {
	Text,
	View,
	Alert,
	TouchableOpacity,
	Linking,
	Image,
	Platform
} from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { white, red, dark, gray } from '../helpers/colors'
import call from 'react-native-phone-call'
import email from 'react-native-email'
import {
	SITUACAO_MENSAGEM,
	SITUACAO_LIGAR,
	SITUACAO_FECHAMENTO,
	SITUACAO_REMOVIDO,
	SITUACAO_VISITAR,
	SITUACAO_ARENA,
	SITUACAO_FECHADO,
} from '../helpers/constants'
import { alterarProspectoNoAsyncStorage, alterarAdministracao } from '../actions'
import { connect } from 'react-redux'
import styles from './ProspectoStyle';
import Swipeable from 'react-native-swipeable';

class Prospecto2 extends React.Component {

	swipeable = null
	handleUserBeganScrollingParentView() {
		this.swipeable.recenter();
	}

	changeStart() {
		this.props.onSwipeStart
	}
	changeRelease() {
		this.props.onSwipeRelease
	}

	removerProspecto() {
		const { prospecto, alterarProspectoNoAsyncStorage } = this.props
		prospecto.situacao_id = SITUACAO_REMOVIDO
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Removido', 'foi removido!')
	}

	fecharProspecto() {
		const { prospecto, alterarProspectoNoAsyncStorage } = this.props
		prospecto.situacao_id = SITUACAO_FECHAMENTO
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Sucesso', 'Vamo pra cima!')
	}

	chamarOTelefoneDoCelular() {
		const { prospecto, alterarAdministracao, alterarProspectoNoAsyncStorage } = this.props
		let { administracao } = this.props
		administracao.ligueiParaAlguem = true
		administracao.prospectoSelecionado = prospecto
		alterarAdministracao(administracao)
		prospecto.ligueiParaAlguem = true
		alterarProspectoNoAsyncStorage(prospecto)
		call({ number: prospecto.telefone, prompt: false }).catch(console.error)
	}
	whatsapp() {
		const { prospecto, alterarAdministracao, alterarProspectoNoAsyncStorage } = this.props
		let { administracao } = this.props
		administracao.mandeiWhatsapp = true
		administracao.prospectoSelecionado = prospecto
		alterarAdministracao(administracao)
		prospecto.mandeiWhatsapp = true
		alterarProspectoNoAsyncStorage(prospecto)
		Linking.openURL(`https://api.whatsapp.com/send?phone=55${prospecto.ddd}${prospecto.telefone}`).catch((err) => console.error(err))
	}
	handleEmail = () => {
		const { prospecto } = this.props
		const to = prospecto.email // string or array of email addresses
		email(to, {
			// Optional additional arguments
			// cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
			// bcc: 'mee@mee.com', // string or array of email addresses
			subject: '',
			body: 'Lista de Ouro App'
		}).catch(console.error)
	}


	render() {
		const { prospecto, navigation } = this.props

		const rightButtons = [

			<TouchableOpacity
				onPress={() => { navigation.navigate('Prospecto', { prospecto_id: prospecto.id }) }}
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-start',
					backgroundColor: red,
					paddingLeft: 30,
				}}
			>
				<Icon name="pencil" size={22} color={white} type='font-awesome' />
			</TouchableOpacity>,
			<TouchableOpacity
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-start',
					backgroundColor: red,
					paddingLeft: 30,
				}}
				onPress={() => { this.removerProspecto() }} >
				<Icon name="trash" size={22} color={white} type='font-awesome' />
			</TouchableOpacity>
		]
		return (
			<Card containerStyle={styles.containerCard} key={prospecto.id}>
				<Swipeable
					rightButtons={rightButtons}
					onRef={ref => this.swipeable = ref}
					onSwipeStart={this.props.onSwipeStart}
					onSwipeRelease={this.props.onSwipeRelease}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
						{
							prospecto.data && prospecto.situacao_id === SITUACAO_VISITAR &&
							<View style={styles.date}>
								<View style={{
									borderRadius: 9, backgroundColor: red, borderWidth: 0,
									paddingHorizontal: 4, paddingVertical: 2
								}}>
									<Text style={{ color: white, fontSize: 12 }}>
										{prospecto.data} - {prospecto.hora} {prospecto.local && `-`} {prospecto.local}
									</Text>
								</View>
							</View>
						}
					</View>

					<View style={styles.name_phone}>
						<TouchableOpacity
							onPress={() => { navigation.navigate('QualificarProspecto', { prospecto_id: prospecto.id }) }}
						>

							<View style={styles.content}>
								<View style={{ alignItems: 'center', justifyContent: 'center' }}>
									<Icon
										name='star'
										size={34}
										color={red}
										type='font-awesome'
										containerStyle={{ marginRight: 6 }}
									/>
									<Text style={{ position: "absolute", left: 11.5, top: 9, color: dark, fontWeight: 'bold' }}>{prospecto.rating}</Text>
								</View>

								<Text style={[styles.text, style = { fontWeight: 'bold' }]}>{prospecto.nome}</Text>
							</View>
						</TouchableOpacity>


						<View style={{ flexDirection: 'row' }}>
							{
								prospecto.situacao_id === SITUACAO_MENSAGEM &&
								<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3, flexDirection: 'row' }}>
									<TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
										const { prospecto, alterarAdministracao, alterarProspectoNoAsyncStorage } = this.props
										let { administracao } = this.props
										administracao.mandeiWhatsapp = true
										administracao.prospectoSelecionado = prospecto
										alterarAdministracao(administracao)
										prospecto.mandeiWhatsapp = true
										alterarProspectoNoAsyncStorage(prospecto)
									}

									}>
										<Icon name="bars" size={22} color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
									<TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { this.whatsapp() }} >
										<Icon name="whatsapp" size={22} color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
								</View>

							}
							{
								prospecto.situacao_id === SITUACAO_LIGAR &&
								<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3, flexDirection: 'row' }}>
									<TouchableOpacity
										onPress={() => {
											const { prospecto, alterarAdministracao, alterarProspectoNoAsyncStorage } = this.props
											let { administracao } = this.props
											administracao.ligueiParaAlguem = true
											administracao.prospectoSelecionado = prospecto
											alterarAdministracao(administracao)
											prospecto.ligueiParaAlguem = true
											alterarProspectoNoAsyncStorage(prospecto)
										}}
									>
										<Icon name='bars' type='font-awesome' color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
									<TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { this.chamarOTelefoneDoCelular() }} >
										<Icon name="phone" size={22} containerStyle={{ marginRight: 6 }} color={gray} />
									</TouchableOpacity>
								</View>
							}
							{
								prospecto.situacao_id === SITUACAO_VISITAR &&
								<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3 }}>
									<TouchableOpacity
										onPress={() => { navigation.navigate('Perguntas', { prospecto_id: prospecto.id }) }}
									>
										<Icon name='list' type='font-awesome' color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
								</View>
							}

							{
								prospecto.situacao_id === SITUACAO_ARENA &&
								<View style={{ backgroundColor: 'transparent', padding: 4, borderRadius: 4, marginLeft: 3 }}>
									<TouchableOpacity
										onPress={() => { navigation.navigate('Perguntas', { prospecto_id: prospecto.id }) }}
									>
										<Icon name='list' type='font-awesome' color={gray} containerStyle={{ marginRight: 6 }} type='font-awesome' />
									</TouchableOpacity>
								</View>
							}


						</View>
					</View>
				</Swipeable>

			</Card>
		)
	}
}

function mapStateToProps({ administracao }) {
	return {
		administracao
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
		alterarAdministracao: (administracao) => dispatch(alterarAdministracao(administracao)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Prospecto2)
