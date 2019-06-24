import React from 'react';

import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Drawer } from 'native-base'
import { LinearGradient } from 'expo'
import SideBar from '../components/SideBar'
import { Card, Icon } from 'react-native-elements';
import SITUACAO_VISITAR, { SITUACAO_REMOVIDO, SITUACAO_FECHADO, SITUACAO_ARENA } from '../helpers/constants'
import { white, lightdark, dark, blue, gray, black } from '../helpers/colors'
import HeaderComponent from '../components/Header';

const Apn = ({ prospectos }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.number}> {prospectos.length} </Text>
    </View >
)

class PerfilScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    }

    getProspectosApn = () => {
        const { prospectos } = this.props

        this.setState({ apn: prospectos.filter(prospecto => prospecto.situacao_id === 4) })
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {
        const { prospectos } = this.props
        const { height, width } = Dimensions.get('window')

        const { usuario } = this.props

        const data = {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
                {
                    data: [50, 20, 2, 86, 71, 100],
                    color: (opacity = 1) => `#fff` // optional
                }
            ]
        }

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar closeDrawer={this.closeDrawer} navigation={this.props.navigation} />}
                onClose={() => this.closeDrawer()}
            >
                <HeaderComponent icon="bars" onPress={() => this.openDrawer()} />
                <LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>

                    <View style={{ flex: 1, justifyContent: 'center', margin: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                            <Card containerStyle={styles.box}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Icon name="user" type="font-awesome" size={19} color={white} containerStyle={{ marginBottom: 4 }} />
                                    <Text style={styles.text}>VIDAS</Text>
                                </View>
                                <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id !== SITUACAO_REMOVIDO)} />
                            </Card>
                            <Card containerStyle={[styles.box, { marginLeft: 10 }]}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Icon name="calendar" type="font-awesome" size={19} color={white} containerStyle={{ marginBottom: 4 }} />
                                    <Text style={styles.text}>VISITAS</Text>
                                </View>
                                <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_VISITAR)} />
                            </Card>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                            <Card containerStyle={styles.box}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Icon name="trophy" type="font-awesome" size={19} color={white} containerStyle={{ marginBottom: 4 }} />
                                    <Text style={styles.text}>CÉLULA/CULTO</Text>
                                </View>
                                <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_ARENA)} />
                            </Card>
                            <Card containerStyle={[styles.box, { marginLeft: 10 }]}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Icon name="file" type="font-awesome" size={19} color={white} containerStyle={{ marginBottom: 4 }} />
                                    <Text style={styles.text}>FICHAS</Text>
                                </View>
                                <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_FECHADO)} />
                            </Card>
                        </View>

                    </View>

                </LinearGradient>
            </Drawer>
        );
    }
}

function mapStateToProps({ usuario, prospectos }) {
    return {
        usuario,
        prospectos,
    }
}

export default connect(mapStateToProps, null)(PerfilScreen)

const styles = StyleSheet.create({
    userProfile: {
        alignSelf: 'center',
        height: 60,
        width: 60,
        marginBottom: 10,
    },
    containerProfile: {
        borderBottomWidth: 1,
        borderBottomColor: gray,
        paddingBottom: Dimensions.get('window').height < 680 ? 30 : 50,
        paddingTop: Dimensions.get('window').height < 680 ? 0 : 35,
    },
    box: {
        backgroundColor: blue,
        flex: 1,
        height: Dimensions.get('window').height < 650 ? 100 : 110,
        padding: Dimensions.get('window').height < 680 ? 5 : 10,
        borderWidth: 0,
        borderRadius: 6,
        margin: 0,

        shadowColor: black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    text: {
        color: white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 'bold'
    },
    textProfile: {
        color: white,
        textAlign: 'center',
        fontSize: 24,
    },
    number: {
        marginTop: 10,
        color: white,
        fontSize: 26,
        fontWeight: "bold"
    },
})