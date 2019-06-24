import React from 'react';

import ListaDeProspectos from '../../components/ListaDeProspectos';
import { SITUACAO_VISITAR } from '../../helpers/constants';

import SideBar from '../../components/SideBar'
import { LinearGradient } from 'expo'
import { dark, black, lightdark, white } from '../../helpers/colors';

import { connect } from 'react-redux'

import {
    alterarProspectoNoAsyncStorage,
    alterarAdministracao,
    alterarUsuarioNoAsyncStorage,
    pegarProspectosNoAsyncStorage,
    pegarUsuarioNoAsyncStorage,
    adicionarProspectosAoAsyncStorage,
} from '../../actions'
import { Drawer } from 'native-base';
import HeaderComponent from '../../components/Header';

class VisitarScreen extends React.Component {

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

    componentDidMount() {

        this.props
            .pegarProspectosNoAsyncStorage()
            .then(() => this.setState({ carregando: false }))
        this.props
            .pegarUsuarioNoAsyncStorage()
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {
        const {
            prospectos,
            navigation,
        } = this.props

        const ListaDeConsolidacoesVisitar = (props) => (
            <ListaDeProspectos
                title={'Visitar'}
                prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_VISITAR)}
                navigation={navigation}
            />
        )

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar closeDrawer={this.closeDrawer} navigation={this.props.navigation} />}
                onClose={() => this.closeDrawer()}
            >
                <HeaderComponent
                    onPress={() => this.openDrawer()} icon="bars" />
                <LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
                    <ListaDeConsolidacoesVisitar />
                </LinearGradient>
            </Drawer>
        );
    }
}

function mapStateToProps({ prospectos, usuario, }) {
    return {
        prospectos,
        usuario,
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

export default connect(mapStateToProps, mapDispatchToProps)(VisitarScreen)
