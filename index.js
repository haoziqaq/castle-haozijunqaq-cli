#!/usr/bin/env node
const program = require('commander'); //捕获指令
const { exec } = require('child_process'); //系统命令
const download = require('download-git-repo'); //下载模板
const ora = require('ora'); //带标记的打印
const inquirer = require('inquirer'); //交互
const chalk = require('chalk'); //文字上色
const spinner = ora();

const downloadUtils = (name, dist) => {
    if (!dist) dist = name.split('/')[1];
    spinner.start('开始导出源码');
    download(name, dist, (err) => {
        if (err) {
            spinner.fail(chalk.red('源码导出失败'));
            throw err;
        } else {
            spinner.succeed(chalk.green('源码导出成功'));
        }
    })
};
const shell = (command) => {
    spinner.start('开始安装依赖模块');
    exec(command, ((err, stdout, stderr) => {
        if (err) {
            spinner.fail(chalk.red('依赖模块安装失败'));
            throw err;

        } else {
            spinner.succeed(chalk.green('依赖模块安装成功'));
        }
    }));
};

program.version('1.0.3', '-v, --version')
    .command('install')
    .action(r => {
        inquirer.prompt([
            {
                type: 'list',
                message: '请选择一种工具:',
                name: 'util',
                choices: [
                    "castle-haozijunqaq-utils",
                ],
            }
        ]).then((result) => {
            switch (result.util) {
                case 'castle-haozijunqaq-utils':
                    shell('npm i castle-haozijunqaq-utils -S');
                    break;
                default:
                    spinner.fail(chalk.red('操作异常'));
            }
        });
    });

program.command('eject')
    .action((r) => {
        inquirer.prompt([
            {
                type: 'list',
                message: '请选择一种工具:',
                name: 'util',
                choices: [
                    "castle-haozijunqaq-utils",
                ],
            },
            {
                type: 'input',
                message: '请输入导出的相对路径 如 test/dist',
                name: 'dist'
            }
        ]).then((result) => {
            switch (result.util) {
                case 'castle-haozijunqaq-utils':
                    downloadUtils('haoziqaq/castle-haozijunqaq-utils', result.dist);
                    shell('npm i castle-haozijunqaq-utils -S');
                    break;
                default:
                    spinner.fail(chalk.red('操作异常'));
            }
        });
    });

program.parse(process.argv);