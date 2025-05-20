import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import connectDB from './db';

async function getPartners() {
  try {
    const response = await global.dbclient.query(`SELECT T1.*,
      CASE WHEN sum(T2.production_quantity) > 300000 THEN 15
      WHEN sum(T2.production_quantity) > 50000 THEN 10
      WHEN sum(T2.production_quantity) > 10000 THEN 5
      ELSE 0
      END as discount
      from partners as T1
      LEFT JOIN sales as T2 on T1.id = T2.partner_id
      GROUP BY T1.id`)
    return response.rows
    dialog.showMessageBox({ message: 'message back' })
  } catch (e) {
    dialog.showErrorBox('Ошибка', e)
  }
}

async function createPartner(event, partner) {
  const {type, name, ceo, email, phone, address, rating} = partner
  try {
    await global.dbclient.query(
  `INSERT INTO partners (organization_type, name, ceo, email, phone, address, rating)
   VALUES ($1, $2, $3, $4, $5, $6, $7)`,
  [type, name, ceo, email, phone, address, rating]
);
    dialog.showMessageBox({ message: 'Партнер Создан' })
  } catch (e) {
    dialog.showErrorBox('Ошибка', e)
  }
}

async function updatePartner(event, partner) {
  const {id, type, name, ceo, email, phone, address, rating} = partner
  try {
    await global.dbclient.query(`UPDATE partners
      SET name = '${name}', organization_type = '${type}', ceo = '${ceo}', email = '${email}', phone = '${phone}', address = '${address}', rating = '${rating}'
      WHERE partners.id = '${id}';`);
    dialog.showMessageBox({ message: 'Данные обновлены' })
  } catch (e) {
    dialog.showErrorBox('Ошибка', e)
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  global.dbclient = await connectDB();

  ipcMain.handle('getPartners', getPartners)
  ipcMain.handle('createPartner', createPartner)
  ipcMain.handle('updatePartner', updatePartner)


  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
