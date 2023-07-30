import FileSaver from 'file-saver';

export default function useDownloadText() {
  return (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, filename);
  };
}
