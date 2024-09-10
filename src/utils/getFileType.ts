export const blobType = {
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    csv: 'text/csv',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pdf: 'application/pdf',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    png: 'image/png',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    mp3: 'audio/mpeg',
    aac: 'audio/aac',
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    json: 'application/json',
    abw: 'application/x-abiword',
    arc: 'application/x-freearc',
    avi: 'video/x-msvideo',
    azw: 'application/vnd.amazon.ebook',
    bin: 'application/octet-stream',
    bmp: 'image/bmp',
    bz: 'application/x-bzip',
    bz2: 'application/x-bzip2',
    csh: 'application/x-csh',
    eot: 'application/vnd.ms-fontobject',
    epub: 'application/epub+zip',
    htm: 'text/html',
    ico: 'image/vnd.microsoft.icon',
    ics: 'text/calendar',
    jar: 'application/java-archive',
    jsonld: 'application/ld+json',
    mid: 'audio/midi audio/x-midi',
    midi: 'audio/midi audio/x-midi',
    mjs: 'text/javascript',
    mpeg: 'video/mpeg',
    mpkg: 'application/vnd.apple.installer+xml',
    odp: 'application/vnd.oasis.opendocument.presentation',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    odt: 'application/vnd.oasis.opendocument.text',
    oga: 'audio/ogg',
    ogv: 'video/ogg',
    ogx: 'application/ogg',
    otf: 'font/otf',
    rar: 'application/x-rar-compressed',
    rtf: 'application/rtf',
    sh: 'application/x-sh',
    svg: 'image/svg+xml',
    swf: 'application/x-shockwave-flash',
    tar: 'application/x-tar',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    ttf: 'font/ttf',
    txt: 'text/plain',
    vsd: 'application/vnd.visio',
    wav: 'audio/wav',
    weba: 'audio/webm',
    webm: 'video/webm',
    webp: 'image/webp',
    woff: 'font/woff',
    woff2: 'font/woff2',
    xhtml: 'application/xhtml+xml',
    xml: 'text/xml',
    xul: 'application/vnd.mozilla.xul+xml',
    zip: 'application/zip',
}

export default function getOssBlob(urlAddress: any) {
    const startIndex = urlAddress.lastIndexOf('.')
    let file_type: any = 'xlsx'
    if (startIndex !== -1) {
        file_type = urlAddress.substring(startIndex + 1, urlAddress.length).toLowerCase()
    }
    return blobType[file_type]
}

export function download(res: any, url: any) {
    const disposition = res.headers["content-disposition"];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    const filename =
        matches != null && matches[1]
            ? matches[1].replace(/['"]/g, "")
            : "附件";
    const blob = new Blob([res.data], {
        type: getOssBlob(url),
    });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = decodeURIComponent(filename);
    a.href = objectUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}