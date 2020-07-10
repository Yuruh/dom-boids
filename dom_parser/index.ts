import DomToImage from 'dom-to-image';

console.log("Hello world");

const node: any ="<div>test</div>"


DomToImage.toPng(node)
    .then(function (dataUrl: any) {
        console.log(dataUrl)

    })
    .catch(function (error: any) {
        console.error('oops, something went wrong!', error);
    });
