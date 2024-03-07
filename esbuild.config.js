import path from 'node:path'
import fs, { mkdirSync } from 'node:fs'
import esbuild from 'esbuild'
import { rootPath } from '#common/utils/file/getRootPath.js'

// 读取 package.json 文件内容
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(rootPath, 'package.json'), 'utf-8'),
)
const publishExcludeFields = [
  'scripts',
  'devDependencies',
  'imports',
  'main',
  'config',
]
function clean() {
  return new Promise((resolve, reject) => {
    fs.rm(path.resolve(rootPath, 'pl-cli'), { recursive: true }, (err) => {
      if (err)
        resolve()
      else
        resolve()
    })
  })
}
await clean()
await esbuild
  .build({
    entryPoints: ['bin/lk.js', 'bin/lf.js', 'bin/lc.js'],
    outdir: 'pl-cli/.bin',
    platform: 'node',
    target: ['node20'],
    format: 'esm',
    bundle: true,
    minify: true,
    packages: 'external',
    define: {
      'process.env.VERSION': JSON.stringify(packageJson.version),
    },
  })
  .then(() => {
    // 构建完成后执行的操作
    // 复制文件
    const docs = fs.readdirSync(path.resolve(rootPath, 'docs'))
    // 创建docs
    mkdirSync(path.resolve(rootPath, 'pl-cli/docs'), { recursive: true })
    docs.forEach((doc) => {
      fs.copyFileSync(
        path.resolve(rootPath, 'docs', doc),
        path.resolve(rootPath, 'pl-cli/docs/', doc),
      )
    })
    fs.copyFileSync(
      path.resolve(rootPath, 'README.md'),
      path.resolve(rootPath, 'pl-cli/README.md'),
    )
    fs.copyFileSync(
      path.resolve(rootPath, 'LICENSE'),
      path.resolve(rootPath, 'pl-cli/LICENSE'),
    )
    const newPackageJson = Object.assign(packageJson, {
      bin: {
        lk: '.bin/lk.js',
        lf: '.bin/lf.js',
        lc: '.bin/lc.js',
      },
    })
    publishExcludeFields?.forEach((key) => {
      delete newPackageJson[key]
    })
    fs.writeFileSync(
      path.resolve(rootPath, 'pl-cli/package.json'),
      JSON.stringify(newPackageJson),
    )
    console.log('[LP]脚本打包完成,查看目录[pl-cli].')
  })
  .catch((e) => {
    console.error('[LP]脚本打包失败', e)
    process.exit(1)
  })
