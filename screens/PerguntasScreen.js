import React from 'react';
import {
	View,
	Text,
	Alert,
	TouchableOpacity,
} from 'react-native';
import { Button, Card, Icon, Input, CheckBox } from 'react-native-elements'
import { white, gray, black, lightdark, dark, blue } from '../helpers/colors'
import { connect } from 'react-redux'
import { SITUACAO_VISITAR, SITUACAO_FECHADO, SITUACAO_FECHAMENTO, SITUACAO_ARENA, SITUACAO_MENSAGEM, SITUACAO_LIGAR } from '../helpers/constants'
import { alterarProspectoNoAsyncStorage } from '../actions'
import { LinearGradient } from 'expo'
import LOButton from '../components/LOButton';
import styles from '../components/ProspectoStyle';
import MarcarDataEHoraScreen from './MarcarDataEHoraScreen';

class PerguntasScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Situação',
			headerTintColor: white,
		}
	}

	state = {
		foiVisitado: false,
		naoFoiVisitado: false,
		vaiProArena: false,
		naoVaiProArena: false,
		foiProArena: false,
		naoFoiProArena: false,
		fechouFicha: false,
		naoFechouFicha: false,
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible })
	}

	alterarProspecto() {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation } = this.props
		prospecto.situacao_id = SITUACAO_ARENA
		alterarProspectoNoAsyncStorage(prospecto)
		navigation.goBack()
		Alert.alert('Sucesso', 'Vamo pra cima!')
	}
	fecharFicha() {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation } = this.props
		prospecto.situacao_id = SITUACAO_FECHADO
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Parabéns', 'Vamo pra cima!')
		navigation.goBack()
	}

	alterar = (tipo) => {
		const {
			alterarProspectoNoAsyncStorage,

			navigation,
			prospecto,
		} = this.props

		if (tipo === 'remover') {
			prospecto.situacao_id = SITUACAO_REMOVIDO
			navigation.goBack()
		}
		if (tipo === 'sim') {
			prospecto.situacao_id = SITUACAO_LIGAR
			// navigation.goBack()
			navigation.navigate('Prospectos', { situacao_id: prospecto.situacao_id })
		}
		else {
			navigation.goBack()
		}

		alterarProspectoNoAsyncStorage(prospecto)

		if (tipo === 'remover') {
			Alert.alert('Removido', 'removido!')
		}
		else if (tipo === 'sim') {
			Alert.alert('Ótimo!', 'Consolidação foi para o próximo passo.')
		}

	}

	marcarDataEHora = () => {
		const {
			alterarProspectoNoAsyncStorage,
			navigation,
			prospecto
		} = this.props

		alterarProspectoNoAsyncStorage(prospecto)

		navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_VISITAR })
	}

	render() {

		const { prospecto, navigation } = this.props
		const { foiVisitado, naoFoiVisitado, vaiProArena, naoVaiProArena, foiProArena, naoFoiProArena, fechouFicha, naoFechouFicha } = this.state

		return (
			<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
				<View style={{ flex: 1, padding: 20 }}>

					{prospecto.situacao_id === SITUACAO_MENSAGEM &&

						<Card containerStyle={{ backgroundColor: dark, borderColor: blue, borderRadius: 6 }}>
							<Text style={{
								color: white, textAlign: 'center', fontWeight: 'bold',
								paddingBottom: 8
							}}
							>
								Mensagem foi enviada?
							</Text>
							<View style={{ backgroundColor: lightdark, height: 110, marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
									checkedColor={blue}
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
									checkedColor={blue}
									textStyle={{ color: white }}
									containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
								/>
							</View>

							<View style={{ backgroundColor: dark, height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15 }}>
								{
									this.state.ligou &&
									<TouchableOpacity
										hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
										style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: blue }]}
										onPress={() => { this.marcarDataEHora() }}>
										<Text style={styles.textButton}>Marcar Apresentação</Text>
									</TouchableOpacity>
								}
								{
									this.state.naoLigou &&
									<TouchableOpacity
										hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
										style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: blue }]}
										onPress={() => { this.alterar('remover') }}>
										<Text style={styles.textButton}>Remover</Text>
									</TouchableOpacity>
								}
								{
									this.state.enviou &&
									<TouchableOpacity
										hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
										style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: blue }]}
										onPress={() => { this.alterar('sim') }}>
										<Text style={styles.textButton}>OK</Text>
									</TouchableOpacity>
								}
								{
									this.state.pendente &&
									<TouchableOpacity
										hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
										style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: blue }]}
										onPress={() => { this.alterar() }}>
										<Text style={styles.textButton}>Voltar</Text>
									</TouchableOpacity>
								}
							</View>

						</Card>

					}

					{prospecto.situacao_id === SITUACAO_LIGAR &&

						<Card containerStyle={{ backgroundColor: dark, borderColor: blue, borderRadius: 6 }}>
							<Text style={{
								color: white, textAlign: 'center', fontWeight: 'bold',
								paddingBottom: 8
							}}
							>
								Atendeu?
							</Text>
							<View style={{ backgroundColor: lightdark, height: 110, marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
									checkedColor={blue}
									textStyle={{ color: white }}
									containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
								/>
								<CheckBox
									title='Não'
									checked={this.state.pendente}
									onPress={() => this.setState({
										ligou: false,
										naoLigou: false,
										pendente: true,
									})}
									checkedIcon='dot-circle-o'
									uncheckedIcon='circle-o'
									checkedColor={blue}
									textStyle={{ color: white }}
									containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
								/>
							</View>

							<View style={{ backgroundColor: dark, height: 40, marginTop: 20, justifyContent: 'flex-end', marginLeft: -15, marginRight: -15, marginBottom: -15 }}>
								{
									this.state.ligou &&
									<TouchableOpacity
										hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
										style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: blue }]}
										onPress={() => {
											navigation.goBack()
											this.marcarDataEHora()
											// this.setModalVisible(true)
										}}>
										<Text style={styles.textButton}>Marcar visita</Text>
									</TouchableOpacity>
								}
								{
									this.state.naoLigou &&
									<TouchableOpacity
										hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
										style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: blue }]}
										onPress={() => { this.alterar('remover') }}>
										<Text style={styles.textButton}>Remover</Text>
									</TouchableOpacity>
								}
								{
									this.state.pendente &&
									<TouchableOpacity
										hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
										style={[styles.button, style = { height: 40, borderRadius: 0, backgroundColor: blue }]}
										onPress={() => { this.alterar() }}>
										<Text style={styles.textButton}>Ligar depois</Text>
									</TouchableOpacity>
								}
							</View>

						</Card>
					}

					{prospecto.situacao_id == SITUACAO_VISITAR &&
						<Card containerStyle={{ backgroundColor: dark, borderColor: blue, borderRadius: 6, margin: 0, marginBottom: 10 }}>

							<Text style={{ color: white, textAlign: 'center', fontWeight: 'bold', paddingBottom: 8 }}>
								Foi visitado?
						</Text>
							<View style={{ flexDirection: 'row', backgroundColor: lightdark, height: 50, justifyContent: 'center', alignItems: 'center' }}>
								<CheckBox
									title='Sim'
									textStyle={{ color: white }}
									checked={this.state.foiVisitado}
									onPress={() => this.setState({
										foiVisitado: true,
										naoFoiVisitado: false,
									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
								<CheckBox
									title='Não'
									textStyle={{ color: white }}
									checked={this.state.naoFoiVisitado}
									onPress={() => this.setState({
										foiVisitado: false,
										naoFoiVisitado: true,
										vaiProArena: false
									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
							</View>
						</Card>
					}
					{
						foiVisitado &&
						<Card containerStyle={{ backgroundColor: dark, borderColor: blue, margin: 0 }}>
							<Text style={{
								color: white, textAlign: 'center',
								fontWeight: 'bold', paddingBottom: 8
							}}>
								Confirmou a célula/culto?
							</Text>
							<View style={{ flexDirection: 'row', backgroundColor: lightdark, height: 50, justifyContent: 'center', alignItems: 'center' }}>
								<CheckBox
									title='Sim'
									textStyle={{ color: white }}
									checked={this.state.vaiProArena}
									onPress={() => this.setState({
										vaiProArena: true,
										naoVaiProArena: false,
									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
								<CheckBox
									title='Não'
									textStyle={{ color: white }}
									checked={this.state.naoVaiProArena}
									onPress={() => this.setState({
										vaiProArena: false,
										naoVaiProArena: true,
									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
							</View>
						</Card>

					}
					{
						foiVisitado && vaiProArena &&
						<LOButton
							title="OK"
							OnPress={() => { this.alterarProspecto() }}
						/>
					}
					{
						foiVisitado && !vaiProArena && naoVaiProArena &&
						<LOButton
							title="Remarcar"
							OnPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_VISITAR, }) }}
						/>
					}
					{
						naoFoiVisitado &&
						<LOButton
							title="Remarcar"
							OnPress={() => { navigation.navigate('MarcarDataEHora', { prospecto_id: prospecto.id, situacao_id: SITUACAO_VISITAR, }) }}
						/>
					}

					{prospecto.situacao_id == SITUACAO_ARENA &&
						<Card containerStyle={{ backgroundColor: dark, borderColor: blue, borderRadius: 6, margin: 0, marginBottom: 10 }}>

							<Text style={{ color: white, textAlign: 'center', fontWeight: 'bold', paddingBottom: 8 }}>
								Foi ao arena/célula?
							</Text>
							<View style={{ flexDirection: 'row', backgroundColor: lightdark, height: 50, justifyContent: 'center', alignItems: 'center' }}>
								<CheckBox
									title='Sim'
									textStyle={{ color: white }}
									checked={this.state.foiProArena}
									onPress={() => this.setState({
										foiProArena: true,
										naoFoiProArena: false,
									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
								<CheckBox
									title='Não'
									textStyle={{ color: white }}
									checked={this.state.naoFoiProArena}
									onPress={() => this.setState({
										foiProArena: false,
										naoFoiProArena: true,
										fechouFicha: false,
										naoFechouFicha: false,
									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
							</View>
						</Card>
					}
					{
						foiProArena &&
						<Card containerStyle={{ backgroundColor: dark, borderColor: blue, margin: 0 }}>
							<Text style={{
								color: white, textAlign: 'center',
								fontWeight: 'bold', paddingBottom: 8
							}}>
								Fechou a ficha do pré?
							</Text>
							<View style={{ flexDirection: 'row', backgroundColor: lightdark, height: 50, justifyContent: 'center', alignItems: 'center' }}>
								<CheckBox
									title='Sim'
									textStyle={{ color: white }}
									checked={this.state.fechouFicha}
									onPress={() => this.setState({
										fechouFicha: true,
										naoFechouFicha: false,

									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
								<CheckBox
									title='Não'
									textStyle={{ color: white }}
									checked={this.state.naoFechouFicha}
									onPress={() => this.setState({
										fechouFicha: false,
										naoFechouFicha: true,


									})}
									checkedIcon='dot-circle-o'
									checkedColor={blue}
									uncheckedIcon='circle-o'
									containerStyle={{
										backgroundColor: 'transparent',
										padding: 0, borderColor: 'transparent'
									}}
								/>
							</View>
						</Card>
					}
					{
						foiProArena && fechouFicha &&
						<LOButton
							title="OK"
							OnPress={() => { this.fecharFicha() }}
						/>
					}
					{
						naoFoiProArena &&
						<LOButton
							title="Voltar"
							OnPress={() => { navigation.goBack() }}
						/>
					}

					{
						foiProArena && naoFechouFicha &&
						<LOButton
							title="Voltar"
							OnPress={() => { navigation.goBack() }}
						/>
					}

				</View>
			</LinearGradient>
		)
	}

}

function mapStateToProps({ prospectos }, { navigation }) {
	const prospecto_id = navigation.state.params.prospecto_id
	return {
		prospecto: prospectos && prospectos.find(prospecto => prospecto.id === prospecto_id)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		alterarProspectoNoAsyncStorage: (prospecto) => dispatch(alterarProspectoNoAsyncStorage(prospecto)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PerguntasScreen)
