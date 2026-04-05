import React, { useState } from 'react';
import { 
  Plus, 
  ArrowLeft, 
  ChevronRight, 
  Check, 
  ImageIcon, 
  X, 
  AlertCircle, 
  Save, 
  Send, 
  Info, 
  MapPin, 
  Tag, 
  Package, 
  DollarSign 
} from 'lucide-react';
import clsx from 'clsx';

const PublishProductPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { number: 1, title: '选择品类' },
    { number: 2, title: '完善详情' },
    { number: 3, title: '设置规格' },
    { number: 4, title: '完成发布' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-background-tertiary rounded-lg transition-colors border border-border-primary text-text-secondary shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-24 font-bold text-text-primary">发布新供应</h1>
            <p className="text-text-secondary text-14 mt-1">创建新的供应信息，连接全国买家。</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-border-primary text-text-secondary rounded-xl font-medium hover:bg-background-tertiary transition-all shadow-sm flex items-center gap-2">
            <Save size={18} /> 保存草稿
          </button>
          <button className="px-8 py-2.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-dark shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2">
            <Send size={18} /> 提交审核
          </button>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-white p-8 rounded-2xl border border-border-secondary shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-background-tertiary -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-brand-primary -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center group">
              <div 
                className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                  currentStep >= step.number 
                    ? "bg-brand-primary border-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/20" 
                    : "bg-white border-background-tertiary text-text-placeholder"
                )}
              >
                {currentStep > step.number ? <Check size={20} /> : <span className="text-16 font-bold">{step.number}</span>}
              </div>
              <span className={clsx(
                "mt-3 text-14 font-bold transition-colors",
                currentStep >= step.number ? "text-brand-primary" : "text-text-placeholder"
              )}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <section className="bg-white p-8 rounded-2xl border border-border-secondary shadow-sm space-y-6">
            <h3 className="text-18 font-bold text-text-primary flex items-center gap-2">
              <Package size={20} className="text-brand-primary" /> 基本信息
            </h3>
            
            <div className="space-y-2">
              <label className="text-14 font-medium text-text-secondary flex items-center gap-1">
                供应名称 <span className="text-error">*</span>
              </label>
              <input 
                type="text" 
                placeholder="例如：陕西洛川红富士苹果 脆甜爽口" 
                className="w-full px-4 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none focus:border-brand-primary transition-all"
              />
              <p className="text-12 text-text-tertiary pl-1">好的标题能获得 3 倍以上的点击率</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-14 font-medium text-text-secondary">所属分类 *</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="请选择分类" 
                    readOnly
                    className="w-full px-4 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none cursor-pointer focus:border-brand-primary"
                  />
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-text-placeholder" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-14 font-medium text-text-secondary">产地 *</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="请选择省市区" 
                    readOnly
                    className="w-full px-4 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none cursor-pointer focus:border-brand-primary"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-text-placeholder" size={18} />
                </div>
              </div>
            </div>
          </section>

          {/* Pricing & Spec */}
          <section className="bg-white p-8 rounded-2xl border border-border-secondary shadow-sm space-y-6">
            <h3 className="text-18 font-bold text-text-primary flex items-center gap-2">
              <DollarSign size={20} className="text-brand-primary" /> 价格规格
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-14 font-medium text-text-secondary">供应价格 (¥) *</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full px-4 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none focus:border-brand-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-14 font-medium text-text-secondary">计量单位 *</label>
                <select className="w-full px-4 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none focus:border-brand-primary">
                  <option value="斤">斤</option>
                  <option value="公斤">公斤/kg</option>
                  <option value="吨">吨</option>
                  <option value="箱">箱</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-14 font-medium text-text-secondary">起订量 *</label>
                <input 
                  type="number" 
                  placeholder="例如: 100" 
                  className="w-full px-4 py-3 bg-background-tertiary border border-border-primary rounded-xl text-14 outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </section>

          {/* Media Upload */}
          <section className="bg-white p-8 rounded-2xl border border-border-secondary shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-18 font-bold text-text-primary flex items-center gap-2">
                <ImageIcon size={20} className="text-brand-primary" /> 图片视频
              </h3>
              <span className="text-12 text-text-tertiary">建议上传 5-8 张实拍图</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="aspect-square rounded-xl border-2 border-dashed border-border-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all flex flex-col items-center justify-center cursor-pointer group">
                <Plus size={32} className="text-text-placeholder group-hover:text-brand-primary transition-colors" />
                <span className="text-12 text-text-tertiary mt-2 group-hover:text-brand-primary transition-colors">添加图片</span>
              </div>
              {/* Mock Uploaded Images */}
              <div className="aspect-square rounded-xl bg-background-tertiary border border-border-secondary relative group overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200&h=200&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Supply" />
                <button className="absolute top-1 right-1 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500">
                  <X size={14} />
                </button>
                <div className="absolute bottom-0 left-0 w-full bg-brand-primary/80 text-white text-10 text-center py-0.5">主图</div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-6 space-y-4">
            <h4 className="text-16 font-bold text-brand-primary flex items-center gap-2">
              <Info size={18} /> 发布指南
            </h4>
            <ul className="space-y-3">
              {[
                '标题包含产地、品种和规格',
                '主图必须为高清实拍原图',
                '详细描述种植过程更受欢迎',
                '设置阶梯价格有助于大宗成交',
                '准确的地理位置能降低运费纠纷'
              ].map((text, i) => (
                <li key={i} className="flex gap-2 text-14 text-text-secondary">
                  <span className="w-5 h-5 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center text-10 shrink-0 mt-0.5">{i+1}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-agriculture-gold/5 border border-agriculture-gold/10 rounded-2xl p-6">
            <h4 className="text-16 font-bold text-agriculture-gold flex items-center gap-2">
              <AlertCircle size={18} /> 常见问题
            </h4>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-14 font-bold text-text-primary">审核需要多久？</p>
                <p className="text-13 text-text-secondary mt-1">通常在提交后 2 小时内完成审核，节假日顺延。</p>
              </div>
              <div>
                <p className="text-14 font-bold text-text-primary">为什么图片上传失败？</p>
                <p className="text-13 text-text-secondary mt-1">单张图片限制 5MB 以内，支持 JPG、PNG、WEBP 格式。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishProductPage;
