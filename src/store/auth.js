import axios from 'axios'

import {PETICION_AUTH, HECHO_AUTH, ERROR_AUTH, SALIR_AUTH, USER_REQUEST, USER_SUCCESS, USER_ERROR, USER_JOBS} from './auth-actions'

const state = {
    token: localStorage.getItem('usuario-token') || '',
    status: '',
    usuario1: {},
    posts: [],
  };

  const getters = {
      isAutenticado: state => !!state.token,
      authEstado: state => state.status,
      posts: state => state.posts
  };

  const actions = {
    
    [PETICION_AUTH]: ({commit, dispatch}, usuario) => {

        return new Promise((resolve, reject) => {
            commit(PETICION_AUTH);
            axios({url: 'https://coding-test.rootstack.net/api/auth/login', data: usuario, method: 'POST'})
            .then(respuesta => {
                const token = respuesta.data
                localStorage.setItem('usuario-token',token.token_type + ' ' + token.access_token)
                axios.defaults.headers.common['Authorization'] = token
                commit(HECHO_AUTH, token)

                //dispatch para hacer la redireccion del usuario 
               dispatch(USER_REQUEST)
               resolve(respuesta)
            })
            .catch(error => {
                commit(ERROR_AUTH, error)
                localStorage.removeItem('usuario-token')
                reject(error)
            })


        })
    }, 

    [USER_REQUEST]: ({commit})=>{

        commit(USER_REQUEST);

        let headers = {'Authorization': localStorage.getItem('usuario-token')}

        axios({url: 'https://coding-test.rootstack.net/api/auth/me', method: 'GET', headers: headers}).then((respuesta) => {

            commit(USER_SUCCESS,respuesta.data)

            //console.log("LOL", respuesta.data.name)

        })
        .catch((error)=>{

            commit(USER_ERROR,error)

        })

    },

    [USER_JOBS]: ({commit})=>{

      commit(USER_JOBS);

      let headers = {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('usuario-token'),
        "Access-Control-Allow-Origin": "*",
      
      }

      axios({url: 'https://coding-test.rootstack.net/api/jobs', method: 'GET', headers: headers}).then((respuesta) => {

        commit(USER_JOBS,respuesta.data.data)

          console.log("LOL", respuesta.data.data)

      })
      .catch((error)=>{

          commit(USER_ERROR,error)

      })
  },

    [SALIR_AUTH]: ({commit}) => {
        return new Promise((resolve) => {
          commit(SALIR_AUTH)
          localStorage.removeItem('usuario-token') // clear your user's token from localstorage
          resolve()
        })
      }
        
    
  };

  const mutations = {
    [PETICION_AUTH]: (state) => {
      state.status = 'loading'
    },
    [HECHO_AUTH]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    [ERROR_AUTH]: (state) => {
      state.status = 'error'
    },
    [USER_REQUEST]: (state) => {
        state.status = "loading";
      },
    [USER_SUCCESS]: (state, resp) => {
      console.log("ACTUALIZA ESTADO USER");
        state.status = "success";
        state.usuario1 = resp;
      },
    [USER_ERROR]: (state) => {
        state.status = "error";
      },
    [SALIR_AUTH]: (state) => {
        state.usuario1 = {};
        state.token = "";
      },
    [USER_JOBS]: (state, resp) => {
      console.log("JOBS")
        state.status = "loading";
        state.posts = resp
      },
  };

  export default {
    state,
    getters,
    actions,
    mutations
  };
