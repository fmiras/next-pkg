#!/usr/bin/env node
const { resolve } = require('path')
const ora = require('ora')
const { copy, remove } = require('fs-extra')
const { exec } = require('pkg')

const pkg = require(resolve(process.cwd(), 'package.json'))

const finalServerPath = resolve(process.cwd(), '.next-pkg/server.js')
const binaryFilePath =
  process.platform === 'win32' ? `dist/${pkg.name}.exe` : `dist/${pkg.name}`

const copyTmpFiles = async () => {
  const spinner = ora('Copying extended next-pkg server').start()
  try {
    await copy(resolve(__dirname, '../lib/server.js'), finalServerPath)
    spinner.succeed()
  } catch (e) {
    console.log(`Error copying temporary files: ${e}`)
    spinner.fail()
    throw e
  }
}

const compile = async () => {
  const spinner = ora('Compiling server with pkg').start()
  try {
    const execution = exec([
      finalServerPath,
      '--target',
      'host',
      '--output',
      `${binaryFilePath}`
    ])
    spinner.stop()
    process.stderr.moveCursor(0, -1)
    process.stderr.clearLine()
    spinner.start()
    await execution
    spinner.succeed()
  } catch (e) {
    console.log(`Error during pkg compiling process: ${e}`)
    spinner.fail()
    throw e
  }
}

const deleteTmpFiles = async () => {
  const spinner = ora('Deleting temporary files').start()
  try {
    await remove('.next-pkg')
    spinner.succeed()
  } catch (e) {
    console.log(`Error deleting temporary files: ${e}`)
    spinner.fail()
    throw e
  }
}

const cli = async () => {
  await copyTmpFiles()
  await compile()
  await deleteTmpFiles()
  console.log(`📦 Binary compiled at ${binaryFilePath}`)
}

cli()
