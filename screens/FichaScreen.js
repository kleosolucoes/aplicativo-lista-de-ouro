import React from 'react';

import { View, Text } from 'react-native';
import ListaDeProspectos from '../components/ListaDeProspectos';
import { SITUACAO_FECHADO, SITUACAO_REMOVIDO } from '../helpers/constants';

import { LinearGradient } from 'expo'
import { dark, black, lightdark, white } from '../helpers/colors';

import { connect } from 'react-redux'

class FichaScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: '',
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
            prospectos,
            navigation,
        } = this.props

        const ListaDeProspectosFicha = (props) => (
            <ListaDeProspectos
                title={'Fichas Pré'}
                prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_FECHADO)}
                navigation={navigation}
            />
        )

        return (
            <LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
                <ListaDeProspectosFicha />
            </LinearGradient>
        );
    }
}

function mapStateToProps({ prospectos, }) {
    return {
        prospectos,
    }
}

export default connect(mapStateToProps, null)(FichaScreen)
