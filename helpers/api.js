import { AsyncStorage } from 'react-native'                                                                                                                                                              

const versaoBanco = '022'
const CHAVE_PROSPECTOS = 'ListaDeOuro:prospectos' + versaoBanco
const CHAVE_HISTORICO = 'ListaDeOuro:historico' + versaoBanco
const CHAVE_USUARIO = 'ListaDeOuro:usuario' + versaoBanco

let api = 'http://192.168.0.14:8080'
api = 'https://secure-woodland-24244.herokuapp.com'
const headers = {
	'Content-Type': 'application/json'
}

export const teste = () => 
	fetch(`${api}/`)
		.then(resultado => resultado.json())
		.then(json => json)

export const registrarNaAPI = (dados) =>
	fetch(
		`${api}/no/registrar`,
		{
			headers,
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const logarNaApi = (dados) =>
	fetch(
		`${api}/no/logar`,
		{
			headers,
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const sincronizarNaAPI = (dados) =>
	fetch(
		`${api}/no/sincronizar`,
		{
			headers,
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export function recuperarProspectos(){        
	return AsyncStorage.getItem(CHAVE_PROSPECTOS)
		.then(JSON.parse)                     
		.then((dados) => {                    
			if(dados === null){               
				dados = {prospectos: []}      
				AsyncStorage.setItem(CHAVE_PROSPECTOS, JSON.stringify(dados))
			}                                 
			return dados                      
		})                                    
}

export function submeterProspectos(prospectos){
	return recuperarProspectos()              
		.then(dados => {                      
			dados.prospectos = [...dados.prospectos, ...prospectos]
			AsyncStorage.setItem(CHAVE_PROSPECTOS, JSON.stringify(dados))
			return prospectos                 
		})                                    
}

export function modificarProspecto(prospecto){
	return recuperarProspectos()              
		.then(dados => {                      
			const prospectosAlterados = 
				dados.prospectos.map(prospectoNoAsyncStorage => {
					if(prospectoNoAsyncStorage.id === prospecto.id){
						return prospecto
					}else{
						return prospectoNoAsyncStorage
					}
				})
			dados.prospectos = prospectosAlterados
			AsyncStorage.setItem(CHAVE_PROSPECTOS, JSON.stringify(dados))
			return prospecto
		})                                    
}

export function recuperarHistorico(){        
	return AsyncStorage.getItem(CHAVE_HISTORICO)
		.then(JSON.parse)                     
		.then((dados) => {                    
			if(dados === null){               
				dados = {historico: []}      
				AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(dados))
			}                                 
			return dados                      
		})                                    
}

export function recuperarHistoricoNaoSincronizado(){        
	return AsyncStorage.getItem(CHAVE_HISTORICO)
		.then(JSON.parse)                     
		.then((dados) => {                    
			let retorno = []
			if(dados && dados.historico){
				let historicosParaEnviar = dados.historico.filter(item => !item.sincronizado)
				retorno = historicosParaEnviar
			}
			return retorno
		})
}

export function submeterHistoricos(historicos){
	return recuperarHistorico()              
		.then(dados => {                      
			dados.historico = [...dados.historico, ...historicos]
			AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(dados))
			return historicos                 
		})                                    
}

export function limparHistoricos(){
	let dados = {}
	dados.historico = []
	AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(dados))
	return true
}

export function recuperarUsuario(){        
	return AsyncStorage.getItem(CHAVE_USUARIO)
		.then(JSON.parse)                     
		.then((dados) => {                    
			if(dados === null){               
				dados = {usuario: {}}      
				AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados))
			}                                 
			return dados                      
		})                                    
}

export function submeterUsuario(usuario){
	return recuperarUsuario()              
		.then(dados => {                      
			dados.usuario = usuario
			AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados))
			return usuario                 
		})
}
