import React from 'react';

import { View, Text } from 'react-native';
import { SITUACAO_FECHADO, SITUACAO_REMOVIDO } from '../../helpers/constants';

import ListaDeProspectos from '../../components/ListaDeProspectos';
import { Drawer } from 'native-base'
import SideBar from '../../components/SideBar'
import { LinearGradient } from 'expo'
import HeaderComponent from '../../components/Header'

import { dark, black, lightdark, white } from '../../helpers/colors';

import { connect } from 'react-redux'

class FichaScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            // title: '',
            // headerTitleStyle: {
            //     flex: 1,
            //     textAlign: 'center',
            //     alignSelf: 'center',
            //     color: white,
            // },
            // headerTintColor: white,
            header: null,
            gesturesEnabled: false,
        }
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

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar closeDrawer={this.closeDrawer} navigation={this.props.navigation} />}
                onClose={() => this.closeDrawer()}
            >
                <HeaderComponent
                    onPress={() => this.openDrawer()} icon="bars" />
                <LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
                    <ListaDeProspectos
                        title={'Fichas Pré'}
                        prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_FECHADO)}
                        navigation={navigation}
                    />
                </LinearGradient>
            </Drawer>
        );
    }
}

function mapStateToProps({ prospectos, }) {
    return {
        prospectos,
    }
}

export default connect(mapStateToProps, null)(FichaScreen)
