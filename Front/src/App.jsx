import { Client } from '@stomp/stompjs'
import { useEffect, useState } from 'react'

function App () {
  const [stompClient, setStompClient] = useState(null)
  const [nombre, setNombre] = useState('')
  const [mensajes, setMensajes] = useState([])
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const cliente = new Client({
      brokerURL: 'ws://localhost:8080/websocket'
    })
    cliente.onConnect = () => {
      cliente.subscribe('/tema/mensajes', (mensaje) => {
        const nuevoMsj = JSON.parse(mensaje.body)
        setMensajes((p) => [...p, nuevoMsj])
      })
    }
    cliente.activate()
    setStompClient(cliente)

    return () => {
      if (cliente) {
        cliente.deactivate()
      }
    }
  }, [])

  const evtEnviarMensaje = () => {
    setNombre('Desconocido')
    setMensaje('')
    // eslint-disable-next-line eqeqeq
    if (stompClient != null && nombre != '' && mensaje != '') {
      stompClient.publish({
        destination: '/app/envio',
        body: JSON.stringify({
          nombre,
          contenido: mensaje
        })
      })
      setMensaje('')
    }
  }

  return (
    <main className='container'>
      <article className='row'>
        <article className='col-12'>
          {
          // eslint-disable-next-line array-callback-return
          mensajes.map((msg, i) => (
            <p key={i}><b>{msg.nombre}</b>: {msg.contenido}</p>
          ))
          }
        </article>
      </article>
      <article className='row'>
        <section className='col'>
          <section className='form-floating'>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} id='txtNombre' type='text' className='form-control' />
            <label htmlFor='txtNombre'>Nombre</label>
          </section>
        </section>
        <section className='col-6'>
          <section className='form-floating'>
            <input value={mensaje} onChange={(e) => setMensaje(e.target.value)} id='txtMensaje' type='text' className='form-control' />
            <label htmlFor='txtMensaje'>Mensaje</label>
          </section>
        </section>
        <section className='col d-grid'>
          <button onClick={evtEnviarMensaje} className='btn btn-primary'>Enviar</button>
        </section>
      </article>
    </main>
  )
}

export default App
