import * as fsExtra from 'fs-extra';

const moveFile = (src, dest) => {
    console.log({src, dest});
    fsExtra.move(src, dest, err => {
        if(err) return console.error(err);
        console.log(`${src}: success!`);
    });
}

export default moveFile;
