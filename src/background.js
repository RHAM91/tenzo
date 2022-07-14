'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'

let win
let actualizacion

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function buscarActualizacion(){
  //console.log('buscando....')
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-downloaded', () => {

    setTimeout(()=>{ // ESPERA 10 SEGUNDOS PARA ENVIAR EL MENSAJE DE QUE DEBE SER ACTUALIZADA LA APP
      win.webContents.send('actualizacion', true)
    }, 10000)

    clearInterval(actualizacion) // al momento de descargar la actualizacion detiene el ciclo de busqueda

   
    // const dialogOpts = {
    //   type: 'info',
    //   buttons: ['Actualizar', 'Después'],
    //   title: 'Actualización disponible',
    //   message: `NUEVA VERSION DISPONIBLE`,
    //   detail: 'Una nueva versión ha sido descargada. Presiona "Actualizar" para aplicar los cambios.'
    // }

    // dialog.showMessageBox(dialogOpts).then(({ response }) => {
    //   if (response === 0) autoUpdater.quitAndInstall()
    // })
  })
}


async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1240,
    height: 850,
    center:true,
    autoHideMenuBar: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  actualizacion = setInterval(buscarActualizacion, 10 * 60 * 1000) // para cambiar el tiempo del intervalo em minutos, modificar solo el primer 60
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// --> EVENTO PARA BUSCAR Y MOSTRAR ACTUALIZACION

ipcMain.on('app_version', (event)=>{
  event.sender.send('app_version', {version: app.getVersion()}) // ENVIA LA VERSION DEL SOFWARE
  buscarActualizacion() // BUSCAR ACTUALIZACION
})


// --> EVENTO QUE APLICA ACTUALIZACION DE INTERFACE GRAFICA

ipcMain.on('ok_update', (event) =>{ 
  autoUpdater.quitAndInstall()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
