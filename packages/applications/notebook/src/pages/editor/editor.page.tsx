import { Editor } from "../../components/editor/editor";
import { Header } from "../../components/header/header";

export function EditorPage() {
  return (
    <div className="absolute inset-0 grid grid-rows-[auto_1fr] overflow-hidden max-h-full h-full">
      <Header />
      <main className="md:px-[15%] px-4 overflow-y-auto max-h-full py-4">
        <Editor />
      </main>
    </div>
  );
}
