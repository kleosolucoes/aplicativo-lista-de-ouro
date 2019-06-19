import React from 'react';

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux'

import { LinearGradient } from 'expo'
import { Card, Icon } from 'react-native-elements';
import SITUACAO_VISITAR, { SITUACAO_REMOVIDO, SITUACAO_FECHADO, SITUACAO_ARENA } from '../helpers/constants'
import { white, lightdark, dark, blue, gray, black } from '../helpers/colors'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'


const Apn = ({ prospectos }) => (
    <Text style={styles.number}> {prospectos.length} </Text>
);

class PerfilScreen extends React.Component {

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


    getProspectosApn = () => {
        const { prospectos } = this.props

        this.setState({ apn: prospectos.filter(prospecto => prospecto.situacao_id === 4) })
    }

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
            <LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>
                {/* <View style={{ flex: 1, justifyContent: 'space-between' }}> */}

                <View style={styles.containerProfile}>
                    {/* <Image source={userProfile} style={styles.userProfile} /> */}
                    {/* https://ui-avatars.com/api/?name=John+Doe */}
                    <Text style={[styles.text]}>{usuario.email}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'space-around', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, flexWrap: 'wrap'}}>
                        <Card containerStyle={styles.box}>
                            <Icon name="user" type="font-awesome" size={20} color={white} containerStyle={{ margin: 0 }} />
                            <Text style={styles.number}>
                                {/* {prospectos.length} */}
                                <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id !== SITUACAO_REMOVIDO)} />
                            </Text>
                            <Text style={styles.text}>Vidas</Text>
                        </Card>
                        <Card containerStyle={[styles.box, { marginHorizontal: 0 }]}>
                            <Icon name="info-circle" type="font-awesome" size={20} color={white} containerStyle={{ margin: 0 }} />
                            <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_VISITAR)} />
                            <Text style={styles.text}>Visitas</Text>
                        </Card>
                        <Card containerStyle={styles.box}>
                            <Icon name="trophy" type="font-awesome" size={20} color={white} containerStyle={{ margin: 0 }} />
                            <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_ARENA)} />
                            <Text style={styles.text}>C / C</Text>
                        </Card>
                        <Card containerStyle={styles.box}>
                            <Icon name="trophy" type="font-awesome" size={20} color={white} containerStyle={{ margin: 0 }} />
                            <Apn prospectos={prospectos.filter(prospecto => prospecto.situacao_id === SITUACAO_FECHADO)} />
                            <Text style={styles.text}>Fichas</Text>
                        </Card>
                    </View>

                    <View>
                        {/* <LineChart
                            data={data}
                            width={width - 20}
                            height={Dimensions.get('window').height < 680 ? 185 : 220}
                            chartConfig={{

                                backgroundColor: lightdark,
                                backgroundGradientFrom: '#303030',
                                backgroundGradientTo: '#343434',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                strokeWidth: 2
                            }}
                            bezier
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        /> */}
                    </View>
                </View>

                {/* </View> */}

            </LinearGradient>
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
        paddingBottom: Dimensions.get('window').height < 680 ? 20 : 35,
        paddingTop: Dimensions.get('window').height < 680 ? 0 : 15,
    },
    box: {
        backgroundColor: blue,
        width: Dimensions.get('window').height < 650 ? 90 : 110,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Dimensions.get('window').height < 680 ? 5 : 10,
        borderWidth: 0,
        borderRadius: 6,

        shadowColor: black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    text: {
        color: white,
        textAlign: 'center',
    },
    number: {
        color: black,
        textAlign: 'center',
        fontSize: 26,
        fontWeight: "bold"
    },
})