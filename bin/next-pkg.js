#!/usr/bin/env node
const path = require('path')
const readline = require('readline')

const fs = require('fs-extra')
const ora = require('ora')
const { exec } = require('pkg')

const pkg = require(path.resolve(process.cwd(), 'package.json'))

const finalServerPath = path.resolve(process.cwd(), '.next-pkg/server.js')
const binaryFilePath =
  process.platform === 'win32' ? `dist/${pkg.name}.exe` : `dist/${pkg.name}`

const copyTmpFiles = async () => {
  const spinner = ora('Copying extended next-pkg server').start()
  try {
    await fs.copy(path.resolve(__dirname, '../lib/server.js'), finalServerPath)
    spinner.succeed('Extended next-pkg server copied')
  } catch (error) {
    spinner.fail(`Error copying temporary files: ${error}`)
    throw error
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
    readline.moveCursor(process.stderr, 0, -1)
    readline.clearLine(process.stderr)
    spinner.start()
    await execution
    spinner.succeed(`Server compiled`)
  } catch (error) {
    spinner.fail(`Error during pkg compiling process: ${error}`)
    throw error
  }
}

const deleteTmpFiles = async () => {
  const spinner = ora('Deleting temporary files').start()
  try {
    await fs.remove('.next-pkg')
    spinner.succeed('Temporary files deleted')
  } catch (error) {
    spinner.fail(`Error deleting temporary files: ${error}`)
    throw error
  }
}

const cli = async () => {
  await copyTmpFiles()
  await compile()
  await deleteTmpFiles()
  console.log(`📦 Binary compiled at ${binaryFilePath}`)
}

cli()
