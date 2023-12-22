// 引入库文件
import DocxTemplater from 'docxtemplater';
import PizZip from "pizzip"

function getFileBinaryString(template) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        }
        reader.onerror = reject;
        reader.readAsBinaryString(template)
    })
}

export async function generateDocxFile(template, fileData) {
    return new Promise((resolve) => {
        getFileBinaryString(template)
            .then(templateData => {
                const zip = new PizZip(templateData);
                const doc = new DocxTemplater()
                    .loadZip(zip)
                    .render(fileData)
                const out = doc.getZip().generate({
                    type: 'blob',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                });
                resolve(out);
            })
            .catch((e) => {
                console.log("报错了", e);
            });
    });
} 