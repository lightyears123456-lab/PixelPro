import React, { useState } from 'react';
import { 
  Maximize2, Crop, FileType, type LucideIcon,
  ShieldCheck, Upload, Image as ImageIcon
} from 'lucide-react';
import { ToolType, ImageFile } from './types';
import { Card, Button } from './components/UI';
import { Editor } from './components/Editor';

// --- Components for Home Page ---

const FeatureCard: React.FC<{
  title: string;
  desc: string;
  icon: LucideIcon;
  onClick: () => void;
  color: string;
}> = ({ title, desc, icon: Icon, onClick, color }) => (
  <Card 
    onClick={onClick} 
    style={{ '--spotlight-color': color } as React.CSSProperties}
    className="cursor-pointer hover:-translate-y-1 h-full flex flex-col"
  >
    <div className={`w-12 h-12 rounded-lg bg-black/40 border border-${color}/30 flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all`} style={{ borderColor: `${color}4D` }}>
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
  </Card>
);

const App: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType | null>(null);
  const [activeFile, setActiveFile] = useState<ImageFile | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('仅支持 JPG, PNG, 和 WebP 格式。');
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        setActiveFile({
          file,
          previewUrl: url,
          width: img.width,
          height: img.height,
          size: file.size,
          name: file.name,
          type: file.type
        });
      };
      img.src = url;
    }
  };

  const handleBack = () => {
    setActiveFile(null);
    setCurrentTool(null);
  };

  // --- Render Views ---

  if (activeFile && currentTool) {
    return (
        <div className="min-h-screen bg-background bg-grid text-text-primary font-sans relative overflow-x-hidden">
            {/* Background Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 pt-4">
                <Editor 
                    tool={currentTool} 
                    file={activeFile} 
                    onBack={handleBack} 
                />
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid text-text-primary font-sans relative flex flex-col">
       {/* Background Glows */}
       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-b from-neon-blue/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="pt-16 pb-8 text-center relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <ShieldCheck className="w-3 h-3 text-neon-green" />
          <span className="text-[12px] font-mono text-neon-green tracking-wide">100% 纯前端本地处理</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Pixel<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Pro</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
          浏览器端的专业级图片工具。隐私安全，极速高效。无需上传服务器，所有数据本地处理。
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 w-full relative z-10 pb-20">
        
        {/* Upload Section (visible if tool selected but no file, or just feature selection) */}
        {!currentTool ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <FeatureCard 
                    title="图片压缩" 
                    desc="智能优化算法，大幅减小体积同时保持视觉无损。"
                    icon={Maximize2}
                    color="#00F0FF"
                    onClick={() => setCurrentTool(ToolType.COMPRESS)}
                />
                <FeatureCard 
                    title="裁剪与缩放" 
                    desc="提供多种预设比例与自由裁剪，精准构图调整。"
                    icon={Crop}
                    color="#9D00FF"
                    onClick={() => setCurrentTool(ToolType.CROP)}
                />
                <FeatureCard 
                    title="格式转换" 
                    desc="JPG、PNG、WebP 格式极速互转，满足不同场景需求。"
                    icon={FileType}
                    color="#00FF9D"
                    onClick={() => setCurrentTool(ToolType.CONVERT)}
                />
                <FeatureCard 
                    title="添加水印" 
                    desc="自定义文字水印、透明度与平铺模式，保护版权。"
                    icon={ShieldCheck}
                    color="#FF0055"
                    onClick={() => setCurrentTool(ToolType.WATERMARK)}
                />
            </div>
        ) : (
            <div className="max-w-xl mx-auto mt-12 animate-in fade-in zoom-in duration-300">
                 <button 
                    onClick={() => setCurrentTool(null)}
                    className="mb-8 text-text-secondary hover:text-white transition-colors"
                 >
                     ← 返回工具选择
                 </button>
                 <Card className="border-dashed border-2 border-white/20 hover:border-neon-blue/50 transition-colors p-12 text-center group cursor-pointer relative">
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    />
                    <div className="w-20 h-20 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-10 h-10 text-neon-blue" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">上传图片</h3>
                    <p className="text-text-secondary mb-6">点击或拖拽图片至此处</p>
                    <div className="flex gap-4 justify-center text-[12px] text-gray-500 font-mono">
                        <span>JPG</span>
                        <span>PNG</span>
                        <span>WEBP</span>
                    </div>
                 </Card>
                 <p className="text-center mt-6 text-sm text-gray-500">
                    当前功能: <span className="text-neon-blue font-bold">
                        {currentTool === ToolType.COMPRESS && "图片压缩"}
                        {currentTool === ToolType.CROP && "裁剪工具"}
                        {currentTool === ToolType.CONVERT && "格式转换"}
                        {currentTool === ToolType.WATERMARK && "添加水印"}
                    </span>
                 </p>
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-sm font-mono">
        <p>© 2024 PixelPro. 纯前端架构.</p>
        <p className="mt-2 opacity-50">推荐使用 Chrome / Edge / Firefox 等现代浏览器</p>
      </footer>
    </div>
  );
};

export default App;