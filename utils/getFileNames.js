/**
 * 该文件用于获取一个目录下的所有文件名
 * 2019-10-14 
 * 手动获取
 */
const { readdir, writeFile} = require('fs'); //读取路径，写文件名
const { resolve } = require('path');//解决路径的问题

const FOLDERPATH = 'D:\\HewieBlog\\docs\\network';

readdir(FOLDERPATH, (err,files) => {
    let filenames = [];
    if(!files){
        return;
    }
    files.forEach(file =>{
        if(file === 'README.md'){
            file = `''`;
        }else{
            file = file.replace('.md','');
            file = `'${file}'`;
        }
        filenames.push(file);
    });
    filenames.sort(); // 排序

    writeFile(resolve(__dirname,'./filenames.js'),`[${filenames}]`, ()=>{
        console.log('文件名获取完成');
    });
});