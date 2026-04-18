import { PreviewPane } from './_components/preview-pane';
import { ConfigPane } from './_components/config-pane';

export default function Home() {
  return (
    <div className='h-screen flex flex-col overflow-hidden bg-background text-foreground'>
      <header className='h-10 flex-shrink-0 flex items-center justify-between px-6 border-b border-border bg-background'>
        <div className='flex items-center gap-3'>
          <span className='text-[13px] font-mono font-medium tracking-tight text-foreground'>
            Shadcn Theme Preview
          </span>
          <span className='text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5'>
            v1.0
          </span>
        </div>
        <p className='text-[11px] font-mono text-muted-foreground'>
          Edit variables — see changes live
        </p>
      </header>

      <main className='flex-1 flex overflow-hidden'>
        <PreviewPane />
        <ConfigPane />
      </main>
    </div>
  );
}
