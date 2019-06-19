import React from 'react';
import {
	View,
	Text,
	Alert,
} from 'react-native';
import { Button, Card, Icon, Input, CheckBox } from 'react-native-elements'
import { white, gray, black, lightdark, dark, red } from '../helpers/colors'
import { connect } from 'react-redux'
import { SITUACAO_VISITAR, SITUACAO_FECHADO, SITUACAO_FECHAMENTO, SITUACAO_ARENA } from '../helpers/constants'
import { alterarProspectoNoAsyncStorage } from '../actions'
import { LinearGradient } from 'expo'
import LOButton from '../components/LOButton';

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

	alterarProspecto() {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation } = this.props
		prospecto.situacao_id = SITUACAO_ARENA
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Sucesso', 'Vamo pra cima!')
		navigation.goBack()
	}
	fecharFicha() {
		const { prospecto, alterarProspectoNoAsyncStorage, navigation } = this.props
		prospecto.situacao_id = SITUACAO_FECHADO
		alterarProspectoNoAsyncStorage(prospecto)
		Alert.alert('Parabéns', 'Vamo pra cima!')
		navigation.goBack()
	}

	render() {
		const { prospecto, navigation } = this.props
		const { foiVisitado, naoFoiVisitado, vaiProArena, naoVaiProArena, foiProArena, naoFoiProArena, fechouFicha, naoFechouFicha } = this.state

		return (
			<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
				<View style={{ flex: 1, padding: 20 }}>
					{prospecto.situacao_id == SITUACAO_VISITAR &&
						<Card containerStyle={{ backgroundColor: dark, borderColor: red, borderRadius: 6, margin: 0, marginBottom: 10 }}>

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
									checkedColor={red}
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
									checkedColor={red}
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
						<Card containerStyle={{ backgroundColor: dark, borderColor: red, margin: 0 }}>
							<Text style={{
								color: white, textAlign: 'center',
								fontWeight: 'bold', paddingBottom: 8
							}}>
								Vai a célula/culto?
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
									checkedColor={red}
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
									checkedColor={red}
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
							title="Confirmar Célula/Culto"
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
						<Card containerStyle={{ backgroundColor: dark, borderColor: red, borderRadius: 6, margin: 0, marginBottom: 10 }}>

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
									checkedColor={red}
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
									checkedColor={red}
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
						<Card containerStyle={{ backgroundColor: dark, borderColor: red, margin: 0 }}>
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
									checkedColor={red}
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
									checkedColor={red}
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
							title="Confirmar Ficha do Pré"
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
