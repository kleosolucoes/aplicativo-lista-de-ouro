import React, { Fragment } from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
    Alert, Text, View, Image, TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator,
    NetInfo,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { dark, white, gray, blue, lightdark, black } from '../helpers/colors';
import { Icon } from 'native-base';
import { LinearGradient } from 'expo'
import {
    alterarUsuarioNoAsyncStorage,
    pegarUsuarioNoAsyncStorage,
} from '../actions'
import {
    logarNaApi,
} from '../helpers/api'
import { connect } from 'react-redux'

class LoginScreen extends React.Component {

    static navigationOptions = {
        headerTintColor: white,
        header: null,
    }

    state = {
        email: 'falecomleonardopereira@gmail.com',
        senha: '123',
        carregando: false,
    }

    componentDidMount() {
        this.setState({ carregando: true })
        this.props
            .pegarUsuarioNoAsyncStorage()
            .then(usuario => {
                if (usuario.email && usuario.email !== '') {
                    this.props.navigation.navigate('Prospectos')
                }
                this.setState({ carregando: false })
            })
    }

    ajudadorDeSubmissao = () => {
        const {
            email,
            senha,
        } = this.state

        mostrarMensagemDeErro = false
        if (email === '') {
            mostrarMensagemDeErro = true
        }

        if (senha === '') {
            mostrarMensagemDeErro = true
        }

        if (mostrarMensagemDeErro) {
            Alert.alert('Erro', 'Campos invalidos')
        } else {
            NetInfo.isConnected
                .fetch()
                .then(isConnected => {
                    if (isConnected) {

                        this.setState({ carregando: true })
                        const dados = {
                            email,
                            senha,
                        }
                        logarNaApi(dados)
                            .then(retorno => {
                                if (retorno.ok) {
                                    this.props.alterarUsuarioNoAsyncStorage(dados)
                                        .then(() => {
                                            this.setState({ carregando: false })
                                            this.props.navigation.navigate('Prospectos')
                                        })
                                } else {
                                    this.setState({ carregando: false })
                                    alertTitulo = 'Aviso'
                                    alertCorpo = 'Usuário/Senha não conferem!'
                                    Alert.alert(alertTitulo, alertCorpo)
                                }
                            })
                    } else {
                        Alert.alert('Internet', 'Verifique sua internet!')
                    }
                })
        }
    }

    render() {
        const {
            email,
            senha,
            carregando,
        } = this.state
        const { goBack } = this.props.navigation;
        return (
            <LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434']}>

                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    enableOnAndroid enableAutomaticScroll={true}
                    keyboardShoulfPersistTaps='always'
                    extraScrollHeight={Platform.OS === 'ios' ? 30 : 80} >

                    {
                        carregando &&
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator
                                size="large"
                                color={blue}
                            />
                        </View>
                    }

                    {
                        !carregando &&
                        <Fragment>


                            {/* <View>
                                <Text style={{ fontSize: 28, color: white, textAlign: 'center', fontWeight: 'bold', }}>
                                    Acesse sua
								</Text>
                                <Text style={{ fontSize: 28, color: white, textAlign: 'center', fontWeight: 'bold', }}>
                                    Lista de Ouro
                                        </Text>
                                <Text style={{ fontSize: 18, color: white, textAlign: 'center', marginTop: 15 }}>
                                    Preencha os dados abaixo,
								</Text>
                                <Text style={{ fontSize: 18, color: white, textAlign: 'center' }}>
                                    faça seu login e venda mais.
                                </Text>
                            </View> */}
                            <View>

                                <View style={styles.containerLogin}>

                                    <View style={{ paddingVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <TextInput style={styles.inputText}
                                            keyboardAppearance='dark'
                                            autoCapitalize="none"
                                            placeholder="Seu email"
                                            placeholderTextColor="#d3d3d3"
                                            selectionColor="#fff"
                                            keyboardType="email-address"
                                            value={email}
                                            onChangeText={texto => this.setState({ email: texto })}
                                            returnKeyType={'next'}
                                            onSubmitEditing={() => this.inputSenha.focus()}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <View style={{ paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#bbb', alignItems: 'center' }}>
                                        <TextInput style={styles.inputText}
                                            ref={(input) => { this.inputSenha = input; }}
                                            keyboardAppearance='dark'
                                            autoCapitalize="none"
                                            placeholder="Senha"
                                            placeholderTextColor="#d3d3d3"
                                            selectionColor="#fff"
                                            keyboardType='default'
                                            secureTextEntry={true}
                                            value={senha}
                                            onChangeText={texto => this.setState({ senha: texto })}
                                            returnKeyType={'go'}
                                            onSubmitEditing={() => this.ajudadorDeSubmissao()}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[styles.button,
                                    {
                                        shadowOffset: { width: 5, height: 5, },
                                        shadowColor: 'rgba(0,0,0,0.3)',
                                        shadowOpacity: 1.0,
                                    }
                                    ]}
                                    onPress={() => this.ajudadorDeSubmissao()}>
                                    <Text style={styles.textButton}>Acessar</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.containerButton}>

                                <TouchableOpacity
                                    style={[styles.button, style = { backgroundColor: 'transparent' }]}
                                    onPress={() => this.props.navigation.navigate('Registro')}>
                                    <Text style={[styles.textButton, style = { color: white, fontWeight: '200' }]}>
                                        Ainda não tem uma conta? Clique aqui.
								    </Text>
                                </TouchableOpacity>
                            </View>

                        </Fragment>
                    }
                </KeyboardAwareScrollView>
            </LinearGradient>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario)),
        pegarUsuarioNoAsyncStorage: (usuario) => dispatch(pegarUsuarioNoAsyncStorage(usuario)),
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        paddingHorizontal: 20,
    },
    logo: {
        alignSelf: 'center',
        width: Platform.OS === "ios" ? 120 : 120,
        height: Platform.OS === "ios" ? 115 : 115,
    },
    containerLogin: {
        margin: 12,
        backgroundColor: black,
        borderRadius: 10,
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 16,
        color: white,
        borderRadius: 6,
        fontWeight: '400',
        textAlign: 'center',
        width: '100%',
    },
    containerButton: {
        marginBottom: 6,
    },
    button: {
        backgroundColor: blue,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    textButton: {
        fontSize: 16,
        color: dark,
        textAlign: 'center',
    },
})

