import React from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	Linking,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
import { pegarItemsAgenda } from '../actions'
import {connect} from 'react-redux'
import call from 'react-native-phone-call'

class TarefasScreen extends React.Component {

	static navigationOptions = {
		header: null,
	};

	state = {
		carregando: true,
	}

	componentDidMount(){
		this.props.pegarItemsAgenda([])
		this.setState({
			carregando: false
		})
	}

	chamarOTelefoneDoCelular(contato){
		call({number:contato.telefone,prompt: false}).catch(console.error)
	}

	chamarWhatsapp(contato){
		let url = 'whatsapp://send?text=phone=+55' + contato.telefone
		Linking.openURL(url).catch(err => console.error('An error occurred', err));
	}

	render() {
		const { agenda, contatos } = this.props
		const { carregando } = this.state

		const tipoReuniao = 1
		const tipoMensagem = 2
		const tipoLigar = 3

		let agendaOrdenada = []
		let dataNova = '';
		let dataVelha = '';
		if(agenda.length){
			agenda.map(item => {
				let contato = contatos.find(contato => contato.id === item.contato_id)
				item.contato = contato
				agendaOrdenada.push(item)
			})
		}

		return (
			<View style={styles.container}>

				<View style={{height: 40, backgroundColor: 'gray', justifyContent: 'center', padding: 10}}>
					<Text>Tarefas</Text>
				</View>

				{
					carregando && 
					<View>
						<ActivityIndicator size="large"/>
						<Text>Carregando ... </Text>
					</View>
				}

				{
					!carregando && agenda && 
					<ScrollView style={styles.container}>
						<List>
							{
								agendaOrdenada.map(item => {
									let labelEvento = ''
									let icone = ''
									if(item.tipo === tipoReuniao){
										labelEvento = 'APN'
										icone = 'people'
										return <ListItem 
											key={item.id} 
											title={item.data + ' - ' + labelEvento}
											subtitle={item.contato.nome + ' - ' + item.contato.telefone}
											rightIcon={{name: icone}}
										/>
									}
									if(item.tipo === tipoMensagem){
										labelEvento = 'Enviar Mensagem'
										icone = 'message'
										return <ListItem 
											key={item.id} 
											title={item.data + ' - ' + labelEvento}
											subtitle={item.contato.nome + ' - ' + item.contato.telefone}
											rightIcon={{name: icone}}
											onPressRightIcon={()=>{this.chamarWhatsapp(item.contato)}}
										/>
									}
									if(item.tipo === tipoLigar){
										labelEvento = 'Ligar'
										icone = 'phone'
										return <ListItem 
											key={item.id} 
											title={item.data + ' - ' + labelEvento}
											subtitle={item.contato.nome + ' - ' + item.contato.telefone}
											rightIcon={{name: icone}}
											onPressRightIcon={()=>{this.chamarOTelefoneDoCelular(item.contato)}}
										/>
									}

								})
							}
						</List>
					</ScrollView>
				}

			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

function mapStateToProps({agenda, contatos}){
	return {
		agenda,
		contatos,
	}
}

function mapDispatchToProps(dispatch){
	return {
		pegarItemsAgenda: (items) => dispatch(pegarItemsAgenda(items)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TarefasScreen)
