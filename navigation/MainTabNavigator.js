import React, {Component} from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import ImportarProspectosScreen from '../screens/ImportarProspectosScreen';
import QualificarProspectoScreen from '../screens/QualificarProspectoScreen';
import MarcarDataEHoraScreen from '../screens/MarcarDataEHoraScreen';
import PerguntasScreen from '../screens/PerguntasScreen';
import ProspectoScreen from '../screens/ProspectoScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import PerfilScreen from '../screens/PerfilScreen';
import FichaScreen from '../screens/FichaScreen/FichaScreen'
import { white, dark, black, blue } from '../helpers/colors'
import MensagemScreen from '../screens/MensagemScreen';
import AddButton from '../components/AddButton';
import { Icon } from 'react-native-elements';
import LigarScreen from '../screens/LigarScreen';
import VisitarScreen from '../screens/VisitarScreen';
import CelulaCultoScreen from '../screens/CelulaCultoScreen';


export const Tabs = createBottomTabNavigator(
	{
		Mensagem: {
			screen: MensagemScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='whatsapp' type='font-awesome' color={tintColor} />
				),
			}
		},
		Ligar: {
			screen: LigarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='phone' type='font-awesome' color={tintColor} />
				),
			}
		},
		add: {
			screen: PerfilScreen,
			navigationOptions: () => ({
				tabBarButtonComponent: () => (
					<AddButton />
				),
			}),
		},
		Visitar: {
			screen: VisitarScreen,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) => (
					<Icon name='info-circle' type='font-awesome' color={tintColor} />
				),
			}
		},
		CelulaCulto: {
			screen: CelulaCultoScreen,
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
			activeTintColor: blue,
			inactiveTintColor: '#eee',
			style: {
				backgroundColor: dark,
			},
			indicatorStyle: {
				backgroundColor: blue,
			},
		},
	}
)

export const ProspectosStack = createStackNavigator(
	{
		Perfil: PerfilScreen,
		ImportarProspectos: ImportarProspectosScreen,
		QualificarProspecto: QualificarProspectoScreen,
		MarcarDataEHora: MarcarDataEHoraScreen,
		Perguntas: PerguntasScreen,
		Prospecto: ProspectoScreen,
		Login: LoginScreen,
		Registro: RegistroScreen,
		Ficha: FichaScreen,
	},
	{
		navigationOptions: {
			headerStyle: {
				backgroundColor: black,
				borderBottomColor: black,
			},
			headerBackTitle: null,
			
		},
	}
)