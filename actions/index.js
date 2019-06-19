import {
	recuperarProspectos,
	submeterProspectos,
	modificarProspecto,
	submeterHistoricos,
	recuperarUsuario,
	submeterUsuario,
} from '../helpers/api'
import{
	pegarDataEHoraAtual,
} from '../helpers/helper'

export const PEGAR_PROSPECTOS = 'PEGAR_PROSPECTOS'
export const ADICIONAR_PROSPECTOS = 'ADICIONAR_PROSPECTOS'
export const ALTERAR_PROSPECTO = 'ALTERAR_PROSPECTO'
export const PEGAR_ADMINISTRACAO = 'PEGAR_ADMINISTRACAO'
export const ALTERAR_ADMINISTRACAO = 'ALTERAR_ADMINISTRACAO'
export const PEGAR_USUARIO = 'PEGAR_USUARIO'
export const ALTERAR_USUARIO = 'ALTERAR_USUARIO'

export function pegarProspectos(prospectos){ 
	return {
		type: PEGAR_PROSPECTOS,
		prospectos,
	}
}

export function adicionarProspectos(prospectos){ 
	return {
		type: ADICIONAR_PROSPECTOS,
		prospectos,
	}
}

export function alterarProspecto(prospecto){ 
	return {
		type: ALTERAR_PROSPECTO,
		prospecto,
	}
}

export function pegarAdministracao(administracao){ 
	return {
		type: PEGAR_ADMINISTRACAO,
		administracao,
	}
}

export function alterarAdministracao(administracao){ 
	return {
		type: ALTERAR_ADMINISTRACAO,
		administracao,
	}
}

export function pegarUsuario(usuario){ 
	return {
		type: PEGAR_USUARIO,
		usuario,
	}
}

export function alterarUsuario(usuario){ 
	return {
		type: ALTERAR_USUARIO,
		usuario,
	}
}

export const pegarProspectosNoAsyncStorage = () => dispatch => {
	return recuperarProspectos()
		.then(prospectosNaAsyncStorage => {
			dispatch(pegarProspectos(prospectosNaAsyncStorage.prospectos))
			return prospectosNaAsyncStorage.prospectos 
		})
}

export const adicionarProspectosAoAsyncStorage = (prospectos) => dispatch => {
	const historicos = 
		prospectos
		.map(prospecto => {
			const historico = {
				sincronizado: false,
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				dados: {
					prospecto_id: prospecto.id,
					prospecto,
				},
			}
			return historico
		})
	submeterHistoricos(historicos)
	return submeterProspectos(prospectos)
		.then(prospectos => {
			dispatch(adicionarProspectos(prospectos))
			return true
		})
}

export const alterarProspectoNoAsyncStorage = (prospecto) => dispatch => {
	const historico = {
		sincronizado: false,
		data_criacao: pegarDataEHoraAtual()[0],
		hora_criacao: pegarDataEHoraAtual()[1],
		dados: {
			prospecto_id: prospecto.id,
			situacao_id: prospecto.situacao_id,
		}
	}
	submeterHistoricos([historico])

	if(prospecto.novo){
		delete prospecto.novo
		submeterProspectos([prospecto])
			.then(prospectos => dispatch(adicionarProspectos(prospectos)))
	}else{
		modificarProspecto(prospecto)
			.then(prospecto => dispatch(alterarProspecto(prospecto)))
	}
}

export const pegarUsuarioNoAsyncStorage = () => dispatch => {
	return recuperarUsuario()
		.then(usuarioNaAsyncStorage => {
			dispatch(pegarUsuario(usuarioNaAsyncStorage.usuario))
			return usuarioNaAsyncStorage.usuario 
		})
}

export const alterarUsuarioNoAsyncStorage = (usuario) => dispatch => {
	return submeterUsuario(usuario)
		.then(usuario => { 
			dispatch(alterarUsuario(usuario))
			return true
		})
}
